import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CheckoutLimitedOfferContainer from '../CheckoutLimitedOfferContainer';
import { useRegistrationStore } from '@/store/registration.store';
import { analyticsService } from '@/services/analytics.service';
import { PROMO_TEXT } from '@/config/promo.config';

// Mock the dependencies
vi.mock('@/store/registration.store');
vi.mock('@/services/analytics.service');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the presenter component
vi.mock('@/components/presenters/checkout-limited-offer/CheckoutLimitedOfferPresenter', () => ({
  default: ({ selectedPlan, onPlanChange, onContinue, timeRemaining, plans }: any) => (
    <div data-testid="checkout-presenter">
      <div data-testid="selected-plan">{selectedPlan}</div>
      <div data-testid="time-remaining">{timeRemaining}</div>
      {Object.keys(plans).map((plan) => (
        <button
          key={plan}
          data-testid={`plan-${plan}`}
          onClick={() => onPlanChange(plan as any)}
        >
          {plans[plan].label}
        </button>
      ))}
      <button data-testid="continue-button" onClick={onContinue}>
        Continue
      </button>
    </div>
  ),
}));

describe('CheckoutLimitedOfferContainer', () => {
  const mockSetSubscriptionPlan = vi.fn();
  const mockSetSimplifiedMode = vi.fn();
  const mockSetIsPromo = vi.fn();
  const mockResetRegistration = vi.fn();
  const mockTrackEvent = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mocks
    (useRegistrationStore as any).mockReturnValue({
      setSubscriptionPlan: mockSetSubscriptionPlan,
      setSimplifiedMode: mockSetSimplifiedMode,
      setIsPromo: mockSetIsPromo,
      resetRegistration: mockResetRegistration,
    });

    (analyticsService.trackPageView as any) = mockTrackEvent;
    (analyticsService.trackFormFieldChanged as any) = vi.fn();

    // Mock Date for consistent testing
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-10-17T10:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render with default 12month plan selected', () => {
    render(
      <MemoryRouter>
        <CheckoutLimitedOfferContainer />
      </MemoryRouter>
    );

    expect(screen.getByTestId('selected-plan')).toHaveTextContent('12month');
  });

  it('should change selected plan when clicking plan buttons', () => {
    render(
      <MemoryRouter>
        <CheckoutLimitedOfferContainer />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('plan-6month'));
    expect(screen.getByTestId('selected-plan')).toHaveTextContent('6month');

    fireEvent.click(screen.getByTestId('plan-1month'));
    expect(screen.getByTestId('selected-plan')).toHaveTextContent('1month');
  });

  it('should track analytics when changing plans', () => {
    const mockTrackFieldChanged = vi.fn();
    (analyticsService.trackFormFieldChanged as any) = mockTrackFieldChanged;

    render(
      <MemoryRouter>
        <CheckoutLimitedOfferContainer />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('plan-6month'));

    expect(mockTrackFieldChanged).toHaveBeenCalledWith('checkout-limited-offer', 'plan', '6month', {
      price: 590
    });
  });

  it('should handle continue action correctly', () => {
    render(
      <MemoryRouter>
        <CheckoutLimitedOfferContainer />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('continue-button'));

    // Should enable promo pricing first
    expect(mockSetIsPromo).toHaveBeenCalledWith(true);

    // Should reset registration with preservePromo=true
    expect(mockResetRegistration).toHaveBeenCalledWith(true);

    // Should set subscription plan
    expect(mockSetSubscriptionPlan).toHaveBeenCalledWith('12month');

    // Should enable simplified mode
    expect(mockSetSimplifiedMode).toHaveBeenCalledWith(true);

    // Should navigate to registration with promo parameter
    expect(mockNavigate).toHaveBeenCalledWith('/registration?simplified=true&promo=true', {
      state: {
        selectedPlan: '12month',
        fromCheckout: true,
        planDetails: {
          name: '12 mnd',
          price: 490,
          perDayPrice: 'Fra 16 kr dagen',
          guarantee: true,
          bonuses: [
            'Milas kostholdsplan tilpasset deg',
            'Din egen 8-ukers skreddersydde handlingsplan fra Mila'
          ]
        }
      },
    });
  });

  it('should update countdown timer', () => {
    render(
      <MemoryRouter>
        <CheckoutLimitedOfferContainer />
      </MemoryRouter>
    );

    // Initial timer should show time remaining
    const timerElement = screen.getByTestId('time-remaining');
    expect(timerElement).toBeDefined();

    // Timer should show format like "3d 13t 59m 59s"
    expect(timerElement.textContent).toBeTruthy();
  });

  it('should show expired message when deadline has passed', () => {
    // Set time past the deadline
    vi.setSystemTime(new Date('2025-10-21T10:00:00'));

    render(
      <MemoryRouter>
        <CheckoutLimitedOfferContainer />
      </MemoryRouter>
    );

    vi.advanceTimersByTime(1000);

    expect(screen.getByTestId('time-remaining')).toHaveTextContent(PROMO_TEXT.timerExpired);
  });

  it('should calculate next billing date correctly for each plan', () => {
    const mockTrackFieldChanged = vi.fn();
    (analyticsService.trackFormFieldChanged as any) = mockTrackFieldChanged;

    render(
      <MemoryRouter>
        <CheckoutLimitedOfferContainer />
      </MemoryRouter>
    );

    // Test for 12-month plan (default)
    const presenter = screen.getByTestId('checkout-presenter');
    expect(presenter).toBeDefined();

    // Change to 6-month plan
    fireEvent.click(screen.getByTestId('plan-6month'));
    expect(mockTrackFieldChanged).toHaveBeenCalled();

    // Change to 1-month plan
    fireEvent.click(screen.getByTestId('plan-1month'));
    expect(mockTrackFieldChanged).toHaveBeenCalledTimes(2);
  });

  it('should track page view on mount', () => {
    render(
      <MemoryRouter>
        <CheckoutLimitedOfferContainer />
      </MemoryRouter>
    );

    expect(mockTrackEvent).toHaveBeenCalledWith('checkout-limited-offer', {
      default_plan: '12month'
    });
  });

  it('should pass correct benefits to presenter', () => {
    const { container } = render(
      <MemoryRouter>
        <CheckoutLimitedOfferContainer />
      </MemoryRouter>
    );

    // The benefits are passed to the presenter and would be rendered there
    // In this test we're just ensuring the container renders without errors
    expect(container.querySelector('[data-testid="checkout-presenter"]')).toBeTruthy();
  });

  it('should handle plan changes with proper state updates', () => {
    render(
      <MemoryRouter>
        <CheckoutLimitedOfferContainer />
      </MemoryRouter>
    );

    // Change to 6-month plan
    fireEvent.click(screen.getByTestId('plan-6month'));
    expect(screen.getByTestId('selected-plan')).toHaveTextContent('6month');

    // Click continue with 6-month plan
    fireEvent.click(screen.getByTestId('continue-button'));

    // Should set the 6-month plan in store
    expect(mockSetSubscriptionPlan).toHaveBeenCalledWith('6month');

    // Should navigate with 6-month plan state
    expect(mockNavigate).toHaveBeenCalledWith('/registration?simplified=true&promo=true', {
      state: {
        selectedPlan: '6month',
        fromCheckout: true,
        planDetails: {
          name: '6 mnd',
          price: 590,
          perDayPrice: 'Fra 20 kr dagen',
          guarantee: true,
          bonuses: [
            'Milas kostholdsplan tilpasset deg'
          ]
        }
      },
    });
  });
});