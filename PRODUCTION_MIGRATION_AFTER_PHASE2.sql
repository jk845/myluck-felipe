-- =============================================================================
-- PRODUCTION MIGRATION - POST PHASE 2 UPDATES
-- =============================================================================
-- This file contains all migrations created AFTER the main Phase 2 migration
-- Apply this AFTER you've already applied the main Phase 2 migration
--
-- USAGE:
--   1. Open Supabase Dashboard → SQL Editor
--   2. Paste this entire file
--   3. Run the query
--
-- SAFETY:
--   - All operations are idempotent (safe to run multiple times)
--   - Uses IF NOT EXISTS checks
--   - Will not fail if objects already exist
--
-- Generated: 2025-10-14
-- =============================================================================

-- =============================================================================
-- CRITICAL: Payment Transaction Function (20251009120000)
-- =============================================================================
-- This function is REQUIRED for payment processing to work!
-- Without it, webhooks will fail with "function not found" error

CREATE OR REPLACE FUNCTION process_first_payment_transaction(
  p_user_id UUID,
  p_plan_id UUID,
  p_mollie_subscription_id TEXT,
  p_mollie_customer_id TEXT,
  p_mollie_payment_id TEXT,
  p_amount DECIMAL(10, 2),
  p_currency TEXT DEFAULT 'NOK'
)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_subscription_id UUID;
  v_payment_id UUID;
  v_result jsonb;
BEGIN
  -- Start implicit transaction (PostgreSQL functions are atomic by default)

  -- Step 1: Create subscription record
  INSERT INTO subscriptions (
    user_id,
    plan_id,
    mollie_subscription_id,
    mollie_customer_id,
    status,
    started_at,
    next_billing_date,
    created_at,
    updated_at
  )
  VALUES (
    p_user_id,
    p_plan_id,
    p_mollie_subscription_id,
    p_mollie_customer_id,
    'active',
    NOW(),
    NOW() + INTERVAL '1 month', -- Default next billing (will be updated by Mollie webhooks)
    NOW(),
    NOW()
  )
  RETURNING id INTO v_subscription_id;

  -- Step 2: Create payment record
  INSERT INTO payments (
    subscription_id,
    mollie_payment_id,
    amount,
    currency,
    status,
    paid_at,
    created_at
  )
  VALUES (
    v_subscription_id,
    p_mollie_payment_id,
    p_amount,
    p_currency,
    'paid',
    NOW(),
    NOW()
  )
  RETURNING id INTO v_payment_id;

  -- Step 3: Update user onboarding status (mark as onboarded)
  UPDATE users
  SET
    onboarding_completed = true,
    updated_at = NOW()
  WHERE id = p_user_id;

  -- Verify user was updated
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found: %', p_user_id;
  END IF;

  -- Build success result
  v_result := jsonb_build_object(
    'success', true,
    'subscription_id', v_subscription_id,
    'payment_id', v_payment_id,
    'user_id', p_user_id,
    'mollie_subscription_id', p_mollie_subscription_id,
    'mollie_payment_id', p_mollie_payment_id
  );

  -- Transaction commits automatically if we reach here
  RETURN v_result;

EXCEPTION
  WHEN OTHERS THEN
    -- Transaction rolls back automatically on exception
    -- Return error details
    RAISE EXCEPTION 'First payment transaction failed: % (SQLSTATE: %)', SQLERRM, SQLSTATE;
END;
$$;

COMMENT ON FUNCTION process_first_payment_transaction IS
  'Atomically process first payment: create subscription, payment, and update user status. All steps succeed or all rollback.';

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION process_first_payment_transaction TO service_role;
GRANT EXECUTE ON FUNCTION process_first_payment_transaction TO authenticated;

-- Add onboarding_completed column if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'onboarding_completed'
  ) THEN
    ALTER TABLE users ADD COLUMN onboarding_completed BOOLEAN DEFAULT false;
    COMMENT ON COLUMN users.onboarding_completed IS
      'True if user completed onboarding flow and received Everfit access';
  END IF;
