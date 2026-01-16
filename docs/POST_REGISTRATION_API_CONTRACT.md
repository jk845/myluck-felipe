# Post-Registration API Contract

## Endpoint
```
POST /functions/v1/store-onboarding-data
```

## Request Headers
```json
{
  "Content-Type": "application/json"
}
```

## Request Body
```json
{
  "email": "user@example.com",
  "orderId": "ord_xxxxx",
  "postRegistrationData": {
    "trainingType": ["gym", "home"],
    "trainingVariation": "variation_preference",
    "exerciseConfidence": "very_well",
    "insecurities": ["stomach", "arms"],
    "mentalityFocus": "very_large",
    "previousObstacles": "Tekst om tidligere hindringer...",
    "interestedInInnerCircle": "yes"
  }
}
```

## Response
```json
{
  "success": true,
  "message": "Onboarding data stored successfully"
}
```

## Field Values

### trainingType (array)
- `"gym"` - Trener på treningsenter
- `"home"` - Trener hjemme
- `"yoga_stretching"` - Yoga eller stretching
- `"walk_run_flat"` - Går/løper på flat bakke
- `"walk_run_forest"` - Går/løper i skog og mark
- `"other"` - Annet

### trainingVariation (string)
Values defined in TrainingVariationContainer

### exerciseConfidence (string)
- `"very_well"` - Jeg håndterer trening og øvelser veldig godt
- `"quite_well"` - Jeg klarer meg ganske bra, men utvikler meg fortsatt
- `"middle"` - Jeg er litt midt i mellom
- `"new"` - Jeg er ny på trening

### insecurities (array)
- `"stomach"` - Magen min
- `"arms"` - Armene mine
- `"thighs"` - Lårene mine
- `"back"` - Ryggen min
- `"neck"` - Nakken min
- `"calves"` - Leggene mine
- `"butt"` - Rumpa mi
- `"endurance"` - Utholdenheten
- `"general_health"` - Min generelle helse
- `"all"` - Alt det ovenfor

### mentalityFocus (string)
- `"very_large"` - En veldig stor del
- `"somewhat"` - Det har vært noe involvert
- `"not_much"` - Ikke mye
- `"nothing"` - Ingenting
- `"not_thought"` - Jeg har ikke tenkt på det før

### previousObstacles (string)
Free text field with user's story

### interestedInInnerCircle (string)
- `"yes"` - Ja
- `"no"` - Nei

## Supabase Edge Function Example

```typescript
// /supabase/functions/store-onboarding-data/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, orderId, postRegistrationData } = await req.json()

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Store in database
    const { data, error } = await supabaseClient
      .from('post_registration_data')
      .upsert({
        email,
        order_id: orderId,
        training_type: postRegistrationData.trainingType,
        training_variation: postRegistrationData.trainingVariation,
        exercise_confidence: postRegistrationData.exerciseConfidence,
        insecurities: postRegistrationData.insecurities,
        mentality_focus: postRegistrationData.mentalityFocus,
        previous_obstacles: postRegistrationData.previousObstacles,
        interested_in_inner_circle: postRegistrationData.interestedInInnerCircle,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'email'
      })

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, message: 'Onboarding data stored successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
```

## Database Table Structure

```sql
CREATE TABLE post_registration_data (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  order_id VARCHAR(255),
  training_type TEXT[],
  training_variation VARCHAR(50),
  exercise_confidence VARCHAR(50),
  insecurities TEXT[],
  mentality_focus VARCHAR(50),
  previous_obstacles TEXT,
  interested_in_inner_circle VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_post_registration_email ON post_registration_data(email);
CREATE INDEX idx_post_registration_order_id ON post_registration_data(order_id);
```