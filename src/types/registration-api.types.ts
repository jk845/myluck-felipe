/**
 * Registration API Contract Types
 * These types define the clean contract between frontend and backend
 * for customer registration data
 */

export interface RegistrationApiPayload {
  // Personal Information
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    instagram?: string;
  };

  // Physical Data
  physicalData: {
    age: number;
    height: number; // in cm
    weight: number; // in kg
  };

  // Motivation & Goals
  motivationData: {
    motivationLevel: '1-3' | '4-6' | '7-9' | '10';
    fitnessGoal: 'weight_loss' | 'muscle_gain';
    trainingFrequency: 'none' | '1-2' | '3+';
    previousObstacles: string[];
  };

  // Lifestyle Data
  lifestyleData: {
    pregnancyStatus: string;
    breastfeedingStatus: string;
  };

  // Subscription Details
  subscription: {
    type: 'premium';
    plan: '1month' | '6month' | '12month';
    price: string;
    pricePerDay: string;
    isPromo?: boolean; // Promo pricing flag (49 kr for 12month, 59 kr for 6month first payment)
  };

  // Additional Metadata
  metadata: {
    isLeadMagnet: boolean;
    registrationDate: string; // ISO 8601
    referrer?: string;
    utm?: {
      source?: string;
      medium?: string;
      campaign?: string;
    };
  };
}

export interface CreateCustomerResponse {
  success: boolean;
  data?: {
    sessionId: string;
    paymentUrl: string;
    customerId?: string;
  };
  error?: {
    code: string;
    message: string;
  };
}