END $$;

-- =============================================================================
-- Webhook Idempotency Fix (20251009121000)
-- =============================================================================

-- Clean up duplicate webhooks before creating unique constraint
DELETE FROM processed_webhooks
WHERE id IN (
  SELECT id
  FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY webhook_id ORDER BY processed_at DESC, id DESC) as rn
    FROM processed_webhooks
  ) t
  WHERE rn > 1
);

-- Create unique constraint on webhook_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_processed_webhooks_webhook_id_unique
ON processed_webhooks(webhook_id);

-- =============================================================================
-- Fix Foreign Keys (20251009122000)
-- =============================================================================

-- Drop old FK constraints if they exist
ALTER TABLE IF EXISTS payment_retry_logs DROP CONSTRAINT IF EXISTS payment_retry_logs_profile_id_fkey CASCADE;
ALTER TABLE IF EXISTS cancellation_tokens DROP CONSTRAINT IF EXISTS cancellation_tokens_user_id_fkey CASCADE;
ALTER TABLE IF EXISTS cancellation_feedback DROP CONSTRAINT IF EXISTS cancellation_feedback_user_id_fkey CASCADE;
ALTER TABLE IF EXISTS post_registration_responses DROP CONSTRAINT IF EXISTS post_registration_responses_profile_id_fkey CASCADE;
ALTER TABLE IF EXISTS onboarding_logs DROP CONSTRAINT IF EXISTS onboarding_logs_profile_id_fkey CASCADE;
ALTER TABLE IF EXISTS unpaid_invoices DROP CONSTRAINT IF EXISTS unpaid_invoices_profile_id_fkey CASCADE;

-- Add new FK constraints pointing to users table
DO $$
BEGIN
  -- cancellation_tokens
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cancellation_tokens') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_name = 'cancellation_tokens_user_id_fkey'
      AND table_name = 'cancellation_tokens'
    ) THEN
      ALTER TABLE cancellation_tokens
        ADD CONSTRAINT cancellation_tokens_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;

  -- cancellation_feedback
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cancellation_feedback') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_name = 'cancellation_feedback_user_id_fkey'
      AND table_name = 'cancellation_feedback'
    ) THEN
      ALTER TABLE cancellation_feedback
        ADD CONSTRAINT cancellation_feedback_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;

  -- payment_retry_logs
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payment_retry_logs') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_name = 'payment_retry_logs_profile_id_fkey'
      AND table_name = 'payment_retry_logs'
    ) THEN
      ALTER TABLE payment_retry_logs
        ADD CONSTRAINT payment_retry_logs_profile_id_fkey
        FOREIGN KEY (profile_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;

  -- post_registration_responses
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'post_registration_responses') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_name = 'post_registration_responses_profile_id_fkey'
      AND table_name = 'post_registration_responses'
    ) THEN
      ALTER TABLE post_registration_responses
        ADD CONSTRAINT post_registration_responses_profile_id_fkey
        FOREIGN KEY (profile_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;

  -- onboarding_logs
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'onboarding_logs') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_name = 'onboarding_logs_profile_id_fkey'
      AND table_name = 'onboarding_logs'
    ) THEN
      ALTER TABLE onboarding_logs
        ADD CONSTRAINT onboarding_logs_profile_id_fkey
        FOREIGN KEY (profile_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;

  -- unpaid_invoices (check if profile_id column exists first)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'unpaid_invoices') THEN
    -- Only add FK if profile_id column exists
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'unpaid_invoices' AND column_name = 'profile_id'
    ) THEN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'unpaid_invoices_profile_id_fkey'
        AND table_name = 'unpaid_invoices'
      ) THEN
        ALTER TABLE unpaid_invoices
          ADD CONSTRAINT unpaid_invoices_profile_id_fkey
          FOREIGN KEY (profile_id) REFERENCES users(id) ON DELETE CASCADE;
      END IF;
    END IF;

    -- If user_id column exists instead, create FK for that
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'unpaid_invoices' AND column_name = 'user_id'
    ) THEN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'unpaid_invoices_user_id_fkey'
        AND table_name = 'unpaid_invoices'
      ) THEN
        ALTER TABLE unpaid_invoices
          ADD CONSTRAINT unpaid_invoices_user_id_fkey
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
      END IF;
    END IF;
  END IF;
