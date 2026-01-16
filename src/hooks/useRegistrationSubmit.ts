import { useState } from 'react';
import { registrationService } from '@/services/registration.service';
import { ApiError } from '@/services/api.service';

interface UseRegistrationSubmitProps {
  physicalData: any;
  goalsLifestyle: any;
  contactInfo: any;
  subscriptionPlan: string | null;
  isPromo?: boolean;
  setSessionData: (sessionId: string, paymentUrl: string) => void;
  onPaymentInitiated?: (paymentMethod: string, data?: Record<string, any>) => void;
  onRegistrationCompleted?: (data: Record<string, any>) => void;
}

export const useRegistrationSubmit = ({
  physicalData,
  goalsLifestyle,
  contactInfo,
  subscriptionPlan,
  isPromo = false,
  setSessionData,
  onPaymentInitiated,
  onRegistrationCompleted,
}: UseRegistrationSubmitProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (contactInfoData?: any | 'monthly' | 'upfront', overrideGoalsLifestyle?: any) => {
    // If it's a payment method string, use the stored contact info
    const paymentMethod = typeof contactInfoData === 'string' ? contactInfoData : undefined;
    const finalContactInfo = typeof contactInfoData === 'object' ? contactInfoData : contactInfo;
    // Allow overriding goalsLifestyle to avoid race conditions
    const finalGoalsLifestyle = overrideGoalsLifestyle || goalsLifestyle;

    setIsLoading(true);

    try {
      // Validate all required data is present
      if (!physicalData || !finalGoalsLifestyle || !finalContactInfo || !subscriptionPlan) {
        const missing = [];
        if (!physicalData) missing.push('fysiske data');
        if (!finalGoalsLifestyle) missing.push('mål og livsstil');
        if (!finalContactInfo) missing.push('kontaktinfo');
        if (!subscriptionPlan) missing.push('abonnementsplan');

        alert(`Vennligst fyll ut følgende steg: ${missing.join(', ')}`);
        return;
      }

      // Determine the final subscription plan based on payment method
      let finalSubscriptionPlan: string = subscriptionPlan;
      if (paymentMethod === 'upfront') {
        // Convert to pay-at-once plan names
        if (subscriptionPlan === '12month') {
          finalSubscriptionPlan = '12month_pay_at_once';
        } else if (subscriptionPlan === '6month') {
          finalSubscriptionPlan = '6month_pay_at_once';
        }
        // 1month doesn't have pay-at-once option
      }

      // Set default motivation data for backward compatibility
      const defaultMotivationData = {
        motivation: '1-3' as const,
        fitnessGoal: finalGoalsLifestyle?.fitnessGoal || ('weightloss' as const),
        trainingFrequency: 'none' as const,
        previousObstacles: [] as string[],
      };

      // Build payload with the correct plan name
      console.log('🔍 [useRegistrationSubmit] Building payload with isPromo:', isPromo);

      const payload = registrationService.buildRegistrationPayload({
        motivationData: defaultMotivationData,
        physicalData,
        goalsLifestyle: finalGoalsLifestyle,
        contactInfo: finalContactInfo,
        subscriptionPlan: finalSubscriptionPlan as '1month' | '6month' | '12month' | '6month_pay_at_once' | '12month_pay_at_once',
        isPromo,
      });

      console.log('📦 [useRegistrationSubmit] Built payload.subscriptionInfo.isPromo:', payload.subscriptionInfo.isPromo);

      // Create checkout session
      const response = await registrationService.createCheckoutSession(payload);

      // Handle existing user case
      if (response.existingUser) {
        alert(response.message || 'Du har allerede betalt for dette programmet.');
        return;
      }

      if (response.url) {
        // Store session data
        if (response.sessionId) {
          setSessionData(response.sessionId, response.url);
        }

        // Track payment initiation
        if (onPaymentInitiated) {
          onPaymentInitiated(paymentMethod || 'monthly', {
            subscription_plan: finalSubscriptionPlan,
          });
        }

        // Track successful registration completion with rich data
        if (onRegistrationCompleted) {
          onRegistrationCompleted({
            subscription_plan: finalSubscriptionPlan,
            payment_method: paymentMethod || 'monthly',
            payment_method_readable: paymentMethod === 'upfront' ? 'Full Payment' : 'Monthly Subscription',
            user_profile: {
              age_range:
                physicalData ?
                  parseInt(physicalData.age) < 25 ? '18-24' :
                  parseInt(physicalData.age) < 35 ? '25-34' :
                  parseInt(physicalData.age) < 45 ? '35-44' : '45+'
                : null,
              fitness_goal: finalGoalsLifestyle?.fitnessGoal,
              training_frequency: 'none',
              country: finalContactInfo.country || 'NO',
            },
            steps_completed: 6,
            has_all_data: !!(physicalData && finalGoalsLifestyle && finalContactInfo),
          });
        }

        // Redirect to payment
        window.location.href = response.url;
      } else {
        alert('Kunne ikke opprette betalingsøkt. Vennligst prøv igjen.');
      }
    } catch (error) {
      console.error('Registration submission error:', error);

      if (error instanceof ApiError) {
        // Show more specific error message
        if (error.status === 400) {
          alert(`Ugyldig forespørsel: ${error.message}`);
        } else if (error.status === 500) {
          alert('Serverfeil. Vennligst prøv igjen senere.');
        } else {
          alert(`Feil: ${error.message}`);
        }
      } else if (error instanceof Error) {
        alert(`En feil oppstod: ${error.message}. Vennligst prøv igjen.`);
      } else {
        alert('En ukjent feil oppstod. Vennligst prøv igjen.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
  };
};