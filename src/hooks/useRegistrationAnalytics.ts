import { useEffect, useState } from 'react';
import { analyticsService } from '@/services/analytics.service';
import { RegistrationStep, getStepConfig } from '@/constants/registration-steps';

interface UseRegistrationAnalyticsProps {
  currentStep: RegistrationStep;
  subscriptionType: 'premium' | null;
  subscriptionPlan: string | null;
  physicalData: any;
  goalsLifestyle: any;
  contactInfo: any;
}

export const useRegistrationAnalytics = ({
  currentStep,
  subscriptionType,
  subscriptionPlan,
  physicalData,
  goalsLifestyle,
  contactInfo,
}: UseRegistrationAnalyticsProps) => {
  const [hasStartedRegistration, setHasStartedRegistration] = useState(false);

  // Track registration start
  useEffect(() => {
    if (currentStep === 'subscription-type' && !hasStartedRegistration) {
      analyticsService.trackRegistrationStarted({
        initial_step: 'subscription-type',
      });
      setHasStartedRegistration(true);
    }
  }, [currentStep, hasStartedRegistration]);

  // Track step views
  useEffect(() => {
    const stepConfig = getStepConfig(currentStep);
    const stepData: Record<string, any> = {
      subscription_type: subscriptionType,
      subscription_plan: subscriptionPlan,
      has_physical_data: !!physicalData,
      has_goals_data: !!goalsLifestyle,
      has_contact_info: !!contactInfo,
    };

    // Add specific data for current step
    if (currentStep === 'subscription-plan' && subscriptionPlan) {
      stepData.selected_plan = subscriptionPlan;
    }

    analyticsService.trackRegistrationStep(currentStep, stepConfig.number, stepData);
  }, [currentStep, subscriptionType, subscriptionPlan, physicalData, goalsLifestyle, contactInfo]);

  const trackStepCompleted = (step: RegistrationStep, formData: Record<string, any>) => {
    const stepConfig = getStepConfig(step);
    analyticsService.trackRegistrationStepCompleted(step, stepConfig.number, formData);
  };

  const trackNavigationBack = (fromStep: RegistrationStep, toStep: RegistrationStep) => {
    analyticsService.trackNavigationBack(fromStep, toStep);
  };

  const trackPaymentInitiated = (paymentMethod: string, data?: Record<string, any>) => {
    analyticsService.trackPaymentInitiated(paymentMethod, data);
  };

  const trackRegistrationCompleted = (data: Record<string, any>) => {
    analyticsService.trackRegistrationCompleted(data);
  };

  const identifyUser = (email: string, traits?: Record<string, any>) => {
    analyticsService.identifyUser(email, traits);
  };

  const setUserProperties = (properties: Record<string, any>) => {
    analyticsService.setUserProperties(properties);
  };

  return {
    trackStepCompleted,
    trackNavigationBack,
    trackPaymentInitiated,
    trackRegistrationCompleted,
    identifyUser,
    setUserProperties,
  };
};