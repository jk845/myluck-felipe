import React, { useState, useEffect } from 'react';
import CheckoutV2Presenter from '@/components/presenters/checkout/CheckoutV2Presenter';

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
        label: '1 måned',
        priceToday: 979,
        pricePerMonth: 979,
        per: '',
        binding: 0,
        cta: 'Start 1 mnd nå',
        guarantee: false
    },
    '6month': {
        label: '6 måneder',
        priceToday: 649,
        pricePerMonth: 649,
        per: '/mnd',
        binding: 6,
        cta: 'Start 6 mnd nå',
        guarantee: true,
        tagText: 'Mest populær',
        discount: '- 1 800 kr',
        isPopular: true
    }
};

const CheckoutV2Container: React.FC = () => {
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



    const getNextBillingDate = (): string => {
        const now = new Date();
        // Next billing is one month from today
        const nextBilling = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

        const months = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];
        return `${nextBilling.getDate()} ${months[nextBilling.getMonth()]}`;
    };

    const handlePlanChange = (plan: PlanType) => {
        setSelectedPlan(plan);
    };

    // Helper function to get bonuses for each plan


    const handleContinue = () => {
        // Redirect to Everfit package based on selected plan
        const everfitUrls = {
            '6month': 'https://coach.everfit.io/package/HL076810',
            '1month': 'https://coach.everfit.io/package/KW331845'
        };

        window.location.href = everfitUrls[selectedPlan];
    };

    const benefits = [
        '🏋️‍♀️ Personlig trenings- og matplan som tilpasser seg deg',
        '🏃‍♀️ Tilgang til alle Transformation Marathons',
        '🍲 Nesten 300 oppskrifter med handlelister (familievennlige bytter)',
        '🤝 Privat støttefellesskap og daglig veiledning'
    ];

    return (
        <CheckoutV2Presenter
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

export default CheckoutV2Container;