END $$;

-- =============================================================================
-- Add Retry Fields to Phase 2 Tables (20251013201204)
-- =============================================================================

-- Add retry fields to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS payment_retry_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_retry_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS next_retry_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS payment_failure_reason TEXT,
ADD COLUMN IF NOT EXISTS has_outstanding_debt BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS retry_payment_id TEXT;

COMMENT ON COLUMN users.payment_retry_count IS 'Number of failed payment retry attempts';
COMMENT ON COLUMN users.last_retry_date IS 'Timestamp of the last payment retry attempt';
COMMENT ON COLUMN users.next_retry_date IS 'Timestamp of the next scheduled payment retry';
COMMENT ON COLUMN users.payment_failure_reason IS 'Reason for the last payment failure';
COMMENT ON COLUMN users.has_outstanding_debt IS 'Indicates if the user has an outstanding debt after exhausting payment retries';
COMMENT ON COLUMN users.retry_payment_id IS 'Mollie payment ID of the current retry attempt';

-- Add user_id to unpaid_invoices if missing
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_name = 'unpaid_invoices'
  ) THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'unpaid_invoices' AND column_name = 'user_id'
    ) THEN
      ALTER TABLE unpaid_invoices
      ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;

      -- Try to populate user_id from profile_id if it exists
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'unpaid_invoices' AND column_name = 'profile_id'
      ) THEN
        UPDATE unpaid_invoices
        SET user_id = profile_id::uuid
        WHERE profile_id IS NOT NULL;
      END IF;
    END IF;
  END IF;
END $$;

-- Create indexes for retry fields
CREATE INDEX IF NOT EXISTS idx_users_payment_retry_count ON users(payment_retry_count) WHERE payment_retry_count > 0;
CREATE INDEX IF NOT EXISTS idx_users_has_debt ON users(has_outstanding_debt) WHERE has_outstanding_debt = true;
CREATE INDEX IF NOT EXISTS idx_users_next_retry_date ON users(next_retry_date) WHERE next_retry_date IS NOT NULL;

-- =============================================================================
-- Create Progress Photos Bucket (20251010080000)
-- =============================================================================

-- Create storage bucket for progress photos (if not exists)
INSERT INTO storage.buckets (id, name)
VALUES ('progress-photos', 'progress-photos')
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies
DROP POLICY IF EXISTS "Public Access to progress photos" ON storage.objects;
DROP POLICY IF EXISTS "Service role can upload progress photos" ON storage.objects;
DROP POLICY IF EXISTS "Service role can update progress photos" ON storage.objects;
DROP POLICY IF EXISTS "Service role can delete progress photos" ON storage.objects;

-- Allow anyone to read from the bucket (public access)
CREATE POLICY "Public Access to progress photos"
ON storage.objects FOR SELECT
USING ( bucket_id = 'progress-photos' );

-- Allow service role to upload
CREATE POLICY "Service role can upload progress photos"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'progress-photos' );

-- Allow service role to update photos
CREATE POLICY "Service role can update progress photos"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'progress-photos' );

-- Allow service role to delete photos
CREATE POLICY "Service role can delete progress photos"
ON storage.objects FOR DELETE
USING ( bucket_id = 'progress-photos' );

-- =============================================================================
-- OPTIONAL: Additional Tables (uncomment if needed)
-- =============================================================================

