# Supabase Edge Functions for Subscription Cancellation

This guide provides instructions for implementing the Supabase Edge Functions
needed for the subscription cancellation flow.

## Overview

The cancellation flow requires two Edge Functions:

1. `cancel-subscription-request` - Handles the initial request to cancel a
   subscription
2. `confirm-cancellation` - Processes the confirmation when a user clicks the
   link in the email

## Database Setup

First, create a new table in your Supabase database to store cancellation
tokens:

```sql
CREATE TABLE cancellation_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE
);

-- Create index for faster lookups
CREATE INDEX idx_cancellation_tokens_token ON cancellation_tokens(token);
CREATE INDEX idx_cancellation_tokens_email ON cancellation_tokens(email);
```

## Function 1: cancel-subscription-request

This function receives an email address, verifies it exists in the database, and
sends a confirmation email.

### Implementation

```typescript
// supabase/functions/cancel-subscription-request/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        // Parse request
        const { email } = await req.json();

        if (!email || typeof email !== "string") {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Invalid email address",
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: 400,
                },
            );
        }

        // Initialize Supabase client
        const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Check if email exists in users table
        const { data: user, error: userError } = await supabase
            .from("users") // or your users/subscriptions table
            .select("id, email")
            .eq("email", email.toLowerCase())
            .single();

        if (userError || !user) {
            return new Response(
                JSON.stringify({
                    success: false,
                    emailNotFound: true,
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: 404,
                },
            );
        }

        // Generate cancellation token
        const token = crypto.randomUUID();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // Token valid for 24 hours

        // Store token in database
        const { error: tokenError } = await supabase
            .from("cancellation_tokens")
            .insert({
                user_id: user.id,
                email: user.email,
                token: token,
                expires_at: expiresAt.toISOString(),
                used: false,
            });

        if (tokenError) {
            console.error("Error storing token:", tokenError);
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Failed to generate cancellation token",
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: 500,
                },
            );
        }

        // Send email with cancellation link
        const frontendUrl = Deno.env.get("FRONTEND_URL") ??
            "https://yourdomain.com";
        const cancellationUrl =
            `${frontendUrl}/confirm-cancellation?token=${token}`;

        // Configure SMTP client
        const client = new SmtpClient();
        await client.connectTLS({
            hostname: Deno.env.get("SMTP_HOST") ?? "",
            port: parseInt(Deno.env.get("SMTP_PORT") ?? "587"),
            username: Deno.env.get("SMTP_USERNAME") ?? "",
            password: Deno.env.get("SMTP_PASSWORD") ?? "",
        });

        // Send email
        await client.send({
            from: Deno.env.get("EMAIL_FROM") ?? "noreply@yourdomain.com",
            to: user.email,
            subject: "Bekreft avbestilling av ditt MyLuck-abonnement",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">MyLuck</h1>
          <div style="background-color: #f5f0fd; padding: 20px; border-radius: 10px;">
            <h2 style="color: #333;">Bekreft avbestilling</h2>
            <p>Hei,</p>
            <p>Vi har mottatt en forespørsel om å avbestille ditt MyLuck-abonnement. For å bekrefte avbestillingen, vennligst klikk på knappen nedenfor:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${cancellationUrl}" style="background-color: #fbdcfb; color: #000; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-weight: bold; display: inline-block; border: 2px solid #000;">Bekreft avbestilling</a>
            </div>
            <p>Eller kopier og lim inn denne lenken i nettleseren din:</p>
            <p style="word-break: break-all; background-color: #f5f5f7; padding: 10px; border-radius: 5px;">${cancellationUrl}</p>
            <p>Denne lenken er gyldig i 24 timer.</p>
            <p>Hvis du ikke ba om å avbestille abonnementet ditt, kan du trygt ignorere denne e-posten.</p>
            <p>Med vennlig hilsen,<br>MyLuck-teamet</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>© 2025 MyLuck by Gymfluence. All rights reserved.</p>
            <p>Hvis du har spørsmål, kontakt oss på <a href="mailto:ask@myluck.no">ask@myluck.no</a></p>
          </div>
        </div>
      `,
        });

        await client.close();

        // Return success response
        return new Response(
            JSON.stringify({
                success: true,
                message: "Cancellation email sent",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            },
        );
    } catch (error) {
        console.error("Error processing cancellation request:", error);

        return new Response(
            JSON.stringify({
                success: false,
                error: "Internal server error",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});
```

## Function 2: confirm-cancellation

This function processes the cancellation confirmation when a user clicks the
link in the email.

### Implementation

```typescript
// supabase/functions/confirm-cancellation/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        // Parse request
        const { token } = await req.json();

        if (!token || typeof token !== "string") {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Invalid token",
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: 400,
                },
            );
        }

        // Initialize Supabase client
        const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Get the token from the database
        const { data: tokenData, error: tokenError } = await supabase
            .from("cancellation_tokens")
            .select("id, user_id, email, expires_at, used")
            .eq("token", token)
            .single();

        if (tokenError || !tokenData) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Invalid or expired token",
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: 404,
                },
            );
        }

        // Check if token is expired
        const now = new Date();
        const expiresAt = new Date(tokenData.expires_at);

        if (now > expiresAt) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Token expired",
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: 400,
                },
            );
        }

        // Check if token has already been used
        if (tokenData.used) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Token already used",
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: 400,
                },
            );
        }

        // Mark token as used
        const { error: updateError } = await supabase
            .from("cancellation_tokens")
            .update({ used: true })
            .eq("id", tokenData.id);

        if (updateError) {
            console.error("Error updating token:", updateError);
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Failed to process cancellation",
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: 500,
                },
            );
        }

        // Update user subscription status
        // This will depend on your database structure and subscription model
        // Example:
        const { error: subscriptionError } = await supabase
            .from("subscriptions")
            .update({
                status: "cancelled",
                cancelled_at: new Date().toISOString(),
                // Don't set end_date if you want the subscription to remain active until the end of the billing period
                // end_date: new Date().toISOString()
            })
            .eq("user_id", tokenData.user_id)
            .eq("status", "active");

        if (subscriptionError) {
            console.error("Error updating subscription:", subscriptionError);
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Failed to cancel subscription",
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: 500,
                },
            );
        }

        // Return success response
        return new Response(
            JSON.stringify({
                success: true,
                message: "Subscription successfully cancelled",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            },
        );
    } catch (error) {
        console.error("Error processing cancellation confirmation:", error);

        return new Response(
            JSON.stringify({
                success: false,
                error: "Internal server error",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});
```

## Deployment

To deploy these functions to Supabase:

1. Install the Supabase CLI if you haven't already:
   ```bash
   npm install -g supabase
   ```

2. Log in to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Deploy the functions:
   ```bash
   supabase functions deploy cancel-subscription-request
   supabase functions deploy confirm-cancellation
   ```

## Environment Variables

Make sure to set the following environment variables in your Supabase project:

```bash
supabase secrets set SMTP_HOST=your-smtp-host
supabase secrets set SMTP_PORT=587
supabase secrets set SMTP_USERNAME=your-smtp-username
supabase secrets set SMTP_PASSWORD=your-smtp-password
supabase secrets set EMAIL_FROM=noreply@yourdomain.com
supabase secrets set FRONTEND_URL=https://yourdomain.com
```

## Testing

Test your functions using the Supabase CLI:

```bash
# Test cancel-subscription-request
curl -X POST "http://localhost:54321/functions/v1/cancel-subscription-request" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Test confirm-cancellation
curl -X POST "http://localhost:54321/functions/v1/confirm-cancellation" \
  -H "Content-Type: application/json" \
  -d '{"token": "your-test-token"}'
```

## Frontend Integration

The frontend will need to:

1. Display appropriate success/error messages
2. Create success and error pages for the confirmation flow
   (/cancellation-success and /cancellation-error)

These pages have already been created in the frontend codebase:

- `src/pages/CancelSubscription.tsx` - Initial page for entering email
- `src/pages/ConfirmCancellation.tsx` - Page that processes the token from the
  email link
- `src/pages/CancellationSuccess.tsx` - Success page shown after successful
  cancellation
- `src/pages/CancellationError.tsx` - Error page shown if cancellation fails
