import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY || '';
const POSTHOG_HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

class AnalyticsService {
  private initialized = false;
  private stepTimers: Map<string, number> = new Map();
  private sessionStartTime: number | null = null;

  init() {
    if (this.initialized || !POSTHOG_KEY) {
      if (!POSTHOG_KEY && import.meta.env.DEV) {
        console.warn('[Analytics] PostHog key not found');
      }
      return;
    }

    const isProduction = import.meta.env.PROD;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true, // Enable automatic pageview tracking for Web Analytics
      capture_pageleave: true,
      persistence: 'localStorage',
      debug: !isProduction, // Debug only in development
      loaded: () => {
        // Capture initial pageview
        posthog.capture('$pageview');
      }
    });

    this.initialized = true;
  }

  trackRegistrationStep(step: string, stepNumber: number, data?: Record<string, any>) {
    const previousStep = this.getPreviousStep(step);
    const timeOnPreviousStep = this.getTimeOnStep(previousStep);

    // Human-readable step names
    const stepNames: Record<string, string> = {
      'subscription-type': 'Subscription Type Selection',
      'motivation': 'Motivation Questions',
      'subscription-plan': 'Plan Selection',
      'physical-data': 'Physical Data',
      'goals-lifestyle': 'Goals & Lifestyle',
      'contact-info': 'Contact Information',
      'order-confirmation': 'Payment Method'
    };

    const eventData = {
      step_name: stepNames[step] || step,
      step_id: step,
      step_number: stepNumber,
      previous_step: previousStep ? stepNames[previousStep] : null,
      previous_step_id: previousStep,
      time_on_previous_step_seconds: timeOnPreviousStep ? Math.round(timeOnPreviousStep / 1000) : null,
      session_duration_seconds: this.getSessionDuration() ? Math.round(this.getSessionDuration()! / 1000) : null,
      ...this.getUTMParams(),
      ...data
    };
    posthog.capture('Registration: Step Viewed', eventData);

    // Start timer for this step
    this.stepTimers.set(step, Date.now());
  }

  trackRegistrationStarted(data?: Record<string, any>) {
    this.sessionStartTime = Date.now();
    const eventData = {
      timestamp: new Date().toISOString(),
      entry_point: data?.initial_step || 'subscription-type',
      device_type: this.getDeviceType(),
      ...this.getUTMParams(),
      ...data
    };
    posthog.capture('Registration: Started', eventData);
  }

  trackRegistrationStepCompleted(step: string, stepNumber: number, formData: Record<string, any>, data?: Record<string, any>) {
    const timeOnStep = this.getTimeOnStep(step);

    // Human-readable step names
    const stepNames: Record<string, string> = {
      'subscription-type': 'Subscription Type',
      'subscription-plan': 'Plan Selection',
      'physical-data': 'Physical Data',
      'goals-lifestyle': 'Goals & Lifestyle',
      'contact-info': 'Contact Info',
      'order-confirmation': 'Payment Method'
    };

    const eventData = {
      step_name: stepNames[step] || step,
      step_id: step,
      step_number: stepNumber,
      time_on_step_seconds: timeOnStep ? Math.round(timeOnStep / 1000) : null,
      session_duration_seconds: this.getSessionDuration() ? Math.round(this.getSessionDuration()! / 1000) : null,
      form_data: formData,
      ...this.getUTMParams(),
      ...data
    };
    posthog.capture('Registration: Step Completed', eventData);
  }

  trackRegistrationAbandoned(lastStep: string, data?: Record<string, any>) {
    const eventData = {
      last_step: lastStep,
      session_duration: this.getSessionDuration(),
      ...this.getUTMParams(),
      ...data
    };
    posthog.capture('Registration: Abandoned', eventData);
  }

  trackFormValidationError(step: string, field: string, errorType: string, data?: Record<string, any>) {
    const eventData = {
      step_name: step,
      field_name: field,
      error_type: errorType,
      ...this.getUTMParams(),
      ...data
    };
    posthog.capture('Form: Validation Error', eventData);
  }

  trackFormFieldChanged(step: string, field: string, value: any, data?: Record<string, any>) {
    const eventData = {
      step_name: step,
      field_name: field,
      field_value: value,
      ...data
    };
    posthog.capture('Form: Field Changed', eventData);
  }

  trackPaymentInitiated(paymentMethod: string, data?: Record<string, any>) {
    const eventData = {
      payment_method: paymentMethod === 'upfront' ? 'Full Payment' : 'Monthly Subscription',
      payment_method_id: paymentMethod,
      session_duration_seconds: this.getSessionDuration() ? Math.round(this.getSessionDuration()! / 1000) : null,
      ...this.getUTMParams(),
      ...data
    };
    posthog.capture('Payment: Initiated', eventData);
  }

  trackNavigationBack(fromStep: string, toStep: string, data?: Record<string, any>) {
    const stepNames: Record<string, string> = {
      'subscription-type': 'Subscription Type',
      'subscription-plan': 'Plan Selection',
      'physical-data': 'Physical Data',
      'goals-lifestyle': 'Goals & Lifestyle',
      'contact-info': 'Contact Info',
      'order-confirmation': 'Payment Method'
    };

    const eventData = {
      from_step: stepNames[fromStep] || fromStep,
      from_step_id: fromStep,
      to_step: stepNames[toStep] || toStep,
      to_step_id: toStep,
      ...data
    };
    posthog.capture('Registration: Back Navigation', eventData);
  }

  trackRegistrationCompleted(data: Record<string, any>) {
    const totalDuration = this.getSessionDuration();
    const eventData = {
      ...data,
      total_duration_seconds: totalDuration ? Math.round(totalDuration / 1000) : null,
      total_duration_minutes: totalDuration ? Math.round(totalDuration / 60000) : null,
      device_type: this.getDeviceType(),
      ...this.getUTMParams()
    };
    posthog.capture('Registration: Completed', eventData);
  }

  trackPaymentSuccess(data?: Record<string, any>) {
    const eventData = {
      timestamp: new Date().toISOString(),
      device_type: this.getDeviceType(),
      ...this.getUTMParams(),
      ...data
    };
    posthog.capture('Payment: Success', eventData);
  }

  trackPostRegistrationStarted(data?: Record<string, any>) {
    const eventData = {
      timestamp: new Date().toISOString(),
      device_type: this.getDeviceType(),
      ...this.getUTMParams(),
      ...data
    };
    posthog.capture('Onboarding: Started', eventData);
  }

  trackPostRegistrationStep(step: string, data?: Record<string, any>) {
    const stepNames: Record<string, string> = {
      'welcome': 'Welcome',
      'goals': 'Goals Selection',
      'personal-info': 'Personal Information',
      'physical-data': 'Physical Data',
      'training-frequency': 'Training Frequency',
      'training-type': 'Training Type',
      'training-variation': 'Training Variation',
      'exercise-confidence': 'Exercise Confidence',
      'insecurities': 'Insecurities',
      'mentality-focus': 'Mentality Focus',
      'previous-obstacles': 'Previous Obstacles',
      'inner-circle': 'Inner Circle',
      'instructions': 'Instructions',
      'payment-success': 'Payment Success'
    };

    const eventData = {
      step_name: stepNames[step] || step,
      step_id: step,
      timestamp: new Date().toISOString(),
      device_type: this.getDeviceType(),
      ...this.getUTMParams(),
      ...data
    };
    posthog.capture('Onboarding: Step Viewed', eventData);
  }

  trackPostRegistrationStepCompleted(step: string, formData?: Record<string, any>) {
    const stepNames: Record<string, string> = {
      'training-type': 'Training Type',
      'training-variation': 'Training Variation',
      'exercise-confidence': 'Exercise Confidence',
      'insecurities': 'Insecurities',
      'mentality-focus': 'Mentality Focus',
      'previous-obstacles': 'Previous Obstacles',
      'inner-circle': 'Inner Circle',
      'instructions': 'Instructions',
      'payment-success': 'Payment Success'
    };

    const eventData = {
      step_name: stepNames[step] || step,
      step_id: step,
      form_data: formData,
      timestamp: new Date().toISOString(),
      device_type: this.getDeviceType(),
      ...this.getUTMParams()
    };
    posthog.capture('Onboarding: Step Completed', eventData);
  }

  trackPostRegistrationCompleted(data: Record<string, any>) {
    const eventData = {
      timestamp: new Date().toISOString(),
      device_type: this.getDeviceType(),
      ...this.getUTMParams(),
      ...data
    };
    posthog.capture('Onboarding: Completed', eventData);
  }

  trackCancellationStep(step: string, data?: Record<string, any>) {
    posthog.capture('Cancellation: Step Viewed', {
      step_name: step,
      ...data
    });
  }

  trackCancellationCompleted(reason: string, data?: Record<string, any>) {
    posthog.capture('Cancellation: Completed', {
      cancellation_reason: reason,
      ...data
    });
  }

  identifyUser(userId: string, traits?: Record<string, any>) {
    const enrichedTraits = {
      ...traits,
      ...this.getUTMParams(),
      identified_at: new Date().toISOString()
    };
    posthog.identify(userId, enrichedTraits);
  }

  setUserProperties(properties: Record<string, any>) {
    posthog.people.set(properties);
  }

  private getTimeOnStep(step: string | null): number | null {
    if (!step || !this.stepTimers.has(step)) return null;
    const startTime = this.stepTimers.get(step)!;
    return Math.round((Date.now() - startTime) / 1000); // Return in seconds
  }

  private getSessionDuration(): number | null {
    if (!this.sessionStartTime) return null;
    return Math.round((Date.now() - this.sessionStartTime) / 1000); // Return in seconds
  }

  private getDeviceType(): string {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private getPreviousStep(currentStep: string): string | null {
    const stepOrder = [
      'subscription-type',
      'subscription-plan',
      'physical-data',
      'contact-info',
      'goals-lifestyle',
      'order-confirmation'
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    return currentIndex > 0 ? stepOrder[currentIndex - 1] : null;
  }

  private getUTMParams(): Record<string, string | null> {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_term: params.get('utm_term'),
      utm_content: params.get('utm_content'),
      referrer: document.referrer || null
    };
  }

  trackPageView(pageName?: string, properties?: Record<string, any>) {
    const eventData = {
      ...this.getUTMParams(),
      ...properties
    };

    if (pageName) {
      eventData.$screen_name = pageName;
    }

    posthog.capture('$pageview', eventData);
  }

  reset() {
    posthog.reset();
  }

  // New advanced tracking methods
  trackFormInteraction(formName: string, action: 'focus' | 'blur' | 'submit_attempt', fieldName?: string) {
    posthog.capture('Form: Interaction', {
      form_name: formName,
      action: action,
      field_name: fieldName,
      timestamp: new Date().toISOString(),
      device_type: this.getDeviceType()
    });
  }

  trackConversionFunnel(stage: 'viewed' | 'started' | 'abandoned' | 'completed', metadata?: Record<string, any>) {
    posthog.capture('Conversion: Funnel Stage', {
      stage: stage,
      session_duration_seconds: this.getSessionDuration(),
      ...this.getUTMParams(),
      ...metadata
    });
  }

  trackPerformance(metric: 'page_load' | 'api_call' | 'form_submission', duration: number, metadata?: Record<string, any>) {
    posthog.capture('Performance: Metric', {
      metric_type: metric,
      duration_ms: duration,
      device_type: this.getDeviceType(),
      ...metadata
    });
  }

  trackUserEngagement(action: 'scroll' | 'click' | 'hover' | 'video_play', element: string, metadata?: Record<string, any>) {
    posthog.capture('User: Engagement', {
      action_type: action,
      element: element,
      timestamp: new Date().toISOString(),
      ...metadata
    });
  }

  trackError(errorType: 'validation' | 'api' | 'payment' | 'general', errorMessage: string, metadata?: Record<string, any>) {
    posthog.capture('Error: Occurred', {
      error_type: errorType,
      error_message: errorMessage,
      timestamp: new Date().toISOString(),
      device_type: this.getDeviceType(),
      ...this.getUTMParams(),
      ...metadata
    });
  }

  // Group analytics for cohort analysis
  setUserGroup(groupType: string, groupId: string) {
    posthog.group(groupType, groupId);
  }

  // Feature flag integration
  isFeatureEnabled(featureName: string): boolean {
    return posthog.isFeatureEnabled(featureName) ?? false;
  }

  getFeatureFlagPayload(featureName: string): any {
    return posthog.getFeatureFlagPayload(featureName);
  }
}

export const analyticsService = new AnalyticsService();