# Backend Task: Update Customer Registration API

## Overview
We need to update the `create_customer_for_subscriptions` endpoint to accept a new, more structured data format from the frontend.

## Current State
The endpoint currently expects a flat structure with limited fields.

## Required Changes

### 1. Update Request Body Structure
The endpoint should now accept the following grouped structure:

```typescript
{
  personalInfo: { /* user contact details */ },
  physicalData: { /* age, height, weight */ },
  motivationData: { /* fitness goals and obstacles */ },
  lifestyleData: { /* pregnancy/breastfeeding status */ },
  subscription: { /* plan and pricing */ },
  metadata: { /* tracking and analytics */ }
}
```

See `backend-api-contract.md` for complete structure and field details.

### 2. New Fields to Store
The following fields are now being sent but were previously missing:

- **motivationData.motivationLevel** - User's motivation level (1-3, 4-6, 7-9, 10)
- **motivationData.trainingFrequency** - Current training frequency
- **motivationData.previousObstacles** - Array of obstacles user has faced
- **lifestyleData.pregnancyStatus** - Pregnancy status (free text)
- **lifestyleData.breastfeedingStatus** - Breastfeeding status (free text)
- **personalInfo.instagram** - Optional Instagram handle
- **metadata.isLeadMagnet** - Boolean flag for lead magnet users
- **metadata.registrationDate** - ISO timestamp of registration
- **metadata.utm** - Optional UTM parameters for marketing

### 3. Data Transformations

1. **fitnessGoal**: Now sent as `'weight_loss'` or `'muscle_gain'` (with underscore)
2. **Phone**: Always includes country code (e.g., +4712345678)
3. **Numbers**: age, height, weight are now sent as numbers, not strings

### 4. Backward Compatibility

Consider supporting both old and new formats during transition:
- Check if request has grouped structure (personalInfo, physicalData, etc.)
- If yes, use new format
- If no, fall back to old flat structure

### 5. Validation

Ensure these validations:
- Age: 16-120
- Height: 100-250 cm
- Weight: 30-300 kg
- Email: Valid format
- Phone: Valid international format
- Required fields are present

### 6. Testing

Use the examples in `api-test-examples.ts` to test different scenarios:
- Minimal payload
- Full payload with all optional fields
- Edge cases (min/max values)
- International users

## Files to Review

1. `/docs/backend-api-contract.md` - Complete API documentation
2. `/docs/api-test-examples.ts` - Test payload examples
3. `/src/types/registration-api.types.ts` - TypeScript interfaces

## Priority

**HIGH** - Frontend is already sending data in the new format. Users may experience registration failures until this is implemented.

## Questions?

Contact the frontend team if you need clarification on any fields or validation rules.