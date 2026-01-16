export enum PostRegistrationStep {
  PaymentSuccess = 1,
  TrainingType = 2,
  TrainingVariation = 3,
  ExerciseConfidence = 4,
  Insecurities = 5,
  MentalityFocus = 6,
  PreviousObstacles = 7,
  InnerCircle = 8,
  Instructions = 9,
}

export type WelcomeData = {
  acknowledged: boolean;
};

export type TrainingFrequencyData = {
  trainingFrequency: string;
};

export type TrainingTypeData = {
  trainingType: string[];
};

export type TrainingConfidenceData = {
  trainingConfidence: string;
};

export type InsecuritiesData = {
  insecurities: string[];
};

export type MentalityData = {
  mentalityFocus: string;
  previousObstacles: string;
};

export type FinalQuestionsData = {
  interestedInInnerCircle: string;
  joinSnapchatGroup: string;
};

export type TrainingVariationData = {
  variationPreference: string;
};

export type PersonalInfoData = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  instagram: string;
};

export type PhysicalDataPostRegData = {
  age: number;
  height: number;
  weight: number;
};

export type GoalsData = {
  goal: string;
  pregnant: string;
  breastfeeding: string;
};