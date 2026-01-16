import { apiService } from './api.service';
import { ENV_SUFFIX } from '@/lib/utils';

export interface CancelSubscriptionPayload {
  email: string;
  cancellationReason: string;
}

export interface CancelSubscriptionResponse {
  success: boolean;
  emailNotFound?: boolean;
  error?: string;
}

export interface ConfirmCancellationPayload {
  token: string;
}

export interface ConfirmCancellationResponse {
  success: boolean;
  error?: string;
}

class CancellationService {
  async requestCancellation(payload: CancelSubscriptionPayload): Promise<CancelSubscriptionResponse> {
    const response = await apiService.post<CancelSubscriptionResponse>(
      `/functions/v1/cancel-subscription${ENV_SUFFIX}`,
      payload
    );
    return response;
  }

  async confirmCancellation(payload: ConfirmCancellationPayload): Promise<ConfirmCancellationResponse> {
    const response = await apiService.post<ConfirmCancellationResponse>(
      `/functions/v1/confirm-cancellation${ENV_SUFFIX}`,
      payload
    );
    return response;
  }

  validateEmail(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }
}

export const cancellationService = new CancellationService();