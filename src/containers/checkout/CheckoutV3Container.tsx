import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutV3Presenter from '@/components/presenters/checkout/CheckoutV3Presenter';
import { ConsentModal } from '@/components/checkout/ConsentModal';
import { registrationService } from '@/services/registration.service';

export type PlanTypeV3 = '1month' | '3month' | '6month';

export interface PlanDetailsV3 {
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

const PRICE_INCREASE_DEADLINE = new Date(2025, 9, 20, 23, 59, 59);

const plans: Record<PlanTypeV3, PlanDetailsV3> = {
    '1month': {
        label: '1 måned',
        priceToday: 979,
        pricePerMonth: 979,
        per: '',
        binding: 0,
        cta: 'Start 1 mnd nå',
        guarantee: false
    },
    '3month': {
        label: '3 måneder',
        priceToday: 599,
        pricePerMonth: 599,
        per: '/mnd',
        binding: 3,
        cta: 'Gå videre',
        guarantee: true,
        tagText: 'Anbefalt'
    },
    '6month': {
        label: '6 måneder',
        priceToday: 489,
        pricePerMonth: 489,
        per: '/mnd',
        binding: 6,
        cta: 'Gå videre',
        guarantee: true,
        tagText: 'Mest populær',
        discount: '- 1 800 kr',
        isPopular: true
    }
};

const CheckoutV3Container: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState<PlanTypeV3>('6month');
    const [timeRemaining, setTimeRemaining] = useState<string>('—:—:—');
    const [showConsentModal, setShowConsentModal] = useState(false);
    const navigate = useNavigate();

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
        const nextBilling = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
        const months = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];
        return `${nextBilling.getDate()} ${months[nextBilling.getMonth()]}`;
    };

    const handlePlanChange = (plan: PlanTypeV3) => {
        setSelectedPlan(plan);
    };

    const handleContinue = () => {
        // If 1 month, maybe just go straight to consent for immediate start, or redirect.
        if (selectedPlan === '1month') {
            setShowConsentModal(true);
        } else {
            // For 3 or 6 months, navigate to step 2 to choose payment method / price
            navigate(`/checkout-v3-step2?plan=${selectedPlan}`);
        }
    };

    const handleAcceptConsent = async (email: string) => {
        try {
            await registrationService.logConsent({
                email,
                consentType: 'immediate_start_waiver',
                plan: selectedPlan,
                userAgent: navigator.userAgent
            });
        } catch (error) {
            console.error('Failed to log consent:', error);
        }

        if (selectedPlan === '1month') {
            window.location.href = 'https://coach.everfit.io/package/HF749073';
        }
    };

    const benefits = [
        '💪 Treningsprogram',
        '🥗 Personlig matplan og over 300 oppskrifter',
        '🎥 Webinarer og leksjoner',
        '📚 Månedens tema',
        '🌸 MyLuck Univers',
        '✅ Vaner som støtter deg i hverdagen'
    ];

    return (
        <>
            <CheckoutV3Presenter
                selectedPlan={selectedPlan}
                plans={plans}
                onPlanChange={handlePlanChange}
                timeRemaining={timeRemaining}
                nextBillingDate={getNextBillingDate()}
                benefits={benefits}
                onContinue={handleContinue}
            />
            {selectedPlan === '1month' && (
                <ConsentModal
                    isOpen={showConsentModal}
                    onClose={() => setShowConsentModal(false)}
                    onAccept={handleAcceptConsent}
                />
            )}
        </>
    );
};

export default CheckoutV3Container;
