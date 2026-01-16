import { apiService } from './api.service';
import { RegistrationPayload } from '@/types/registration';
import { RegistrationApiPayload } from '@/types/registration-api.types';
import { ENV_SUFFIX, getFullPhoneNumber } from '@/lib/utils';
import { validateRegistrationPayload } from '@/utils/registration-validation';

export interface CheckoutSessionResponse {
  url: string;
  sessionId?: string;
  existingUser?: boolean;
  message?: string;
  paymentId?: string;
}

export interface UserCredentialsResponse {
  success: boolean;
  userData?: {
    email: string;
    password: string;
    subscriptionPlan: string;
    subscriptionPrice: string;
    paymentId: string;
  };
}

export interface OnboardingData {
  goals: string[];
  personalInfo: {
    height: string;
    weight: string;
    age: string;
    activityLevel: string;
  };
  physicalData: {
    weight: string;
    height: string;
    bodyType: string;
    problemAreas: string[];
  };
  trainingInfo: {
    frequency: string;
    type: string;
    variations: string[];
  };
}

class RegistrationService {
  async createCheckoutSession(payload: RegistrationPayload): Promise<CheckoutSessionResponse> {
    // Convert to clean API payload
    const apiPayload = this.convertToApiPayload(payload);

    // Log the payload for debugging
    console.log('🔍 [Registration Service] Creating checkout session');
    console.log('📦 [Registration Service] Payload:', {
      subscriptionPlan: payload.subscriptionInfo.selectedPlan,
      isPromo: payload.subscriptionInfo.isPromo,
      apiPayload
    });
    console.log('📤 [Registration Service] API subscription:', apiPayload.subscription);
    
    // Validate the payload before sending
    validateRegistrationPayload(apiPayload);

    const response = await apiService.post<{
      checkout_url?: string;
      url?: string;
      payment_url?: string;
      payment_id?: string;
      sessionId?: string;
      existing_user?: boolean;
      success?: boolean;
      message?: string;
    }>(
      `/functions/v1/create_customer_for_subscriptions${ENV_SUFFIX}`,
      apiPayload
    );

    // Handle existing user case
    if (response.existing_user && response.success) {
      // For existing users, we might want to redirect to a different page
      // or show a message that they already have access
      return {
        url: '/already-registered', // Or handle this case differently
        sessionId: undefined,
        existingUser: true,
        message: response.message
      };
    }

    return {
      url: response.checkout_url || response.url || response.payment_url || '',
      sessionId: response.payment_id || response.sessionId,
      existingUser: false,
      paymentId: response.payment_id
    };
  }

  async getUserCredentials(email: string, orderId?: string): Promise<UserCredentialsResponse> {
    return apiService.post<UserCredentialsResponse>(
      `/functions/v1/get-user-credentials${ENV_SUFFIX}`,
      { email, orderId }
    );
  }

  async checkPaymentStatus(sessionId: string): Promise<{ isPaid: boolean }> {
    return apiService.post<{ isPaid: boolean }>(
      `/functions/v1/check-payment-status${ENV_SUFFIX}`,
      { checkoutSessionId: sessionId }
    );
  }

  async storeOnboardingData(data: OnboardingData): Promise<{ success: boolean }> {
    return apiService.post<{ success: boolean }>(
      `/functions/v1/store-onboarding-data${ENV_SUFFIX}`,
      data
    );
  }

  async cancelSubscription(email: string, reason?: string): Promise<{ success: boolean }> {
    return apiService.post<{ success: boolean }>(
      `/functions/v1/cancel-subscription${ENV_SUFFIX}`,
      { email, reason }
    );
  }