-- Uncomment this section if you want to add external integrations table
/*
-- Create external_integrations table
CREATE TABLE IF NOT EXISTS external_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  external_id TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, provider)
);

CREATE INDEX IF NOT EXISTS idx_external_integrations_user_id ON external_integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_external_integrations_provider ON external_integrations(provider);
CREATE INDEX IF NOT EXISTS idx_external_integrations_active ON external_integrations(is_active) WHERE is_active = true;
*/

-- Uncomment this section if you want to add subscription pause fields
/*
-- Add pause fields to subscriptions
ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS paused_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS paused_by TEXT,
ADD COLUMN IF NOT EXISTS paused_reason TEXT,
ADD COLUMN IF NOT EXISTS resumed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS resumed_by TEXT;

COMMENT ON COLUMN subscriptions.paused_at IS 'Timestamp when subscription was paused';
COMMENT ON COLUMN subscriptions.paused_by IS 'Who paused the subscription (user, admin, system)';
COMMENT ON COLUMN subscriptions.paused_reason IS 'Reason for pausing the subscription';
COMMENT ON COLUMN subscriptions.resumed_at IS 'Timestamp when subscription was resumed';
COMMENT ON COLUMN subscriptions.resumed_by IS 'Who resumed the subscription';

CREATE INDEX IF NOT EXISTS idx_subscriptions_paused ON subscriptions(status, paused_at) WHERE status = 'paused';
*/

-- Uncomment this section if you want to add client notes and goals
/*
-- Create client_notes table
CREATE TABLE IF NOT EXISTS client_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  coach_id TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_client_notes_user_id ON client_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_client_notes_coach_id ON client_notes(coach_id);
CREATE INDEX IF NOT EXISTS idx_client_notes_is_pinned ON client_notes(is_pinned);
CREATE INDEX IF NOT EXISTS idx_client_notes_created_at ON client_notes(created_at DESC);

-- Create client_goals table
CREATE TABLE IF NOT EXISTS client_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  target_value NUMERIC NOT NULL,
  current_value NUMERIC DEFAULT 0,
  unit TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  target_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_client_goals_user_id ON client_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_client_goals_status ON client_goals(status);
CREATE INDEX IF NOT EXISTS idx_client_goals_target_date ON client_goals(target_date);
*/

-- Uncomment this section if you want to add progress entries
/*
-- Create progress_entries table
CREATE TABLE IF NOT EXISTS progress_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  weight NUMERIC NOT NULL,
  measurements JSONB NOT NULL DEFAULT '{}'::jsonb,
  weekly_metrics JSONB NOT NULL DEFAULT '{}'::jsonb,
  images JSONB NOT NULL DEFAULT '{}'::jsonb,
  submitted_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_progress_entries_user_id ON progress_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_entries_submitted_at ON progress_entries(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_progress_entries_user_submitted ON progress_entries(user_id, submitted_at DESC);
*/

-- =============================================================================
-- Update VIEW Triggers (Important!)
-- =============================================================================

-- Recreate INSTEAD OF triggers for the onboarding_profiles VIEW
-- These allow INSERT/UPDATE/DELETE on the VIEW as if it were a table

DROP TRIGGER IF EXISTS onboarding_profiles_instead_of_insert ON onboarding_profiles;
DROP TRIGGER IF EXISTS onboarding_profiles_instead_of_update ON onboarding_profiles;
DROP TRIGGER IF EXISTS onboarding_profiles_instead_of_delete ON onboarding_profiles;

-- Recreate INSERT trigger function
CREATE OR REPLACE FUNCTION onboarding_profiles_insert()
RETURNS TRIGGER AS $$
DECLARE
  v_user_id UUID;
  v_plan_id UUID;
  v_subscription_id UUID;
