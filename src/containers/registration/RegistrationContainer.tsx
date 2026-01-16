import React, { useEffect } from 'react';
import { useRegistrationStore } from '@/store/registration.store';
import { preloadImages } from '@/utils/preloadImages';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  TOTAL_STEPS,
  getStepConfig,
  isValidStep,
  type RegistrationStep
} from '@/constants/registration-steps';
import { useRegistrationHistory } from '@/hooks/useRegistrationHistory';
import { useRegistrationAnalytics } from '@/hooks/useRegistrationAnalytics';
import { useRegistrationSubmit } from '@/hooks/useRegistrationSubmit';

// Import images for preloading
import SuccessPhoto from '@/assets/success_photo.jpg';
import Photo1 from '@/assets/girl_success_1.jpg';
import Photo2 from '@/assets/girl_success_2.jpg';
import Photo3 from '@/assets/girl_success_3.jpg';
import Photo4 from '@/assets/girl_success_4.jpg';
import Photo5 from '@/assets/girl_success_5.jpg';

// Import layout components
import PageContainer from '@/components/ui/page-container';
import PageHeader from '@/components/ui/page-header';
import ProgressIndicator from '@/components/ui/progress-indicator';

// Import step components
import SubscriptionTypeStep from '@/pages/registration/SubscriptionTypeStep';
import SubscriptionPlanStep from '@/pages/registration/SubscriptionPlanStep';
import PhysicalDataStep from '@/pages/registration/PhysicalDataStepHorizontal';
import GoalsLifestyleStep from '@/pages/registration/GoalsLifestyleStep';
import ContactInfoStep from '@/pages/registration/ContactInfoStep';
import OrderConfirmationStep from '@/pages/registration/OrderConfirmationStep';