  // Helper method to build registration payload
  buildRegistrationPayload(data: {
    motivationData: RegistrationPayload['motivationData'];
    physicalData: RegistrationPayload['physicalData'];
    goalsLifestyle: RegistrationPayload['goalsLifestyle'];
    contactInfo: RegistrationPayload['contactInfo'];
    subscriptionPlan: '1month' | '6month' | '12month' | '6month_pay_at_once' | '12month_pay_at_once';
    isPromo?: boolean;
  }): RegistrationPayload {
    const { motivationData, physicalData, goalsLifestyle, contactInfo, subscriptionPlan, isPromo } = data;

    const subscriptionInfo = this.getSubscriptionInfo(subscriptionPlan);
    const isLeadMagnet = new URLSearchParams(window.location.search).get('mode') === 'secret';

    return {
      contactInfo,
      physicalData,
      goalsLifestyle,
      motivationData,
      subscriptionInfo: {
        ...subscriptionInfo,
        ...(isPromo && { isPromo: true })
      },
      metadata: { isLeadMagnet }
    };
  }

  private getPricePerDay(plan: string): string {
    const pricesPerDay: Record<string, string> = {
      '1month': '29,66 kr per dag',
      '6month': '19,66 kr per dag',
      '12month': '16,33 kr per dag',
      '6month_pay_at_once': '19,66 kr per dag',
      '12month_pay_at_once': '16,33 kr per dag'
    };
    return pricesPerDay[plan] || '16,33 kr per dag';
  }

  private getSubscriptionInfo(plan: string) {
    const plans: Record<string, any> = {
      '1month': {
        name: 'Månedlig',
        price: '890 kr',
        subscription: 'Premium 1-måned'
      },
      '6month': {
        name: '6 Måneders',
        price: '590 kr',
        subscription: 'Premium 6-måneders'
      },
      '12month': {
        name: 'Årlig',
        price: '490 kr',
        subscription: 'Premium 12-måneders'
      },
      '6month_pay_at_once': {
        name: '6 Måneders - Forhåndsbetalt',
        price: '3540 kr',
        subscription: 'Premium 6-måneders (betalt på forhånd)'
      },
      '12month_pay_at_once': {
        name: 'Årlig - Forhåndsbetalt',
        price: '5880 kr',
        subscription: 'Premium 12-måneders (betalt på forhånd)'
      }
    };

    return {
      ...plans[plan],
      selectedPlan: plan
    };
  }

  /**
   * Converts the internal registration payload to a clean API payload
   * This ensures all data is sent to the backend in a consistent format
   */
  private convertToApiPayload(payload: RegistrationPayload): RegistrationApiPayload {
    const fullPhoneNumber = getFullPhoneNumber(payload.contactInfo.phone, payload.contactInfo.country);
    
    return {
      personalInfo: {
        firstName: payload.contactInfo.firstName,
        lastName: payload.contactInfo.lastName,
        email: payload.contactInfo.email,
        phone: fullPhoneNumber,
        country: payload.contactInfo.country || 'NO',
        ...(payload.contactInfo.instagram && { instagram: payload.contactInfo.instagram }),
      },
      physicalData: {
        age: parseInt(payload.physicalData.age, 10),
        height: parseInt(payload.physicalData.height, 10),
        weight: parseInt(payload.physicalData.weight, 10),
      },
      motivationData: {
        motivationLevel: payload.motivationData.motivation,
        fitnessGoal: payload.goalsLifestyle.fitnessGoal === 'weightloss' ? 'weight_loss' : 'muscle_gain',
        trainingFrequency: payload.motivationData.trainingFrequency || 'none',
        previousObstacles: payload.motivationData.previousObstacles || [],
      },
      lifestyleData: {
        pregnancyStatus: payload.goalsLifestyle.pregnancyStatus,
        breastfeedingStatus: payload.goalsLifestyle.breastfeedingStatus,
      },
      subscription: {
        type: 'premium',
        plan: payload.subscriptionInfo.selectedPlan,
        price: payload.subscriptionInfo.price,
        pricePerDay: this.getPricePerDay(payload.subscriptionInfo.selectedPlan),
        ...(payload.subscriptionInfo.isPromo && { isPromo: true }),
      },
      metadata: {
        isLeadMagnet: payload.metadata.isLeadMagnet,
        registrationDate: new Date().toISOString(),
        // Add UTM parameters and referrer tracking here if needed
      },
    };
  }
}

export const registrationService = new RegistrationService();