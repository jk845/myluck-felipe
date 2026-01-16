import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SUPABASE_API_URL } from "@/lib/supabase";
import { ENV_SUFFIX } from "@/lib/utils";
import { usePaymentPolling } from "@/hooks/usePaymentPolling";
import { PaymentProcessingLoader } from "@/components/ui/payment-processing-loader";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useOnce } from "@/hooks/useOnce";
import { ConfirmationPresenter } from "@/components/presenters/post-registration";
import {
    PostRegistrationStep,
    TrainingTypeData,
    TrainingVariationData,
    TrainingConfidenceData,
    InsecuritiesData,
} from "@/types/post-registration";
import { PAYMENT_STATUS } from "@/types/payment-status";
import { usePostRegistrationStore } from "@/store/post-registration.store";
import { analyticsService } from "@/services/analytics.service";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export const ConfirmationContainer: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    const orderId = searchParams.get("orderId");
    
    console.log('ConfirmationContainer: URL params:', { email, orderId });

    // Form state management using store
    const {
        currentStep: formStep,
        setCurrentStep: setFormStep,
        trainingTypeData,
        setTrainingTypeData,
        trainingVariationData,
        setTrainingVariationData,
        exerciseConfidenceData,
        setExerciseConfidenceData,
        insecuritiesData,
        setInsecuritiesData,
        mentalityFocusData,
        setMentalityFocusData,
        previousObstaclesData,
        setPreviousObstaclesData,
        innerCircleData,
        setInnerCircleData,
        customerInfo: storedCustomerInfo,
        setCustomerInfo,
        canNavigateToStep,
    } = usePostRegistrationStore();
    
    console.log('ConfirmationContainer: Current formStep:', formStep);
    const [isLoading, setIsLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [showPaymentLoader, setShowPaymentLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Don't create default customer info until we have valid data
    const [customerInfo, setLocalCustomerInfo] = useState(storedCustomerInfo || null);
    
    // Sync local state with store
    useEffect(() => {
        if (!storedCustomerInfo && customerInfo) {
            setCustomerInfo(customerInfo);
        }
    }, [storedCustomerInfo, customerInfo, setCustomerInfo]);

    // Check payment status function
    const checkPaymentStatus = useCallback(async () => {
        if (!email || !orderId) {
            return null;
        }

        const response = await fetch(
            `${SUPABASE_API_URL}/functions/v1/get-user-credentials${ENV_SUFFIX}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    orderId,
                }),
            }
        );

        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to check payment status');
    }, [email, orderId]);

    // Payment polling hook
    const { attempt, startPolling } = usePaymentPolling(
        checkPaymentStatus,
        {
            onSuccess: (data) => {
                console.log('Payment/registration success, stopping polling');
                const userData = data.userData;

                // Reset post-registration flow for returning users
                // This ensures cancelled users who return start fresh
                if (formStep !== PostRegistrationStep.PaymentSuccess) {
                    console.log('Resetting post-registration flow for returning user');
                    usePostRegistrationStore.getState().resetPostRegistration();
                    setFormStep(PostRegistrationStep.PaymentSuccess);
                }

                // Update customer info
                const plan = userData.subscriptionPlan || "12month";
                const updatedInfo = {
                    orderId: userData.paymentId ? `#${userData.paymentId}` : orderId ? `#${orderId.substring(0, 8)}` : '',
                    email: email || "",
                    password: userData.password || "",
                    subscriptionPlan: plan,
                    price: userData.subscriptionPrice || "490",
                    renewalDate: calculateRenewalDate(plan),
                    nextPaymentDate: calculateNextPaymentDate(plan),
                    nextCycleDate: calculateNextCycleDate(plan),
                    subscriptionType: "premium",
                };
                setLocalCustomerInfo(updatedInfo);

                // Save to store
                setCustomerInfo(updatedInfo);

                setPaymentStatus(PAYMENT_STATUS.PAID);
                setShowPaymentLoader(false);
                setIsLoading(false);
            },
            onFailure: (data) => {
                const userData = data.userData;
                if (userData?.paymentStatus === 'timeout') {
                    // Timeout - let user refresh manually
                    alert('Betalingsbekreftelse tok for lang tid. Vennligst oppdater siden.');
                    setShowPaymentLoader(false);
                    setIsLoading(false);
                } else {
                    // Payment failed
                    navigate(`/payment-failed`);
                }
            },
            onPending: () => {
                // Still processing
                setShowPaymentLoader(true);
            },
            maxAttempts: 120, // About 5-6 minutes total with our delay strategy
        }
    );

    // Start payment check on mount - ONLY ONCE
    useOnce(() => {
        if (!email || !orderId) {
            setError('Ugyldig lenke. Email og ordre-ID kreves.');
            setIsLoading(false);
            return;
        }

        // Track that user reached confirmation page (payment success)
        analyticsService.trackPaymentSuccess({
            email,
            orderId,
            subscription_plan: customerInfo?.subscriptionPlan || '12month',
        });

        // Initial check
        checkPaymentStatus().then(data => {
            if (data?.userData) {
                const userData = data.userData;
                
                // Update customer info
                const plan = userData.subscriptionPlan || "12month";
                const updatedInfo = {
                    orderId: userData.paymentId ? `#${userData.paymentId}` : orderId ? `#${orderId.substring(0, 8)}` : '',
                    email: email || "",
                    password: userData.password || "",
                    subscriptionPlan: plan,
                    price: userData.subscriptionPrice || "490",
                    renewalDate: calculateRenewalDate(plan),
                    nextPaymentDate: calculateNextPaymentDate(plan),
                    nextCycleDate: calculateNextCycleDate(plan),
                    subscriptionType: "premium",
                };
                setLocalCustomerInfo(updatedInfo);
                
                // Save to store
                setLocalCustomerInfo(updatedInfo);

                const status = userData.paymentStatus;
                setPaymentStatus(status);

                // Check for explicit payment failure first
                if (
                    status === PAYMENT_STATUS.FAILED ||
                    status === PAYMENT_STATUS.EXPIRED ||
                    status === PAYMENT_STATUS.CANCELED
                ) {
                    // Failed - redirect to error page
                    navigate(`/payment-failed`);
                    return;
                }

                // Consider successful if:
                // 1. Payment is confirmed as paid, OR
                // 2. User has password AND payment is open/pending (normal registration flow)
                const isSuccessfulRegistration =
                    status === PAYMENT_STATUS.PAID ||
                    (userData.password && (status === PAYMENT_STATUS.OPEN || status === PAYMENT_STATUS.PENDING));

                if (isSuccessfulRegistration) {
                    // Already paid/registered - ensure we're on the correct step
                    if (formStep !== PostRegistrationStep.PaymentSuccess) {
                        console.log('User already registered but on wrong step, resetting to PaymentSuccess');
                        usePostRegistrationStore.getState().resetPostRegistration();
                        setFormStep(PostRegistrationStep.PaymentSuccess);
                        // Re-save customer info after reset
                        setCustomerInfo(updatedInfo);
                    }

                    // Track post-registration started
                    analyticsService.trackPostRegistrationStarted({
                        email,
                        orderId,
                        subscription_plan: updatedInfo.subscriptionPlan,
                    });

                    setIsLoading(false);
                } else {
                    // Payment is still open/pending and no password yet - start polling
                    console.log('Starting polling for pending payment (no password yet)');
                    setShowPaymentLoader(true);
                    startPolling();
                }
            } else {
                // No data - show error
                setError('Kunne ikke hente betalingsinformasjon. Vennligst prøv igjen senere.');
                setIsLoading(false);
            }
        }).catch(error => {
            console.error('Initial payment check failed:', error);
            if (error.message.includes('404') || error.message.includes('not found')) {
                setError('Ordre ikke funnet. Vennligst sjekk at lenken er riktig.');
            } else {
                setError('En feil oppstod ved henting av betalingsinformasjon. Vennligst prøv igjen senere.');
            }
            setIsLoading(false);
        });
    });

    // Calculate actual step number for progress indicator (excluding PaymentSuccess)
    const getProgressStep = useCallback(() => {
        // Map each step to its display number (1-8, excluding PaymentSuccess)
        switch (formStep) {
            case PostRegistrationStep.PaymentSuccess:
                return 0; // Not shown in progress
            case PostRegistrationStep.TrainingType:
                return 1;
            case PostRegistrationStep.TrainingVariation:
                return 2;
            case PostRegistrationStep.ExerciseConfidence:
                return 3;
            case PostRegistrationStep.Insecurities:
                return 4;
            case PostRegistrationStep.MentalityFocus:
                return 5;
            case PostRegistrationStep.PreviousObstacles:
                return 6;
            case PostRegistrationStep.InnerCircle:
                return 7;
            case PostRegistrationStep.Instructions:
                return 8;
            default:
                console.warn('[ConfirmationContainer] Unknown form step:', formStep);
                return 0;
        }
    }, [formStep]);

    // Scroll to top when step changes and track analytics
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Track post-registration step view
        if (formStep !== PostRegistrationStep.PaymentSuccess) {
            analyticsService.trackPostRegistrationStep(formStep.toString(), {
                step_number: getProgressStep(),
                email,
            });
        }
    }, [formStep, email, getProgressStep]);

    // Handle browser back button with proper history management
    useEffect(() => {
        // Push initial state when component mounts
        if (!window.history.state?.step) {
            window.history.replaceState({ step: formStep, email, orderId }, '', window.location.href);
        }
    }, [formStep, email, orderId]);

    useEffect(() => {
        // Push new state when step changes (but not from popstate)
        if (!window.history.state?.fromPopState && formStep !== PostRegistrationStep.PaymentSuccess) {
            window.history.pushState({ step: formStep, email, orderId }, '', window.location.href);
        }
    }, [formStep, email, orderId]);

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            console.log('Browser back button pressed, event state:', event.state);
            console.log('Current formStep:', formStep);
            
            if (event.state?.step) {
                const targetStep = event.state.step;
                
                // Check if we can navigate to this step
                if (canNavigateToStep(targetStep)) {
                    // Mark that this change is from popstate to avoid pushing new history
                    window.history.replaceState({ step: targetStep, email, orderId, fromPopState: true }, '', window.location.href);
                    setFormStep(targetStep);
                    
                    // Clean up the flag after a tick
                    setTimeout(() => {
                        window.history.replaceState({ step: targetStep, email, orderId }, '', window.location.href);
                    }, 0);
                } else {
                    // Can't go to this step, push current state back
                    console.log('Cannot navigate back to step:', targetStep);
                    window.history.pushState({ step: formStep, email, orderId }, '', window.location.href);
                }
            } else {
                // No state, likely trying to go back beyond our app
                // Check if we're on PaymentSuccess, if so, don't allow going back
                if (formStep === PostRegistrationStep.PaymentSuccess) {
                    window.history.pushState({ step: formStep, email, orderId }, '', window.location.href);
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [formStep, email, orderId, canNavigateToStep, setFormStep]);

    // Handle step navigation
    const handleNextStep = () => {
        const stepOrder = [
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
        
        const currentIndex = stepOrder.indexOf(formStep);
        console.log('handleNextStep - currentStep:', formStep, 'currentIndex:', currentIndex);
        
        if (currentIndex < stepOrder.length - 1) {
            const nextStep = stepOrder[currentIndex + 1];
            console.log('Next step would be:', nextStep);
            console.log('Can navigate to next step?', canNavigateToStep(nextStep));
            
            if (canNavigateToStep(nextStep)) {
                console.log('Setting form step to:', nextStep);
                setFormStep(nextStep);
            } else {
                console.log('Cannot navigate to next step - navigation blocked');
            }
        } else {
            console.log('Already at last step');
        }
    };

    const handlePreviousStep = () => {
        const stepOrder = [
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
        
        const currentIndex = stepOrder.indexOf(formStep);
        if (currentIndex > 0) {
            setFormStep(stepOrder[currentIndex - 1]);
        }
    };
    // redeploy

    const handleSaveTrainingData = useCallback(async () => {
        // Данные уже отправлены на шаге InnerCircle, просто переходим на thank-you
        console.log('Navigating to thank-you page - data already saved');

        // Track instructions step completion
        analyticsService.trackPostRegistrationStepCompleted('instructions', {
            completed: true,
        });

        await sleep(500);
        navigate(`/thank-you?email=${encodeURIComponent(email || "")}&orderId=${encodeURIComponent(orderId || "")}`);
    }, [email, orderId, navigate]);
    
    const totalSteps = 8; // Total steps excluding PaymentSuccess
    
    // Add validation logging in development
    if (process.env.NODE_ENV === 'development') {
        const progressStep = getProgressStep();
        if (progressStep > totalSteps) {
            console.error('[ConfirmationContainer] Progress step exceeds total steps:', {
                formStep,
                progressStep,
                totalSteps
            });
        }
    }
    const currentProgressStep = getProgressStep();
    const showHeader = formStep !== PostRegistrationStep.PaymentSuccess && formStep !== PostRegistrationStep.Instructions;
    const showProgressIndicator = formStep !== PostRegistrationStep.PaymentSuccess && formStep !== PostRegistrationStep.Instructions;
    const showPendingPayment = paymentStatus === PAYMENT_STATUS.OPEN || paymentStatus === PAYMENT_STATUS.PENDING;

    // Show error page if there's an error
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full text-center">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="mb-6">
                            <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Noe gikk galt</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors"
                        >
                            Tilbake til forsiden
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {showPaymentLoader && (
                <PaymentProcessingLoader
                    attempt={attempt}
                    maxAttempts={120}
                />
            )}
            {isSubmitting && (
                <LoadingSpinner
                    fullScreen
                    text="Lagrer dine svar..."
                    size="large"
                />
            )}
            <ConfirmationPresenter
                isLoading={isLoading && !showPaymentLoader}
                showPendingPayment={showPendingPayment && !showPaymentLoader}
                customerInfo={customerInfo || {
                    orderId: '',
                    email: '',
                    password: '',
                    subscriptionPlan: '12month',
                    price: '490',
                    renewalDate: '',
                    nextPaymentDate: '',
                    nextCycleDate: '',
                    subscriptionType: 'premium'
                }}
                formStep={formStep}
                totalSteps={totalSteps}
                currentProgressStep={currentProgressStep}
                showHeader={showHeader}
                showProgressIndicator={showProgressIndicator}
                trainingTypeData={trainingTypeData}
                trainingVariationData={trainingVariationData}
                exerciseConfidenceData={exerciseConfidenceData}
                insecuritiesData={insecuritiesData}
                mentalityFocusData={mentalityFocusData}
                previousObstaclesData={previousObstaclesData}
                innerCircleData={innerCircleData}
                onTrainingTypeNext={(data: TrainingTypeData) => {
                    setTrainingTypeData(data);
                    analyticsService.trackPostRegistrationStepCompleted('training-type', data);
                    handleNextStep();
                }}
                onTrainingVariationNext={(data: TrainingVariationData) => {
                    setTrainingVariationData(data);
                    analyticsService.trackPostRegistrationStepCompleted('training-variation', data);
                    handleNextStep();
                }}
                onExerciseConfidenceNext={(data: TrainingConfidenceData) => {
                    setExerciseConfidenceData(data);
                    analyticsService.trackPostRegistrationStepCompleted('exercise-confidence', data);
                    handleNextStep();
                }}
                onInsecuritiesNext={(data: InsecuritiesData) => {
                    setInsecuritiesData(data);
                    analyticsService.trackPostRegistrationStepCompleted('insecurities', data);
                    handleNextStep();
                }}
                onMentalityFocusNext={(data: { mentalityFocus: string }) => {
                    setMentalityFocusData(data);
                    analyticsService.trackPostRegistrationStepCompleted('mentality-focus', data);
                    handleNextStep();
                }}
                onPreviousObstaclesNext={(data: { previousObstacles: string }) => {
                    setPreviousObstaclesData(data);
                    analyticsService.trackPostRegistrationStepCompleted('previous-obstacles', data);
                    handleNextStep();
                }}
                onInnerCircleNext={async (data: { interestedInInnerCircle: string }) => {
                    setInnerCircleData(data);
                    
                    // Отправляем все данные на последнем вопросе
                    if (!email || !orderId || !trainingTypeData || !trainingVariationData) {
                        console.error('Missing required data for submission');
                        handleNextStep();
                        return;
                    }

                    setIsSubmitting(true);
                    
                    try {
                        // Map frontend values to API contract values
                        const mapTrainingTypes = (types: string[]): string[] => {
                            const typeMapping: Record<string, string> = {
                                'gym': 'strength',
                                'home': 'strength',
                                'yoga_stretching': 'mobility',
                                'walk_run_flat': 'cardio',
                                'walk_run_forest': 'cardio',
                                'other': 'mental'
                            };
                            
                            // Convert and deduplicate
                            const mappedTypes = types.map(t => typeMapping[t] || 'strength');
                            return [...new Set(mappedTypes)];
                        };

                        const mapTrainingLocation = (): string => {
                            // Determine training location from selected training types
                            const hasGym = trainingTypeData.trainingType.includes('gym');
                            const hasHome = trainingTypeData.trainingType.includes('home');
                            
                            if (hasGym && hasHome) return 'home_and_gym';
                            if (hasGym) return 'gym';
                            return 'home'; // Default to home for outdoor/other activities
                        };

                        const mapTrainingVariation = (): string => {
                            // Map variation preference from user selection
                            // "variation" = Mye variasjon (lots of variation)
                            // "mastery" = Fokus på mestring (focus on mastery)
                            return trainingVariationData?.variationPreference || 'variation';
                        };

                        const mapInsecurities = (insecurities: string[]): string[] => {
                            const insecurityMapping: Record<string, string> = {
                                'stomach': 'belly',
                                'arms': 'arms',
                                'thighs': 'legs',
                                'back': 'overall',
                                'neck': 'overall',
                                'calves': 'legs',
                                'butt': 'legs',
                                'endurance': 'energy',
                                'general_health': 'overall',
                                'all': 'overall'
                            };
                            
                            // Convert and deduplicate
                            const mappedInsecurities = insecurities.map(i => insecurityMapping[i] || 'overall');
                            return [...new Set(mappedInsecurities)];
                        };

                        const mapMentalityFocus = (focus: string): string => {
                            const focusMapping: Record<string, string> = {
                                'very_large': 'big_focus',
                                'somewhat': 'some_focus',
                                'not_much': 'little_focus',
                                'nothing': 'never_focused',
                                'not_thought': 'little_focus'
                            };
                            return focusMapping[focus] || 'little_focus';
                        };

                        // Exercise confidence already uses correct values, no mapping needed

                        const payload = {
                            email,
                            orderId,
                            postRegistrationData: {
                                trainingType: mapTrainingTypes(trainingTypeData.trainingType),
                                trainingLocation: mapTrainingLocation(), // Where they train (gym/home/both)
                                trainingVariation: mapTrainingVariation(), // How they like to train (variation/mastery)
                                exerciseConfidence: exerciseConfidenceData?.trainingConfidence || 'new',
                                insecurities: mapInsecurities(insecuritiesData?.insecurities || []),
                                mentalityFocus: mapMentalityFocus(mentalityFocusData?.mentalityFocus || 'not_thought'),
                                previousObstacles: previousObstaclesData?.previousObstacles || "",
                                interestedInInnerCircle: data.interestedInInnerCircle,
                            }
                        };

                        console.log('Sending post-registration data:', payload);
                        
                        await fetch(
                            `${SUPABASE_API_URL}/functions/v1/store-onboarding-data${ENV_SUFFIX}`,
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(payload),
                            }
                        );

                        console.log('Post-registration data saved successfully');

                        // Track inner circle step completion and full onboarding completion
                        analyticsService.trackPostRegistrationStepCompleted('inner-circle', data);
                        analyticsService.trackPostRegistrationCompleted({
                            email,
                            orderId,
                            all_data_submitted: true,
                        });
                    } catch (error) {
                        console.error("Error saving post-registration data:", error);
                        // Продолжаем даже если не удалось сохранить
                    } finally {
                        setIsSubmitting(false);
                    }
                    
                    handleNextStep();
                }}
                onGoBack={handlePreviousStep}
                onInstructionsFinish={handleSaveTrainingData}
                onPaymentSuccessNext={async (feedback?: string) => {
                    console.log('onPaymentSuccessNext called with feedback:', feedback);
                    console.log('Current email:', email);

                    // Track payment success step completion
                    analyticsService.trackPostRegistrationStepCompleted('payment-success', {
                        has_feedback: !!feedback,
                    });
                    
                    // Save feedback to store
                    if (feedback?.trim()) {
                        usePostRegistrationStore.getState().setPaymentFeedback(feedback);
                    }
                    
                    // Save feedback if provided
                    if (feedback?.trim() && email) {
                        console.log('Sending feedback:', { feedback, email });
                        setIsSubmitting(true);
                        
                        try {
                            const response = await fetch(
                                `${SUPABASE_API_URL}/functions/v1/store_customer_feedback${ENV_SUFFIX}`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        feedback,
                                        email,
                                    }),
                                }
                            );
                            console.log('Feedback response:', response.status, response.ok);
                            if (!response.ok) {
                                const errorText = await response.text();
                                console.error('Feedback error response:', errorText);
                            }
                        } catch (error) {
                            console.error("Error saving feedback:", error);
                        } finally {
                            setIsSubmitting(false);
                        }
                    } else {
                        console.log('No feedback to save or missing email:', { feedback, email });
                    }
                    
                    console.log('Calling handleNextStep...');
                    handleNextStep();
                }}
            />
        </>
    );
};

