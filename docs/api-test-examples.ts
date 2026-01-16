import { RegistrationApiPayload } from '@/types/registration-api.types';

/**
 * Test examples for the registration API
 * These can be used for testing the backend implementation
 */

// Example 1: Minimal valid payload (weight loss goal, beginner)
export const minimalPayloadExample: RegistrationApiPayload = {
  personalInfo: {
    firstName: "Test",
    lastName: "Bruker",
    email: "test@example.no",
    phone: "+4798765432",
    country: "NO"
  },
  physicalData: {
    age: 25,
    height: 170,
    weight: 80
  },
  motivationData: {
    motivationLevel: "1-3",
    fitnessGoal: "weight_loss",
    trainingFrequency: "none",
    previousObstacles: []
  },
  lifestyleData: {
    pregnancyStatus: "Nei",
    breastfeedingStatus: "Nei"
  },
  subscription: {
    type: "premium",
    plan: "1month",
    price: "890 kr",
    pricePerDay: "29,66 kr per dag"
  },
  metadata: {
    isLeadMagnet: false,
    registrationDate: new Date().toISOString()
  }
};

// Example 2: Full payload with all optional fields
export const fullPayloadExample: RegistrationApiPayload = {
  personalInfo: {
    firstName: "Kari",
    lastName: "Nordmann",
    email: "kari.nordmann@gmail.com",
    phone: "+4712345678",
    country: "NO",
    instagram: "@karinordmann"
  },
  physicalData: {
    age: 35,
    height: 165,
    weight: 70
  },
  motivationData: {
    motivationLevel: "10",
    fitnessGoal: "muscle_gain",
    trainingFrequency: "3+",
    previousObstacles: ["life-happens", "responsibilities", "lack-motivation", "know-but-cant"]
  },
  lifestyleData: {
    pregnancyStatus: "Nei, men planlegger",
    breastfeedingStatus: "Ikke aktuelt"
  },
  subscription: {
    type: "premium",
    plan: "12month",
    price: "490 kr",
    pricePerDay: "16,33 kr per dag"
  },
  metadata: {
    isLeadMagnet: true,
    registrationDate: "2024-01-15T14:30:00.000Z",
    referrer: "https://facebook.com/campaign123",
    utm: {
      source: "facebook",
      medium: "social",
      campaign: "newyear2024"
    }
  }
};

// Example 3: Edge case - minimum age user
export const youngUserExample: RegistrationApiPayload = {
  personalInfo: {
    firstName: "Ung",
    lastName: "Person",
    email: "ung@skole.no",
    phone: "+4755555555",
    country: "NO"
  },
  physicalData: {
    age: 16, // Minimum allowed age
    height: 160,
    weight: 50
  },
  motivationData: {
    motivationLevel: "4-6",
    fitnessGoal: "muscle_gain",
    trainingFrequency: "1-2",
    previousObstacles: ["know-but-cant"]
  },
  lifestyleData: {
    pregnancyStatus: "Nei",
    breastfeedingStatus: "Nei"
  },
  subscription: {
    type: "premium",
    plan: "6month",
    price: "590 kr",
    pricePerDay: "19,66 kr per dag"
  },
  metadata: {
    isLeadMagnet: false,
    registrationDate: new Date().toISOString()
  }
};

// Example 4: Maximum values
export const maxValuesExample: RegistrationApiPayload = {
  personalInfo: {
    firstName: "Stor",
    lastName: "Person",
    email: "stor@example.no",
    phone: "+4799999999",
    country: "NO"
  },
  physicalData: {
    age: 120,  // Maximum allowed age
    height: 250, // Maximum allowed height
    weight: 300  // Maximum allowed weight
  },
  motivationData: {
    motivationLevel: "7-9",
    fitnessGoal: "weight_loss",
    trainingFrequency: "3+",
    previousObstacles: ["responsibilities"]
  },
  lifestyleData: {
    pregnancyStatus: "Nei",
    breastfeedingStatus: "Nei"
  },
  subscription: {
    type: "premium",
    plan: "12month",
    price: "490 kr",
    pricePerDay: "16,33 kr per dag"
  },
  metadata: {
    isLeadMagnet: false,
    registrationDate: new Date().toISOString()
  }
};

// Example 5: International user
export const internationalUserExample: RegistrationApiPayload = {
  personalInfo: {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "+46701234567", // Swedish number
    country: "SE"
  },
  physicalData: {
    age: 40,
    height: 180,
    weight: 85
  },
  motivationData: {
    motivationLevel: "4-6",
    fitnessGoal: "weight_loss",
    trainingFrequency: "1-2",
    previousObstacles: ["life-happens", "lack-motivation"]
  },
  lifestyleData: {
    pregnancyStatus: "No",
    breastfeedingStatus: "No"
  },
  subscription: {
    type: "premium",
    plan: "6month",
    price: "590 kr",
    pricePerDay: "19,66 kr per dag"
  },
  metadata: {
    isLeadMagnet: false,
    registrationDate: new Date().toISOString(),
    utm: {
      source: "google",
      medium: "cpc",
      campaign: "fitness_sweden"
    }
  }
};