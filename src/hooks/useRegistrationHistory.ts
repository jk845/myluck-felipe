import { useEffect } from 'react';
import { RegistrationStep } from '@/constants/registration-steps';

interface UseRegistrationHistoryProps {
  currentStep: RegistrationStep;
  setCurrentStep: (step: RegistrationStep) => void;
  canNavigateToStep: (step: RegistrationStep) => boolean;
}

export const useRegistrationHistory = ({
  currentStep,
  setCurrentStep,
  canNavigateToStep,
}: UseRegistrationHistoryProps) => {
  // Push initial state when component mounts
  useEffect(() => {
    if (!window.history.state?.step) {
      window.history.replaceState({ step: currentStep }, '', window.location.href);
    }
  }, [currentStep]);

  // Push new state when step changes (but not from popstate)
  useEffect(() => {
    if (!window.history.state?.fromPopState) {
      window.history.pushState({ step: currentStep }, '', window.location.href);
    }
  }, [currentStep]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.step) {
        const targetStep = event.state.step;
        if (canNavigateToStep(targetStep)) {
          // Mark that this change is from popstate to avoid pushing new history
          window.history.replaceState({ step: targetStep, fromPopState: true }, '', window.location.href);
          setCurrentStep(targetStep);
          // Clean up the flag after a tick
          setTimeout(() => {
            window.history.replaceState({ step: targetStep }, '', window.location.href);
          }, 0);
        } else {
          // If can't navigate to that step, restore current step in history
          window.history.pushState({ step: currentStep }, '', window.location.href);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentStep, setCurrentStep, canNavigateToStep]);
};