import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  PostRegistrationStep,
  TrainingTypeData,
  TrainingVariationData,
  TrainingConfidenceData,
  InsecuritiesData,
} from '@/types/post-registration';

interface PostRegistrationState {
  // Current step
  currentStep: PostRegistrationStep;
  
  // Form data
  paymentFeedback: string | null;
  trainingTypeData: TrainingTypeData | null;
  trainingVariationData: TrainingVariationData | null;
  exerciseConfidenceData: TrainingConfidenceData | null;
  insecuritiesData: InsecuritiesData | null;
  mentalityFocusData: { mentalityFocus: string } | null;
  previousObstaclesData: { previousObstacles: string } | null;
  innerCircleData: { interestedInInnerCircle: string } | null;
  
  // Customer info
  customerInfo: {
    orderId: string;
    email: string;
    password: string;
    subscriptionPlan: string;
    price: string;
    renewalDate: string;
    nextPaymentDate: string;
    nextCycleDate: string;
    subscriptionType: string;
  } | null;
  
  // Actions
  setCurrentStep: (step: PostRegistrationStep) => void;
  setPaymentFeedback: (feedback: string) => void;
  setTrainingTypeData: (data: TrainingTypeData) => void;
  setTrainingVariationData: (data: TrainingVariationData) => void;
  setExerciseConfidenceData: (data: TrainingConfidenceData) => void;
  setInsecuritiesData: (data: InsecuritiesData) => void;
  setMentalityFocusData: (data: { mentalityFocus: string }) => void;
  setPreviousObstaclesData: (data: { previousObstacles: string }) => void;
  setInnerCircleData: (data: { interestedInInnerCircle: string }) => void;
  setCustomerInfo: (info: PostRegistrationState['customerInfo']) => void;
  resetPostRegistration: () => void;
  
  // Computed
  getCompletedSteps: () => PostRegistrationStep[];
  isStepCompleted: (step: PostRegistrationStep) => boolean;
  canNavigateToStep: (step: PostRegistrationStep) => boolean;
}

const STEP_ORDER: PostRegistrationStep[] = [
  PostRegistrationStep.PaymentSuccess,
  PostRegistrationStep.TrainingType,
  PostRegistrationStep.TrainingVariation,
  PostRegistrationStep.ExerciseConfidence,
  PostRegistrationStep.Insecurities,
  PostRegistrationStep.MentalityFocus,
  PostRegistrationStep.PreviousObstacles,
  PostRegistrationStep.InnerCircle,
  PostRegistrationStep.Instructions,
];

const initialState = {
  currentStep: PostRegistrationStep.PaymentSuccess,
  paymentFeedback: null,
  trainingTypeData: null,
  trainingVariationData: null,
  exerciseConfidenceData: null,
  insecuritiesData: null,
  mentalityFocusData: null,
  previousObstaclesData: null,
  innerCircleData: null,
  customerInfo: null,
};

export const usePostRegistrationStore = create<PostRegistrationState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Actions
        setCurrentStep: (step) => set({ currentStep: step }),
        
        setPaymentFeedback: (feedback) => set({ paymentFeedback: feedback }),
        
        setTrainingTypeData: (data) => set({ trainingTypeData: data }),
        
        setTrainingVariationData: (data) => set({ trainingVariationData: data }),
        
        setExerciseConfidenceData: (data) => set({ exerciseConfidenceData: data }),
        
        setInsecuritiesData: (data) => set({ insecuritiesData: data }),
        
        setMentalityFocusData: (data) => set({ mentalityFocusData: data }),
        
        setPreviousObstaclesData: (data) => set({ previousObstaclesData: data }),
        
        setInnerCircleData: (data) => set({ innerCircleData: data }),
        
        setCustomerInfo: (info) => set({ customerInfo: info }),
        
        resetPostRegistration: () => {
          // Clear localStorage
          localStorage.removeItem('post-registration-storage');
          // Reset state
          set(initialState);
        },
        
        // Computed
        getCompletedSteps: () => {
          const state = get();
          const completed: PostRegistrationStep[] = [];
          
          // PaymentSuccess is always completed if we have customer info
          if (state.customerInfo) completed.push(PostRegistrationStep.PaymentSuccess);
          if (state.trainingTypeData) completed.push(PostRegistrationStep.TrainingType);
          if (state.trainingVariationData) completed.push(PostRegistrationStep.TrainingVariation);
          if (state.exerciseConfidenceData) completed.push(PostRegistrationStep.ExerciseConfidence);
          if (state.insecuritiesData) completed.push(PostRegistrationStep.Insecurities);
          if (state.mentalityFocusData) completed.push(PostRegistrationStep.MentalityFocus);
          if (state.previousObstaclesData) completed.push(PostRegistrationStep.PreviousObstacles);
          if (state.innerCircleData) completed.push(PostRegistrationStep.InnerCircle);
          
          return completed;
        },
        
        isStepCompleted: (step) => {
          const state = get();
          switch (step) {
            case PostRegistrationStep.PaymentSuccess:
              return state.customerInfo !== null;
            case PostRegistrationStep.TrainingType:
              return state.trainingTypeData !== null;
            case PostRegistrationStep.TrainingVariation:
              return state.trainingVariationData !== null;
            case PostRegistrationStep.ExerciseConfidence:
              return state.exerciseConfidenceData !== null;
            case PostRegistrationStep.Insecurities:
              return state.insecuritiesData !== null;
            case PostRegistrationStep.MentalityFocus:
              return state.mentalityFocusData !== null;
            case PostRegistrationStep.PreviousObstacles:
              return state.previousObstaclesData !== null;
            case PostRegistrationStep.InnerCircle:
              return state.innerCircleData !== null;
            case PostRegistrationStep.Instructions:
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
        name: 'post-registration-storage',
        partialize: (state) => ({
          // Persist form data AND current step
          currentStep: state.currentStep,
          paymentFeedback: state.paymentFeedback,
          trainingTypeData: state.trainingTypeData,
          trainingVariationData: state.trainingVariationData,
          exerciseConfidenceData: state.exerciseConfidenceData,
          insecuritiesData: state.insecuritiesData,
          mentalityFocusData: state.mentalityFocusData,
          previousObstaclesData: state.previousObstaclesData,
          innerCircleData: state.innerCircleData,
          customerInfo: state.customerInfo,
        }),
      }
    )
  )
);