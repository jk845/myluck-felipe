import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutLimitedOfferPresenter from '@/components/presenters/checkout-limited-offer/CheckoutLimitedOfferPresenter';
import { useRegistrationStore } from '@/store/registration.store';
import { analyticsService } from '@/services/analytics.service';
import { PRICE_INCREASE_DEADLINE, PROMO_TEXT } from '@/config/promo.config';

export type PlanType = '1month' | '6month' | '12month';

interface PlanDetails {
  label: string;
  priceToday: number;
  pricePerMonth: number;
  per: string;
  binding: number;
  cta: string;
  guarantee: boolean;
  tagText?: string;
  discount?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
}

const plans: Record<PlanType, PlanDetails> = {
  '1month': {
    label: '1 mnd',
    priceToday: 890,
    pricePerMonth: 890,
    per: '',
    binding: 0,
    cta: 'Start 1 mnd nå',
    guarantee: false
  },
  '6month': {
    label: '6 mnd',
    priceToday: 590,
    pricePerMonth: 590,
    per: '/mnd',
    binding: 6,
    cta: 'Start 6 mnd nå',
    guarantee: true,
    tagText: 'Mest populær',
    discount: '- 1 800 kr',
    isPopular: true
  },
  '12month': {
    label: '12 mnd',
    priceToday: 490,
    pricePerMonth: 490,
    per: '/mnd',
    binding: 12,
    cta: 'Start 12 mnd nå',
    guarantee: true,
    tagText: 'Best verdi',
    discount: '- 4 800 kr',
    isBestValue: true
  }
};

const CheckoutLimitedOfferContainer: React.FC = () => {
  const navigate = useNavigate();
  const { setSubscriptionPlan, setSimplifiedMode, setIsPromo, resetRegistration } = useRegistrationStore();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('12month');
  const [timeRemaining, setTimeRemaining] = useState<string>('—:—:—');

  // Calculate countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = PRICE_INCREASE_DEADLINE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining(PROMO_TEXT.timerExpired);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}d ${hours}t ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track page view
  useEffect(() => {
    analyticsService.trackPageView('checkout-limited-offer', {
      default_plan: selectedPlan
    });
  }, []);

  const getNextBillingDate = (): string => {
    const now = new Date();
    // Next billing is one month from today
    const nextBilling = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

    const months = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];
    return `${nextBilling.getDate()} ${months[nextBilling.getMonth()]}`;
  };

  const handlePlanChange = (plan: PlanType) => {
    setSelectedPlan(plan);
    analyticsService.trackFormFieldChanged('checkout-limited-offer', 'plan', plan, {
      price: plans[plan].priceToday
    });
  };

  // Helper function to get bonuses for each plan
  const getBonusesForPlan = (plan: PlanType): string[] => {
    switch (plan) {
      case '12month':
        return [
          'Milas kostholdsplan tilpasset deg',
          'Din egen 8-ukers skreddersydde handlingsplan fra Mila'
        ];
      case '6month':
        return [
          'Milas kostholdsplan tilpasset deg'
        ];
      case '1month':
      default:
        return [];
    }
  };

  const handleContinue = () => {
    console.log('[CheckoutLimitedOffer] Starting checkout flow:', { selectedPlan });

    // Enable promo pricing BEFORE reset
    setIsPromo(true);
    console.log('[CheckoutLimitedOffer] Set isPromo=true');

    // Reset any existing registration data but preserve promo flag
    resetRegistration(true);
    console.log('[CheckoutLimitedOffer] Reset registration with preservePromo=true');

    // Set the selected plan in the registration store
    setSubscriptionPlan(selectedPlan);
    console.log('[CheckoutLimitedOffer] Set subscription plan:', selectedPlan);

    // Enable simplified mode
    setSimplifiedMode(true);
    console.log('[CheckoutLimitedOffer] Set simplified mode=true');

    // Navigate to registration with simplified and promo flags
    console.log('[CheckoutLimitedOffer] Navigating to /registration?simplified=true&promo=true');
    navigate('/registration?simplified=true&promo=true', {
      state: {
        selectedPlan,
        fromCheckout: true,
        planDetails: {
          name: plans[selectedPlan].label,
          price: plans[selectedPlan].pricePerMonth,
          perDayPrice: `Fra ${Math.round(plans[selectedPlan].pricePerMonth / 30)} kr dagen`,
          guarantee: plans[selectedPlan].guarantee,
          bonuses: getBonusesForPlan(selectedPlan)
        }
      }
    });
  };

  const benefits = [
    '🏋️‍♀️ Personlig trenings- og matplan som tilpasser seg deg',
    '🏃‍♀️ Tilgang til alle Transformation Marathons',
    '🍲 Nesten 300 oppskrifter med handlelister (familievennlige bytter)',
    '🤝 Privat støttefellesskap og daglig veiledning'
  ];

  return (
    <CheckoutLimitedOfferPresenter
      selectedPlan={selectedPlan}
      plans={plans}
      onPlanChange={handlePlanChange}
      timeRemaining={timeRemaining}
      nextBillingDate={getNextBillingDate()}
      benefits={benefits}
      onContinue={handleContinue}
    />
  );
};

export default CheckoutLimitedOfferContainer;