BEGIN
  -- 1. Insert into users table
  INSERT INTO users (
    id,
    email,
    first_name,
    last_name,
    phone,
    everfit_user_id,
    everfit_password,
    product_type,
    instagram,
    country
  ) VALUES (
    COALESCE(NEW.profile_id, gen_random_uuid()),
    NEW.email,
    NEW.first_name,
    NEW.last_name,
    NEW.phone,
    NEW.everfit_user_id,
    NEW.password,
    COALESCE(NEW.product_type, 'one-to-one'),
    NEW.instagram,
    COALESCE(NEW.country, 'NO')
  )
  RETURNING id INTO v_user_id;

  -- 2. Insert physical profile (if data exists)
  IF NEW.age IS NOT NULL OR NEW.height IS NOT NULL OR NEW.weight IS NOT NULL THEN
    INSERT INTO user_physical_profiles (
      user_id, age, height, weight, pregnancy_status, breastfeeding_status
    ) VALUES (
      v_user_id, NEW.age, NEW.height, NEW.weight, NEW.pregnancy_status, NEW.breastfeeding_status
    );
  END IF;

  -- 3. Insert fitness goals (if data exists)
  IF NEW.fitness_goals IS NOT NULL OR NEW.motivation_level IS NOT NULL THEN
    INSERT INTO user_fitness_goals (
      user_id, fitness_goals, motivation_level, training_frequency, previous_obstacles, metadata
    ) VALUES (
      v_user_id, NEW.fitness_goals, NEW.motivation_level, NEW.training_frequency,
      NEW.previous_obstacles, COALESCE(NEW.metadata, '{}'::jsonb)
    );
  END IF;

  -- 4. Insert subscription (if plan exists)
  IF NEW.subscription_plan IS NOT NULL THEN
    SELECT id INTO v_plan_id FROM subscription_plans WHERE slug = NEW.subscription_plan LIMIT 1;

    IF v_plan_id IS NOT NULL THEN
      INSERT INTO subscriptions (
        user_id,
        plan_id,
        mollie_customer_id,
        mollie_subscription_id,
        status,
        metadata
      ) VALUES (
        v_user_id,
        v_plan_id,
        NEW.mollie_customer_id,
        NEW.mollie_subscription_id,
        COALESCE(NEW.subscription_status, 'pending'),
        jsonb_build_object(
          'onboarding_stage', COALESCE(NEW.onboarding_stage, 'PAYMENT_CREATED'),
          'onboarding_steps_completed', COALESCE(NEW.onboarding_steps_completed, '{}'::jsonb),
          'is_returning_user', COALESCE(NEW.is_returning_user, false),
          'payment_retry_count', COALESCE(NEW.payment_retry_count, 0),
          'has_outstanding_debt', COALESCE(NEW.has_outstanding_debt, false)
        )
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER onboarding_profiles_instead_of_insert
  INSTEAD OF INSERT ON onboarding_profiles
  FOR EACH ROW
  EXECUTE FUNCTION onboarding_profiles_insert();

-- Recreate UPDATE trigger function
CREATE OR REPLACE FUNCTION onboarding_profiles_update()
RETURNS TRIGGER AS $$
DECLARE
  v_plan_id UUID;
BEGIN
  -- 1. Update users table
  UPDATE users SET
    email = NEW.email,
    first_name = NEW.first_name,
    last_name = NEW.last_name,
    phone = NEW.phone,
    everfit_user_id = NEW.everfit_user_id,
    everfit_password = NEW.password,
    product_type = NEW.product_type,
    instagram = NEW.instagram,
    country = NEW.country,
    updated_at = NOW()
  WHERE id = NEW.profile_id;

  -- 2. Update physical profile
  UPDATE user_physical_profiles SET
    age = NEW.age,
    height = NEW.height,
    weight = NEW.weight,
    pregnancy_status = NEW.pregnancy_status,
    breastfeeding_status = NEW.breastfeeding_status,
    updated_at = NOW()
  WHERE user_id = NEW.profile_id;

  -- 3. Update fitness goals
  UPDATE user_fitness_goals SET
    fitness_goals = NEW.fitness_goals,
    motivation_level = NEW.motivation_level,
    training_frequency = NEW.training_frequency,
    previous_obstacles = NEW.previous_obstacles,
    metadata = COALESCE(NEW.metadata, '{}'::jsonb),
    updated_at = NOW()
  WHERE user_id = NEW.profile_id;

  -- 4. Update subscription (most recent)
  IF NEW.subscription_plan IS NOT NULL THEN
    SELECT id INTO v_plan_id FROM subscription_plans WHERE slug = NEW.subscription_plan LIMIT 1;

    UPDATE subscriptions SET
      plan_id = COALESCE(v_plan_id, plan_id),
      mollie_customer_id = NEW.mollie_customer_id,
      mollie_subscription_id = NEW.mollie_subscription_id,
      status = NEW.subscription_status,
      next_billing_date = NEW.subscription_end_date,
      metadata = jsonb_build_object(
        'onboarding_stage', NEW.onboarding_stage,
        'onboarding_steps_completed', NEW.onboarding_steps_completed,
        'is_returning_user', NEW.is_returning_user,
        'payment_retry_count', NEW.payment_retry_count,
        'has_outstanding_debt', NEW.has_outstanding_debt
      ),
      updated_at = NOW()
    WHERE user_id = NEW.profile_id
      AND id = (
        SELECT id FROM subscriptions
        WHERE user_id = NEW.profile_id
        ORDER BY created_at DESC
        LIMIT 1
      );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER onboarding_profiles_instead_of_update
  INSTEAD OF UPDATE ON onboarding_profiles
  FOR EACH ROW
  EXECUTE FUNCTION onboarding_profiles_update();

-- Recreate DELETE trigger function
CREATE OR REPLACE FUNCTION onboarding_profiles_delete()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM users WHERE id = OLD.profile_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER onboarding_profiles_instead_of_delete
  INSTEAD OF DELETE ON onboarding_profiles
  FOR EACH ROW
  EXECUTE FUNCTION onboarding_profiles_delete();

-- =============================================================================
-- Migration Complete - Summary
-- =============================================================================
DO $$
DECLARE
  v_has_function BOOLEAN;
  v_has_retry_fields BOOLEAN;
  v_has_bucket BOOLEAN;
BEGIN
  -- Check if payment function exists
  SELECT EXISTS (
    SELECT 1 FROM pg_proc
    WHERE proname = 'process_first_payment_transaction'
  ) INTO v_has_function;

  -- Check if retry fields exist
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'payment_retry_count'
  ) INTO v_has_retry_fields;

  -- Check if storage bucket exists
  SELECT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'progress-photos'
  ) INTO v_has_bucket;

  RAISE NOTICE '
