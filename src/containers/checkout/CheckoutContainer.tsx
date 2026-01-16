import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutPresenter from '@/components/presenters/checkout/CheckoutPresenter';
import { useRegistrationStore } from '@/store/registration.store';
import { analyticsService } from '@/services/analytics.service';

export type PlanType = '1month' | '6month';

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

const PRICE_INCREASE_DEADLINE = new Date(2025, 9, 20, 23, 59, 59); // Oct 20, 2025

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
  }
};

const CheckoutContainer: React.FC = () => {
  const navigate = useNavigate();
  const { setSubscriptionPlan, setSimplifiedMode, resetRegistration } = useRegistrationStore();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('6month');
  const [timeRemaining, setTimeRemaining] = useState<string>('—:—:—');

  // Calculate countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = PRICE_INCREASE_DEADLINE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('Prisøkning aktiv');
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
    analyticsService.trackPageView('checkout', {
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
    analyticsService.trackFormFieldChanged('checkout', 'plan', plan, {
      price: plans[plan].priceToday
    });
  };

  // Helper function to get bonuses for each plan
  const getBonusesForPlan = (plan: PlanType): string[] => {
    switch (plan) {
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
    // Reset any existing registration data first
    resetRegistration();

    // Set the selected plan in the registration store
    setSubscriptionPlan(selectedPlan);

    // Enable simplified mode
    setSimplifiedMode(true);

    // Navigate to registration with simplified flag
    navigate('/registration?simplified=true', {
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
    <CheckoutPresenter
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

export default CheckoutContainer;