// Helper function to calculate renewal date
function calculateRenewalDate(plan: string): string {
    const today = new Date();
    
    // Handle both regular and pay-at-once plans
    if (plan === "1month") {
        today.setMonth(today.getMonth() + 1);
    } else if (plan === "6month" || plan === "6month_pay_at_once") {
        today.setMonth(today.getMonth() + 6);
    } else if (plan === "12month" || plan === "12month_pay_at_once") {
        today.setFullYear(today.getFullYear() + 1);
    }
    
    return today.toLocaleDateString("no-NO", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

// Helper function to calculate next payment date
function calculateNextPaymentDate(plan: string): string {
    const today = new Date();
    
    // For pay-at-once plans, there's no next payment
    if (plan.includes('pay_at_once')) {
        return ''; // No next payment for upfront plans
    }
    
    // For subscription plans, next payment depends on the plan
    if (plan === "1month") {
        today.setMonth(today.getMonth() + 1);
    } else if (plan === "6month") {
        // For 6-month plan with monthly payments, next payment is next month
        today.setMonth(today.getMonth() + 1);
    } else if (plan === "12month") {
        // For 12-month plan with monthly payments, next payment is next month
        today.setMonth(today.getMonth() + 1);
    }
    
    return today.toLocaleDateString("no-NO", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

// Helper function to calculate next cycle date
function calculateNextCycleDate(plan: string): string {
    const today = new Date();
    
    // Handle both regular and pay-at-once plans
    if (plan === "1month") {
        today.setMonth(today.getMonth() + 1);
    } else if (plan === "6month" || plan === "6month_pay_at_once") {
        today.setMonth(today.getMonth() + 6);
    } else if (plan === "12month" || plan === "12month_pay_at_once") {
        today.setFullYear(today.getFullYear() + 1);
    }
    
    return today.toLocaleDateString("no-NO", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}