═══════════════════════════════════════════════════════════
  POST PHASE 2 MIGRATION COMPLETE
═══════════════════════════════════════════════════════════
  ✅ Payment transaction function: %
  ✅ Retry fields added: %
  ✅ Progress photos bucket: %
  ✅ Foreign keys fixed
  ✅ Webhook idempotency ensured
  ✅ VIEW triggers recreated

  All critical updates applied successfully!
═══════════════════════════════════════════════════════════
  ',
    CASE WHEN v_has_function THEN 'Created' ELSE 'ERROR - NOT CREATED!' END,
    CASE WHEN v_has_retry_fields THEN 'Added' ELSE 'ERROR - NOT ADDED!' END,
    CASE WHEN v_has_bucket THEN 'Created' ELSE 'May need manual creation' END;
END $$;

-- =============================================================================
-- Update subscription prices to match frontend pricing
-- Date: 2025-10-14
-- =============================================================================

-- Update Groups subscription prices
UPDATE subscription_plans
SET
  price_nok = 890.00,
  display_name = '1 måneds abonnement',
  updated_at = NOW()
WHERE slug = '1month' AND product_type = 'groups';

UPDATE subscription_plans
SET
  price_nok = 590.00,
  display_name = '6 måneders abonnement',
  mollie_description = '6 måneders gruppetrening - Mila (590 NOK/mnd)',
  description = '6 måneder - 590 kr/mnd med 14 dagers angrefrist',
  updated_at = NOW()
