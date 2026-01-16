import { RegistrationApiPayload } from '@/types/registration-api.types';

export class RegistrationValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'RegistrationValidationError';
  }
}

/**
 * Validates the complete registration API payload
 * @throws {RegistrationValidationError} if validation fails
 */
export function validateRegistrationPayload(payload: RegistrationApiPayload): void {
  // Personal Info validation
  if (!payload.personalInfo.firstName?.trim()) {
    throw new RegistrationValidationError('personalInfo.firstName', 'First name is required');
  }
  
  if (!payload.personalInfo.lastName?.trim()) {
    throw new RegistrationValidationError('personalInfo.lastName', 'Last name is required');
  }
  
  if (!payload.personalInfo.email?.trim()) {
    throw new RegistrationValidationError('personalInfo.email', 'Email is required');
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.personalInfo.email)) {
    throw new RegistrationValidationError('personalInfo.email', 'Invalid email format');
  }
  
  if (!payload.personalInfo.phone?.trim()) {
    throw new RegistrationValidationError('personalInfo.phone', 'Phone number is required');
  }
  
  // Physical Data validation
  if (!payload.physicalData.age || payload.physicalData.age < 16 || payload.physicalData.age > 120) {
    throw new RegistrationValidationError('physicalData.age', 'Age must be between 16 and 120');
  }
  
  if (!payload.physicalData.height || payload.physicalData.height < 100 || payload.physicalData.height > 250) {
    throw new RegistrationValidationError('physicalData.height', 'Height must be between 100 and 250 cm');
  }
  
  if (!payload.physicalData.weight || payload.physicalData.weight < 30 || payload.physicalData.weight > 300) {
    throw new RegistrationValidationError('physicalData.weight', 'Weight must be between 30 and 300 kg');
  }
  
  // Motivation Data validation
  const validMotivationLevels = ['1-3', '4-6', '7-9', '10'];
  if (!validMotivationLevels.includes(payload.motivationData.motivationLevel)) {
    throw new RegistrationValidationError('motivationData.motivationLevel', 'Invalid motivation level');
  }
  
  const validFitnessGoals = ['weight_loss', 'muscle_gain'];
  if (!validFitnessGoals.includes(payload.motivationData.fitnessGoal)) {
    throw new RegistrationValidationError('motivationData.fitnessGoal', 'Invalid fitness goal');
  }
  
  const validTrainingFrequencies = ['none', '1-2', '3+'];
  if (!validTrainingFrequencies.includes(payload.motivationData.trainingFrequency)) {
    throw new RegistrationValidationError('motivationData.trainingFrequency', 'Invalid training frequency');
  }
  
  if (!Array.isArray(payload.motivationData.previousObstacles)) {
    throw new RegistrationValidationError('motivationData.previousObstacles', 'Previous obstacles must be an array');
  }
  
  // Lifestyle Data validation
  if (!payload.lifestyleData.pregnancyStatus?.trim()) {
    throw new RegistrationValidationError('lifestyleData.pregnancyStatus', 'Pregnancy status is required');
  }
  
  if (!payload.lifestyleData.breastfeedingStatus?.trim()) {
    throw new RegistrationValidationError('lifestyleData.breastfeedingStatus', 'Breastfeeding status is required');
  }
  
  // Subscription validation
  const validPlans = ['1month', '6month', '12month', '6month_pay_at_once', '12month_pay_at_once'];
  if (!validPlans.includes(payload.subscription.plan)) {
    throw new RegistrationValidationError('subscription.plan', `Invalid subscription plan: ${payload.subscription.plan}`);
  }
  
  if (!payload.subscription.price?.trim()) {
    throw new RegistrationValidationError('subscription.price', 'Subscription price is required');
  }
  
  // Metadata validation
  if (typeof payload.metadata.isLeadMagnet !== 'boolean') {
    throw new RegistrationValidationError('metadata.isLeadMagnet', 'Lead magnet flag must be a boolean');
  }
  
  if (!payload.metadata.registrationDate) {
    throw new RegistrationValidationError('metadata.registrationDate', 'Registration date is required');
  }
}