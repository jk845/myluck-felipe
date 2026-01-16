# Cancellation Feedback Implementation Plan

## Overview

This document outlines the implementation plan for collecting and storing user
feedback when they cancel their subscription. The feedback will be stored in a
dedicated table for better organization and future analysis.

## 1. Database Schema

### Create a New Table for Cancellation Feedback

```sql
CREATE TABLE cancellation_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  email TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_id TEXT,
  subscription_plan TEXT,
  processed BOOLEAN DEFAULT FALSE
);

-- Add indexes for better query performance
CREATE INDEX idx_cancellation_feedback_user_id ON cancellation_feedback(user_id);
CREATE INDEX idx_cancellation_feedback_email ON cancellation_feedback(email);
CREATE INDEX idx_cancellation_feedback_created_at ON cancellation_feedback(created_at);
```

## 2. Frontend Implementation

### 2.1 Update CancelSubscription.tsx

The current implementation of the cancellation feedback form should be updated
to match the style of the Confirmation page:

```tsx
// Update the textarea section in CancelSubscription.tsx
<div className="mb-8">
  <h3 className="text-xl font-semibold font-['Hind_Vadodara'] leading-tight text-center mb-8">
    Hvorfor ønsker du å avbestille<br />abonnementet ditt? ❤️
  </h3>

  <div className="flex flex-col items-center">
    <textarea
      className="w-full h-60 rounded-xl font-['Libre_Baskerville'] tracking-tight border border-black border-opacity-20 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-300 transition-all mb-10"
      value={cancellationReason}
      onChange={(e) => setCancellationReason(e.target.value)}
      placeholder="👉 Bare skriv noen ord her!"
      required
    />
  </div>
</div>;
```

This update:

- Uses the same styling as the Confirmation page
- Makes the question more conversational and centered
- Uses the same placeholder text style with emoji
- Uses the same textarea height and styling
- Adds the heart emoji to make it more friendly

### 2.2 Update CancellationSuccess.tsx

The success message has already been updated to acknowledge the user's feedback:

```tsx
<p className="text-center text-black text-opacity-60 text-base font-normal font-['Libre_Baskerville'] mb-8">
  Takk for din tilbakemelding! Din mening er viktig for oss og hjelper oss å
  forbedre tjenesten vår.
</p>;
```

## 3. Backend Changes

### 3.1. Update the `cancel-subscription` Edge Function

```typescript
// In the cancel-subscription function
Deno.serve(async (req) => {
  // ... existing code ...
  
  try {
    // Parse request body
    const { email, cancellationReason } = await req.json();
    
    // Validate inputs
    if (!email) {
      return jsonResponse({ error: "Email is required" }, 400);
    }
    
    if (!cancellationReason) {
      return jsonResponse({ error: "Cancellation reason is required" }, 400);
    }
    
    // Find user by email
    const { data: userData, error: userError } = await supabase
      .from("onboarding_profiles")
      .select("profile_id, mollie_customer_id, subscription_plan, mollie_subscription_id")
      .eq("email", email.toLowerCase())
      .single();
    
    if (userError || !userData) {
      return jsonResponse({ emailNotFound: true }, 404);
    }
    
    // Store the cancellation feedback
    const { error: feedbackError } = await supabase
      .from("cancellation_feedback")
      .insert({
        user_id: userData.profile_id,
        email: email.toLowerCase(),
        reason: cancellationReason,
        subscription_id: userData.mollie_subscription_id,
        subscription_plan: userData.subscription_plan
      });
    
    if (feedbackError) {
      logger.error(`Failed to store cancellation feedback: ${feedbackError.message}`);
      // Continue with the process even if storing feedback fails
    }
    
    // Generate cancellation token (existing code)
    const token = crypto.randomUUID();
    
    // Store token in cancellation_tokens table (existing code)
    const { error: tokenError } = await supabase
      .from("cancellation_tokens")
      .insert({
        user_id: userData.profile_id,
        email: email.toLowerCase(),
        token: token,
        mollie_subscription_id: userData.mollie_subscription_id,
        used: false
      });
    
    // ... rest of the existing code (send email, etc.)
  }
  // ... error handling ...
});
```

### 3.2. Update the `confirm-cancellation` Edge Function

The confirm-cancellation function doesn't need major changes since the feedback
is already stored when the user initiates the cancellation. However, we should
update the feedback record to mark it as processed:

```typescript
// In the confirm-cancellation function
// After successfully cancelling the subscription in Mollie and updating the database

// Mark the feedback as processed
await supabase
  .from("cancellation_feedback")
  .update({ processed: true })
  .eq("user_id", tokenData.user_id)
  .eq("processed", false)
  .order("created_at", { ascending: false })
  .limit(1);
```

## 4. Comparison with Confirmation Feedback

Both the Confirmation page and CancelSubscription page collect feedback, but for
different purposes:

1. **Confirmation Feedback**:
   - Collects feedback about user concerns before joining
   - Positive context (user has just signed up)
   - Helps understand barriers to conversion
   - Stored in a separate table (likely `customer_feedback`)

2. **Cancellation Feedback**:
   - Collects reasons why users are leaving
   - Negative context (user is cancelling)
   - Helps understand churn factors
   - Will be stored in the new `cancellation_feedback` table

This separation allows for distinct analysis of acquisition vs. retention
issues.

## 5. Analytics and Reporting

With a dedicated table for cancellation feedback, you can easily:

1. Create dashboards to analyze cancellation reasons
2. Run queries to identify common patterns
3. Export data for further analysis

Example queries:

```sql
-- Get most common cancellation reasons
SELECT reason, COUNT(*) as count
FROM cancellation_feedback
GROUP BY reason
ORDER BY count DESC;

-- Get cancellation reasons by subscription plan
SELECT subscription_plan, reason, COUNT(*) as count
FROM cancellation_feedback
GROUP BY subscription_plan, reason
ORDER BY subscription_plan, count DESC;

-- Get cancellation trends over time
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as cancellations
FROM cancellation_feedback
GROUP BY month
ORDER BY month;

-- Compare with sign-up feedback (if available)
SELECT 
  'Sign-up concerns' as feedback_type,
  COUNT(*) as count
FROM customer_feedback
UNION ALL
SELECT 
  'Cancellation reasons' as feedback_type,
  COUNT(*) as count
FROM cancellation_feedback;
```

## 6. Future Enhancements

1. **Categorization**: Add a category field to the feedback table to classify
   reasons (e.g., "too expensive", "not using enough", "technical issues")
2. **Sentiment Analysis**: Integrate with an AI service to analyze the sentiment
   of feedback
3. **Automated Responses**: Based on the feedback category, send tailored emails
   with relevant offers or solutions
4. **Retention Strategies**: Develop targeted retention strategies based on
   common cancellation reasons

## Implementation Timeline

1. **Database Changes**: Create the new cancellation_feedback table
2. **Frontend Updates**: Update the CancelSubscription.tsx to match the
   Confirmation page style
3. **Backend Updates**: Modify the cancel-subscription and confirm-cancellation
   edge functions
4. **Testing**: Test the complete flow from frontend to backend
5. **Monitoring**: Set up monitoring to ensure feedback is being collected
   properly
6. **Analytics**: Create initial reports based on the collected data

## Conclusion

This implementation creates a robust system for collecting, storing, and
analyzing cancellation feedback with a style consistent with the rest of the
application. By using a dedicated table and matching the user-friendly style of
the Confirmation page, you'll improve both the user experience and the quality
of feedback received.
