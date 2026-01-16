# Backend API Contract - Customer Registration

## Endpoint: `/functions/v1/create_customer_for_subscriptions`

### Request Body Structure

```typescript
{
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;        // Format: "+47XXXXXXXX" (with country code)
    country: string;      // Default: "NO"
    instagram?: string;   // Optional
  };

  physicalData: {
    age: number;          // Range: 16-120
    height: number;       // Range: 100-250 (in cm)
    weight: number;       // Range: 30-300 (in kg)
  };

  motivationData: {
    motivationLevel: '1-3' | '4-6' | '7-9' | '10';
    fitnessGoal: 'weight_loss' | 'muscle_gain';
    trainingFrequency: 'none' | '1-2' | '3+';
    previousObstacles: string[];  // Array of obstacle keys
  };

  lifestyleData: {
    pregnancyStatus: string;
    breastfeedingStatus: string;
  };

  subscription: {
    type: 'premium';              // Currently always 'premium'
    plan: '1month' | '6month' | '12month';
    price: string;                // Format: "XXX kr"
    pricePerDay: string;          // Format: "XX,XX kr per dag"
  };

  metadata: {
    isLeadMagnet: boolean;
    registrationDate: string;     // ISO 8601 format
    referrer?: string;            // Optional
    utm?: {                       // Optional
      source?: string;
      medium?: string;
      campaign?: string;
    };
  };
}
```

## Field Details and Possible Values

### personalInfo
- **firstName**: User's first name
- **lastName**: User's last name
- **email**: Valid email address
- **phone**: Phone number with country code (e.g., "+4712345678")
- **country**: Country code, default "NO" for Norway
- **instagram**: Optional Instagram handle

### physicalData
- **age**: Integer between 16 and 120
- **height**: Integer between 100 and 250 (centimeters)
- **weight**: Integer between 30 and 300 (kilograms)

### motivationData

#### motivationLevel
- `'1-3'`: "Litt nysgjerrig" (A bit curious)
- `'4-6'`: "Ganske motivert" (Quite motivated)
- `'7-9'`: "Veldig klar!" (Very ready!)
- `'10'`: "MAKSIMALT KLAR!" (Maximally ready!)

#### fitnessGoal
- `'weight_loss'`: "Bli slank og definert" (Get lean and defined)
- `'muscle_gain'`: "Bygge muskler og styrke" (Build muscles and strength)

#### trainingFrequency
- `'none'`: "Trener ikke ennå" (Don't train yet)
- `'1-2'`: "1-2 ganger i uka" (1-2 times per week)
- `'3+'`: "3+ ganger i uka" (3+ times per week)

#### previousObstacles
Array containing any combination of these values:
- `'life-happens'`: "Livet kommer i veien" (Life gets in the way)
- `'responsibilities'`: "For mye ansvar, for lite tid" (Too much responsibility, too little time)
- `'lack-motivation'`: "Mister motivasjonen" (Lose motivation)
- `'know-but-cant'`: "Trenger støtte og veiledning" (Need support and guidance)

### lifestyleData
- **pregnancyStatus**: User's response about pregnancy status (free text)
- **breastfeedingStatus**: User's response about breastfeeding status (free text)

### subscription

#### plan
- `'1month'`: Monthly subscription
- `'6month'`: 6-month subscription
- `'12month'`: Annual subscription

#### Pricing
| Plan | Price | Price Per Day |
|------|-------|---------------|
| 1month | "890 kr" | "29,66 kr per dag" |
| 6month | "590 kr" | "19,66 kr per dag" |
| 12month | "490 kr" | "16,33 kr per dag" |

### metadata
- **isLeadMagnet**: Boolean indicating if user came through lead magnet flow
- **registrationDate**: ISO 8601 formatted timestamp (e.g., "2024-01-15T14:30:00.000Z")
- **referrer**: Optional referrer URL
- **utm**: Optional UTM parameters for marketing attribution

## Example Request

```json
{
  "personalInfo": {
    "firstName": "Kari",
    "lastName": "Nordmann",
    "email": "kari@example.no",
    "phone": "+4712345678",
    "country": "NO",
    "instagram": "@karinordmann"
  },
  "physicalData": {
    "age": 35,
    "height": 165,
    "weight": 70
  },
  "motivationData": {
    "motivationLevel": "7-9",
    "fitnessGoal": "weight_loss",
    "trainingFrequency": "1-2",
    "previousObstacles": ["life-happens", "lack-motivation"]
  },
  "lifestyleData": {
    "pregnancyStatus": "Nei",
    "breastfeedingStatus": "Nei"
  },
  "subscription": {
    "type": "premium",
    "plan": "12month",
    "price": "490 kr",
    "pricePerDay": "16,33 kr per dag"
  },
  "metadata": {
    "isLeadMagnet": false,
    "registrationDate": "2024-01-15T14:30:00.000Z"
  }
}
```

## Expected Response

### Success Response
```json
{
  "success": true,
  "checkout_url": "https://payment-gateway.com/checkout/...",
  "payment_id": "pay_123456789",
  "sessionId": "cs_123456789"
}
```

### Existing User Response
```json
{
  "success": true,
  "existing_user": true,
  "message": "Du har allerede betalt for dette programmet."
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Important Notes

1. **Phone Number Format**: The phone number is always sent with country code prefix (e.g., +47 for Norway)
2. **Currency**: All prices are in Norwegian Kroner (kr)
3. **Language**: All text values are in Norwegian
4. **Default Values**: 
   - Country defaults to "NO" if not provided
   - Subscription type is always "premium" currently
5. **Required Fields**: All fields except those marked as optional (instagram, referrer, utm) are required

## Migration Notes from Old Format

The old format sent data as:
```json
{
  "firstName": "...",
  "lastName": "...",
  "email": "...",
  "phone": "...",
  "age": 30,
  "height": 170,
  "weight": 70,
  "country": "NO",
  "fitnessGoals": "weight_loss",
  "subscription": {
    "type": "premium",
    "plan": "12month",
    "price": "490 kr",
    "pricePerDay": "16,33 kr per dag"
  }
}
```

The new format groups related data and includes additional fields that were previously not sent.