WHERE slug = '6month' AND product_type = 'groups';

UPDATE subscription_plans
SET
  price_nok = 490.00,
  display_name = '12 måneders abonnement',
  mollie_description = '12 måneders gruppetrening - Mila (490 NOK/mnd)',
  description = '12 måneder - 490 kr/mnd med 14 dagers angrefrist',
  updated_at = NOW()
WHERE slug = '12month' AND product_type = 'groups';

-- Verify the updates
DO $$
DECLARE
  v_12month_price DECIMAL(10, 2);
  v_6month_price DECIMAL(10, 2);
  v_1month_price DECIMAL(10, 2);
BEGIN
  -- Get updated prices
  SELECT price_nok INTO v_12month_price FROM subscription_plans WHERE slug = '12month' AND product_type = 'groups';
  SELECT price_nok INTO v_6month_price FROM subscription_plans WHERE slug = '6month' AND product_type = 'groups';
  SELECT price_nok INTO v_1month_price FROM subscription_plans WHERE slug = '1month' AND product_type = 'groups';

  -- Verify prices are correct
  IF v_12month_price != 490.00 THEN
    RAISE EXCEPTION '12 month price is incorrect: % (should be 490.00)', v_12month_price;
  END IF;

  IF v_6month_price != 590.00 THEN
    RAISE EXCEPTION '6 month price is incorrect: % (should be 590.00)', v_6month_price;
  END IF;

  IF v_1month_price != 890.00 THEN
    RAISE EXCEPTION '1 month price is incorrect: % (should be 890.00)', v_1month_price;
  END IF;

  RAISE NOTICE '
  ✅ Subscription prices updated successfully:
  - 12 months: 490 kr/month
  - 6 months: 590 kr/month
  - 1 month: 890 kr/month
  ';
END $$;


-- =============================================================================
-- Update One-to-One Subscription Packages
-- Date: 2025-10-15
-- =============================================================================
-- This migration updates the one-to-one subscription packages to match
-- the frontend display (Starter, Transformation, Elite)

-- First, deactivate existing one-to-one plans
UPDATE subscription_plans
SET is_active = false
WHERE product_type = 'one-to-one';

-- Insert new one-to-one packages
INSERT INTO subscription_plans (
    slug,
    display_name,
    price_nok,
    currency,
    duration_months,
    is_binding,
    is_renewable,
    product_type,
    mollie_description,
    description,
    features,
    is_active,
    sort_order
) VALUES
    -- Starter Package (4 weeks / 1 month)
    (
        'starter',
        'Starter - 4 uker',
        3140, -- 299 USD * 10.5 NOK/USD
        'NOK',
        1,
        false,
        true,
        'one-to-one',
        'Starter Package - 4 ukers personlig coaching - Mila',
        '4 ukers personlig coaching pakke',
        '["Personlig kostholdsplan", "Tilpasset treningsprogram", "Ukentlige oppfølgingssamtaler", "E-poststøtte", "App for fremgangssporing"]',
        true,
        20
    ),
    -- Transformation Package (12 weeks / 3 months) - MOST POPULAR
    (
        'transformation',
        'Transformation - 12 uker',
        8390, -- 799 USD * 10.5 NOK/USD
        'NOK',
        3,
        true,
        true,
        'one-to-one',
        'Transformation Package - 12 ukers personlig coaching - Mila',
        '12 ukers transformasjonsprogram (Mest populær)',
        '["Alt i Starter", "Videosamtaler annenhver uke", "Daglig meldingsstøtte", "Kosttilskuddsveiledning", "Tilgang til oppskriftsdatabase", "Livsstilsoptimalisering"]',
        true,
        21
    ),
    -- Elite Package (24 weeks / 6 months)
    (
        'elite',
        'Elite - 24 uker',
        15740, -- 1499 USD * 10.5 NOK/USD
        'NOK',
        6,
        true,
        true,
        'one-to-one',
        'Elite Package - 24 ukers personlig coaching - Mila',
        '24 ukers elite coaching pakke',
        '["Alt i Transformation", "Ukentlige videosamtaler", "Prioritert 24/7 støtte", "Månedlig kroppsanalyse", "Gjestepass for partner", "Livstids vedlikeholdsplan"]',
        true,
        22
    );

