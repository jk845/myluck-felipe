import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { 
  MotivationFormData, 
  PhysicalDataFormData, 
  GoalsLifestyleFormData, 
  ContactInfoFormData 
} from '@/types/registration';

export type RegistrationStep =
  | 'subscription-type'
  | 'subscription-plan'
  | 'physical-data'
  | 'goals-lifestyle'
  | 'contact-info'
  | 'order-confirmation';

interface RegistrationState {
  // Current step
  currentStep: RegistrationStep;

  // Simplified mode (from checkout)
  isSimplifiedMode: boolean;

  // Form data
  subscriptionType: 'premium' | null;
  motivationData: MotivationFormData | null;
  subscriptionPlan: '1month' | '6month' | '12month' | null;
  isPromo: boolean; // Promo pricing flag
  physicalData: PhysicalDataFormData | null;
  goalsLifestyle: GoalsLifestyleFormData | null;
  contactInfo: ContactInfoFormData | null;

  // Session data
  sessionId: string | null;
  paymentUrl: string | null;

  // Actions
  setCurrentStep: (step: RegistrationStep) => void;
  setSubscriptionType: (type: 'premium') => void;
  setMotivationData: (data: MotivationFormData) => void;
  setSubscriptionPlan: (plan: '1month' | '6month' | '12month') => void;
  setIsPromo: (isPromo: boolean) => void;
  setPhysicalData: (data: PhysicalDataFormData) => void;
  setGoalsLifestyle: (data: GoalsLifestyleFormData) => void;
  setContactInfo: (data: ContactInfoFormData) => void;
  setSessionData: (sessionId: string, paymentUrl: string) => void;
  setSimplifiedMode: (simplified: boolean) => void;
  resetRegistration: (preservePromo?: boolean) => void;

  // Computed
  getCompletedSteps: () => RegistrationStep[];
  isStepCompleted: (step: RegistrationStep) => boolean;
  canNavigateToStep: (step: RegistrationStep) => boolean;
}

const STEP_ORDER: RegistrationStep[] = [
  'subscription-type',
  'subscription-plan',
  'physical-data',
  'contact-info',
  'goals-lifestyle',
  'order-confirmation'
];

const initialState = {
  currentStep: 'subscription-type' as RegistrationStep,
  isSimplifiedMode: false,
  subscriptionType: null,
  motivationData: null,
  subscriptionPlan: null,
  isPromo: false,
  physicalData: null,
  goalsLifestyle: null,
  contactInfo: null,
  sessionId: null,
  paymentUrl: null,
};

export const useRegistrationStore = create<RegistrationState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Actions
        setCurrentStep: (step) => set({ currentStep: step }),

        setSubscriptionType: (type) => set({ subscriptionType: type }),

        setMotivationData: (data) => set({ motivationData: data }),

        setSubscriptionPlan: (plan) => set({ subscriptionPlan: plan }),

        setIsPromo: (isPromo) => set({ isPromo }),

        setPhysicalData: (data) => set({ physicalData: data }),
        
        setGoalsLifestyle: (data) => set({ goalsLifestyle: data }),
        
        setContactInfo: (data) => set({ contactInfo: data }),
        
        setSessionData: (sessionId, paymentUrl) =>
          set({ sessionId, paymentUrl }),

        setSimplifiedMode: (simplified) => set({ isSimplifiedMode: simplified }),

        resetRegistration: (preservePromo = false) => {
          const currentPromo = preservePromo ? get().isPromo : false;

          // Reset state but preserve isPromo if requested
          set({
            ...initialState,
            isPromo: currentPromo
          });

          // Note: localStorage will be updated automatically by persist middleware
        },
        
        // Computed
        getCompletedSteps: () => {
          const state = get();
          const completed: RegistrationStep[] = [];
          
          if (state.subscriptionType) completed.push('subscription-type');
          // Skip motivation step - it's removed from flow
          if (state.subscriptionPlan) completed.push('subscription-plan');
          if (state.physicalData) completed.push('physical-data');
          if (state.goalsLifestyle) completed.push('goals-lifestyle');
          if (state.contactInfo) completed.push('contact-info');
          
          return completed;
        },
        
        isStepCompleted: (step) => {
          const state = get();
          switch (step) {
            case 'subscription-type':
              return state.subscriptionType !== null;
            case 'subscription-plan':
              return state.subscriptionPlan !== null;
            case 'physical-data':
              return state.physicalData !== null;
            case 'goals-lifestyle':
              return state.goalsLifestyle !== null;
            case 'contact-info':
              return state.contactInfo !== null;
            case 'order-confirmation':
              return false; // Final step is never "completed"
            default:
              return false;
          }
        },
        
        canNavigateToStep: (targetStep) => {
          const state = get();
          const targetIndex = STEP_ORDER.indexOf(targetStep);
          const currentIndex = STEP_ORDER.indexOf(state.currentStep);
          
          // Can always go back
          if (targetIndex <= currentIndex) return true;
          
          // Can only go forward if all previous steps are completed
          for (let i = 0; i < targetIndex; i++) {
            if (!state.isStepCompleted(STEP_ORDER[i])) {
              return false;
            }
          }
          return true;
        },
      }),
      {
        name: 'registration-storage',
        // Validate state when loading from localStorage
        onRehydrateStorage: () => (state) => {
          if (state && state.currentStep) {
            // Check if currentStep is valid
            if (!STEP_ORDER.includes(state.currentStep)) {
              console.warn('[RegistrationStore] Invalid step in localStorage:', state.currentStep);
              state.currentStep = 'subscription-type';
            }
          }
        },
        partialize: (state) => ({
          // Persist form data AND current step
          currentStep: state.currentStep,
          isSimplifiedMode: state.isSimplifiedMode,
          subscriptionType: state.subscriptionType,
          motivationData: state.motivationData,
          subscriptionPlan: state.subscriptionPlan,
          isPromo: state.isPromo,
          physicalData: state.physicalData,
          goalsLifestyle: state.goalsLifestyle,
          contactInfo: state.contactInfo,
          sessionId: state.sessionId,
        }),
      }
    )
  )
);