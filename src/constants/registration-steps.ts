import SubscriptionTypeStep from '@/pages/registration/SubscriptionTypeStep';
import SubscriptionPlanStep from '@/pages/registration/SubscriptionPlanStep';
import PhysicalDataStep from '@/pages/registration/PhysicalDataStepHorizontal';
import GoalsLifestyleStep from '@/pages/registration/GoalsLifestyleStep';
import ContactInfoStep from '@/pages/registration/ContactInfoStep';
import OrderConfirmationStep from '@/pages/registration/OrderConfirmationStep';

export const REGISTRATION_STEPS = {
  'subscription-type': {
    number: 1,
    subtitle: 'Velg abonnement',
    component: SubscriptionTypeStep,
    previousStep: null,
    nextStep: 'subscription-plan' as const,
  },
  'subscription-plan': {
    number: 2,
    subtitle: 'Velg abonnementsperiode',
    component: SubscriptionPlanStep,
    previousStep: 'subscription-type' as const,
    nextStep: 'physical-data' as const,
  },
  'physical-data': {
    number: 3,
    subtitle: 'Fysiske data',
    component: PhysicalDataStep,
    previousStep: 'subscription-plan' as const,
    nextStep: 'contact-info' as const,
  },
  'contact-info': {
    number: 4,
    subtitle: 'Kontaktinformasjon',
    component: ContactInfoStep,
    previousStep: 'physical-data' as const,
    nextStep: 'goals-lifestyle' as const,
  },
  'goals-lifestyle': {
    number: 5,
    subtitle: 'Mål og livsstil',
    component: GoalsLifestyleStep,
    previousStep: 'contact-info' as const,
    nextStep: 'order-confirmation' as const,
  },
  'order-confirmation': {
    number: 6,
    subtitle: 'Betalingsmetode',
    component: OrderConfirmationStep,
    previousStep: 'goals-lifestyle' as const,
    nextStep: null,
  },
} as const;

export type RegistrationStep = keyof typeof REGISTRATION_STEPS;
export const TOTAL_STEPS = Object.keys(REGISTRATION_STEPS).length;

export const getStepConfig = (step: RegistrationStep) => {
  return REGISTRATION_STEPS[step];
};

export const isValidStep = (step: string): step is RegistrationStep => {
  return step in REGISTRATION_STEPS;
};