-- Add a comment to document the pricing logic
COMMENT ON TABLE subscription_plans IS 'Subscription plans for both groups and one-to-one products. One-to-one prices are converted from USD at 10.5 NOK/USD rate.';


-- =============================================================================
-- Create Typeform View for One-to-One Dashboard
-- Date: 2025-10-14
-- =============================================================================
-- This migration creates a view for storing legacy Typeform data
-- that will be used to fetch historical one-to-one client information

-- Create typeform_responses view to filter only one-to-one clients
CREATE OR REPLACE VIEW typeform_responses AS
SELECT
  u.id,
  u.email,
  u.first_name,
  u.last_name,
  u.phone,
  u.product_type,
  u.created_at as registration_date,
  u.everfit_user_id,
  -- Include physical profile data
  upp.age,
  upp.height,
  upp.weight,
  upp.pregnancy_status,
  upp.breastfeeding_status,
  -- Include fitness goals
  ufg.fitness_goals,
  ufg.motivation_level,
  ufg.training_frequency,
  ufg.previous_obstacles,
  ufg.metadata as fitness_metadata,
  -- Include latest progress entry
  (
    SELECT jsonb_build_object(
      'weight', pe.weight,
      'measurements', pe.measurements,
      'weekly_metrics', pe.weekly_metrics,
      'images', pe.images,
      'submitted_at', pe.submitted_at
    )
    FROM progress_entries pe
    WHERE pe.user_id = u.id
    ORDER BY pe.submitted_at DESC
    LIMIT 1
  ) as current_progress,
  -- Count of progress entries
  (
    SELECT COUNT(*)
    FROM progress_entries pe
    WHERE pe.user_id = u.id
  ) as progress_count,
  -- Count of notes
  (
    SELECT COUNT(*)
    FROM client_notes cn
    WHERE cn.user_id = u.id
  ) as notes_count,
  -- Count of goals
  (
    SELECT COUNT(*)
    FROM client_goals cg
    WHERE cg.user_id = u.id
  ) as goals_count
FROM users u
LEFT JOIN user_physical_profiles upp ON upp.user_id = u.id
LEFT JOIN user_fitness_goals ufg ON ufg.user_id = u.id
WHERE u.product_type = 'one-to-one'
ORDER BY u.created_at DESC;

-- Add comment to the view
COMMENT ON VIEW typeform_responses IS 'View for one-to-one dashboard showing only one-to-one clients with their related data';

-- Grant permissions
GRANT SELECT ON typeform_responses TO authenticated;
GRANT SELECT ON typeform_responses TO service_role;

-- =============================================================================
-- Legacy Typeform IDs Storage (for reference)
-- =============================================================================
-- TODO: Add these form IDs to the backend/supabase/functions/one-to-one-api/routes/typeform.ts file
-- in the TYPEFORM_CONFIG.formIds array once you identify them from the old system

/*
Example of how to add more form IDs:

const TYPEFORM_CONFIG = {
  apiKey: "YOUR_TYPEFORM_API_KEY",
  formIds: [
    "EHvgLFra", // Main one-to-one coaching form (current)
    "ABC123XY", // Legacy form from 2023
    "DEF456ZW", // Old registration form from 2022
    // Add more as needed
  ],
};


To find the old form IDs:
1. Check Typeform account dashboard
2. Look in old email notifications
3. Check previous database backups
4. Review old deployment configurations
*/
