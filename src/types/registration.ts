export interface MotivationFormData {
  motivation: '1-3' | '4-6' | '7-9' | '10';
  fitnessGoal?: 'weightloss' | 'musclegain'; // Now optional, moved to GoalsLifestyle
  trainingFrequency?: 'none' | '1-2' | '3+'; // Optional with default
  previousObstacles?: string[]; // Optional with default
}

export interface PhysicalDataFormData {
  weight: string;
  height: string;
  age: string;
  pregnancyStatus?: 'not_pregnant' | 'pregnant' | 'postpartum';
  breastfeedingStatus?: 'yes' | 'no';
}

export interface GoalsLifestyleFormData {
  fitnessGoal: 'weightloss' | 'musclegain'; // Moved from Motivation
  pregnancyStatus: string;
  breastfeedingStatus: string;
}

export interface ContactInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  instagram?: string;
}

export interface SubscriptionInfo {
  name: string;
  price: string;
  subscription: string;
  selectedPlan: '1month' | '6month' | '12month';
  isPromo?: boolean; // Promo pricing flag
}

export interface RegistrationPayload {
  contactInfo: ContactInfoFormData & { phone: string };
  physicalData: PhysicalDataFormData;
  goalsLifestyle: GoalsLifestyleFormData;
  motivationData: MotivationFormData;
  subscriptionInfo: SubscriptionInfo;
  metadata: {
    isLeadMagnet: boolean;
  };
}