export const RegistrationContainer: React.FC = () => {
  const {
    currentStep,
    setCurrentStep,
    isSimplifiedMode,
    // Data
    subscriptionType,
    subscriptionPlan,
    isPromo,
    physicalData,
    goalsLifestyle,
    contactInfo,
    // Actions
    setSubscriptionType,
    setSubscriptionPlan,
    setIsPromo,
    setPhysicalData,
    setGoalsLifestyle,
    setContactInfo,
    setSessionData,
    setSimplifiedMode,
    resetRegistration,
    // Computed
    canNavigateToStep,
  } = useRegistrationStore();

  // Use type-safe currentStep
  const typedCurrentStep = currentStep as RegistrationStep;

  // Check if we're in simplified mode from checkout
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const simplified = urlParams.get('simplified') === 'true';
    const promoFromUrl = urlParams.get('promo') === 'true';

    console.log('[RegistrationContainer] URL params check:', { simplified, promoFromUrl, isSimplifiedMode, isPromo });

    if (simplified) {
      // Enable simplified mode if not already enabled
      if (!isSimplifiedMode) {
        setSimplifiedMode(true);
      }

      // In simplified mode, we start directly from physical-data
      // Set subscription type as default premium
      if (!subscriptionType) {
        setSubscriptionType('premium');
      }
      // If subscription plan wasn't set (shouldn't happen from checkout), set default
      if (!subscriptionPlan) {
        setSubscriptionPlan('12month');
      }
      // Start from physical-data step
      if (currentStep === 'subscription-type' || currentStep === 'subscription-plan') {
        setCurrentStep('physical-data');
      }

      // Enable promo pricing if URL parameter is present
      if (promoFromUrl && !isPromo) {
        console.log('[RegistrationContainer] Enabling promo from URL');
        setIsPromo(true);
      }
    } else if (!simplified && !promoFromUrl && isPromo) {
      // ONLY reset isPromo if:
      // 1. NOT simplified mode
      // 2. NO promo URL parameter
      // 3. isPromo is currently true
      // This prevents unintended promo pricing in normal flow
      console.log('[RegistrationContainer] Resetting promo (not in promo flow)');
      setIsPromo(false);
    }
  }, [isSimplifiedMode, setSimplifiedMode, subscriptionType, setSubscriptionType, subscriptionPlan, setSubscriptionPlan, currentStep, setCurrentStep, isPromo, setIsPromo]);

  // Validate and fix invalid currentStep from old localStorage data
  useEffect(() => {
    if (!isValidStep(currentStep)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[RegistrationContainer] Invalid step detected:', currentStep, 'Resetting to subscription-type');
      }
      setCurrentStep(isSimplifiedMode ? 'physical-data' : 'subscription-type');
    }
  }, [currentStep, setCurrentStep, isSimplifiedMode]);

  // Use custom hooks
  useRegistrationHistory({
    currentStep: typedCurrentStep,
    setCurrentStep: setCurrentStep as (step: RegistrationStep) => void,
    canNavigateToStep: canNavigateToStep as (step: RegistrationStep) => boolean,
  });

  const analytics = useRegistrationAnalytics({
    currentStep: typedCurrentStep,
    subscriptionType,
    subscriptionPlan,
    physicalData,
    goalsLifestyle,
    contactInfo,
  });

  const { handleSubmit, isLoading } = useRegistrationSubmit({
    physicalData,
    goalsLifestyle,
    contactInfo,
    subscriptionPlan,
    isPromo,
    setSessionData,
    onPaymentInitiated: analytics.trackPaymentInitiated,
    onRegistrationCompleted: analytics.trackRegistrationCompleted,
  });

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep]);

  // Preload images for next step
  useEffect(() => {
    const preloadNextStepImages = async () => {
      switch (currentStep) {
        case 'subscription-type':
          // Preload success photo for this step
          await preloadImages([SuccessPhoto]).catch(console.error);
          break;
        case 'contact-info':
          // Preload images for order confirmation (next step)
          await preloadImages([Photo1, Photo2, Photo3, Photo4, Photo5]).catch(console.error);
          break;
      }
    };

    preloadNextStepImages();
  }, [currentStep]);

  // Set default subscription plan if not set
  useEffect(() => {
    if (currentStep === 'subscription-plan' && !subscriptionPlan) {
      setSubscriptionPlan('12month');
    }
  }, [currentStep, subscriptionPlan, setSubscriptionPlan]);

  const renderStep = () => {
    // In simplified mode, skip subscription-type and subscription-plan steps
    if (isSimplifiedMode) {
      if (typedCurrentStep === 'subscription-type' || typedCurrentStep === 'subscription-plan') {
        // Redirect to physical-data if somehow ended up here
        setCurrentStep('physical-data');
        return null;
      }
    }

    switch (typedCurrentStep) {
      case 'subscription-type':
        return (
          <SubscriptionTypeStep
            onNext={() => {
              setSubscriptionType('premium');
              analytics.trackStepCompleted('subscription-type', {
                subscription_type: 'premium',
                selection: 'Premium Subscription'
              });
              setCurrentStep('subscription-plan' as RegistrationStep);
            }}
            selectedSubscription={subscriptionType || 'premium'}
            setSelectedSubscription={(value: string) => setSubscriptionType(value as 'premium')}
            isLeadMagnet={false}
            textForRating="2000+ jenter har kommet i deres beste form med oss!"
          />
        );

      case 'subscription-plan':
        return (
          <SubscriptionPlanStep
            selectedPlan={subscriptionPlan || '12month'}
            setSelectedPlan={(value: string) => setSubscriptionPlan(value as '1month' | '6month' | '12month')}
            onNext={() => {
              // Ensure subscription plan is set even if user doesn't change the default
              const finalPlan = subscriptionPlan || '12month';
              if (!subscriptionPlan) {
                setSubscriptionPlan('12month');
              }
              const planNames: Record<string, string> = {
                '1month': 'Monthly Plan',
                '6month': '6-Month Plan',
                '12month': 'Annual Plan',
                '6month_pay_at_once': '6-Month Plan (Prepaid)',
                '12month_pay_at_once': 'Annual Plan (Prepaid)'
              };

              analytics.trackStepCompleted('subscription-plan', {
                subscription_plan: finalPlan,
                plan_readable: planNames[finalPlan] || finalPlan,
                is_prepaid: finalPlan.includes('pay_at_once')
              });
              setCurrentStep('physical-data' as RegistrationStep);
            }}
            benefits={[
              'Personlig trenings- og kostholdsplan 💪',
              'Tilgang til nesten 300 oppskrifter 🥗',
              'Garanterte resultater 🎯',
              'Tilgang til alle Transformasjons Marathoner 🏃‍♀️',
              'Personlig veiledning og oppfølging 🤝',
              'Tilgang til Facebook-gruppe 👥',
              'Tilgang til app med egne videoer (trening og matlaging) 📱',
              'Tilbud på kosttilskudd 💊'
            ]}
          />
        );

      case 'physical-data':
        return (
          <PhysicalDataStep
            initialData={physicalData || undefined}
            onNext={(data: any) => {
              setPhysicalData(data);
              analytics.trackStepCompleted('physical-data', {
                ...data,
                age_range: parseInt(data.age) < 25 ? '18-24' :
                  parseInt(data.age) < 35 ? '25-34' :
                    parseInt(data.age) < 45 ? '35-44' : '45+',
                height_cm: parseInt(data.height),
                weight_kg: parseInt(data.weight)
              });
              setCurrentStep('contact-info' as RegistrationStep);
            }}
          />
        );

      case 'goals-lifestyle':
        // Skip this step in simplified mode
        if (isSimplifiedMode) {
          // Should not reach here in simplified mode
          return null;
        }
        return (
          <GoalsLifestyleStep
            initialData={goalsLifestyle || undefined}
            onNext={(data: any) => {
              setGoalsLifestyle(data);
              analytics.trackStepCompleted('goals-lifestyle', {
                ...data,
                fitness_goal_readable: data.fitnessGoal === 'weightloss' ? 'Weight Loss' : 'Muscle Gain',
                pregnancy_status_readable: data.pregnancyStatus === 'not_pregnant' ? 'Not Pregnant' :
                  data.pregnancyStatus === 'pregnant' ? 'Currently Pregnant' : 'Postpartum',
                is_breastfeeding: data.breastfeedingStatus === 'yes'
              });
              // Always show order confirmation page for conversion
              setCurrentStep('order-confirmation' as RegistrationStep);
            }}
          />
        );

      case 'contact-info':
        return (
          <ContactInfoStep
            initialData={contactInfo || undefined}
            subscriptionPlan={subscriptionPlan || undefined}
            onNext={(data: any) => {
              setContactInfo(data);
              analytics.trackStepCompleted('contact-info', {
                email: data.email,
                phone_country: data.country || 'NO',
                has_full_name: !!(data.firstName && data.lastName),
                name_length: (data.firstName + ' ' + data.lastName).length
              });

              // Identify user in PostHog
              analytics.identifyUser(data.email, {
                first_name: data.firstName,
                last_name: data.lastName,
                phone: data.phone,
                subscription_type: subscriptionType,
                subscription_plan: subscriptionPlan,
              });

              // Set additional user properties
              if (physicalData) {
                analytics.setUserProperties({
                  age: physicalData.age,
                  height: physicalData.height,
                  weight: physicalData.weight,
                });
              }

              // In simplified mode, submit directly after contact info
              if (isSimplifiedMode) {
                // Use pregnancy data from physical data if available, otherwise defaults
                const goalsData = {
                  fitnessGoal: 'weightloss' as const,
                  pregnancyStatus: physicalData?.pregnancyStatus || 'not_pregnant',
                  breastfeedingStatus: physicalData?.breastfeedingStatus || 'no'
                };
                // Save to store for analytics/tracking
                setGoalsLifestyle(goalsData);
                // Submit with both contactInfo and goalsData directly to avoid race condition
                handleSubmit(data, goalsData);
              } else {
                setCurrentStep('goals-lifestyle' as RegistrationStep);
              }
            }}
          />
        );

      case 'order-confirmation':
        // Skip this step in simplified mode (only 2 steps)
        if (isSimplifiedMode) {
          // Should not reach here in simplified mode
          return null;
        }
        return (
          <OrderConfirmationStep
            subscriptionInfo={{
              name: 'Premium-abonnement',
              price: subscriptionPlan === '12month' ? '490 kr' : subscriptionPlan === '6month' ? '590 kr' : '890 kr',
              subscription: subscriptionPlan || '12month'
            }}
            onSubmit={handleSubmit}
            isLoading={false}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {isLoading && (
        <LoadingSpinner
          fullScreen
          text="Behandler bestilling..."
          size="large"
        />
      )}
      <PageContainer>
        <PageHeader
          subtitle={getStepConfig(typedCurrentStep).subtitle}
          showBackButton={isSimplifiedMode ?
            currentStep !== 'physical-data' :
            currentStep !== 'subscription-type'}
          onBack={() => {
            if (isSimplifiedMode) {
              // In simplified mode, handle back navigation differently
              if (typedCurrentStep === 'contact-info') {
                setCurrentStep('physical-data');
              } else if (typedCurrentStep === 'physical-data') {
                // Go back to checkout
                window.history.back();
              }
            } else {
              const previousStep = getStepConfig(typedCurrentStep).previousStep;
              if (previousStep && canNavigateToStep(previousStep)) {
                analytics.trackNavigationBack(typedCurrentStep, previousStep);
                setCurrentStep(previousStep);
              }
            }
          }}
        />
        <ProgressIndicator
          key={currentStep}
          currentStep={isSimplifiedMode ?
            (typedCurrentStep === 'physical-data' ? 1 :
              typedCurrentStep === 'contact-info' ? 2 : 1)
            : getStepConfig(typedCurrentStep).number}
          totalSteps={isSimplifiedMode ? 2 : TOTAL_STEPS}
        />
        {renderStep()}

        {/* Temporary reset button for debugging - remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => {
                if (confirm('Reset all registration data?')) {
                  resetRegistration();
                  window.location.reload();
                }
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors text-sm"
            >
              Reset Form Data
            </button>
          </div>
        )}
      </PageContainer>
    </>
  );
};