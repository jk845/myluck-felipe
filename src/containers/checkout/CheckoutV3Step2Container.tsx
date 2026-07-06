import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CheckoutV3Step2Presenter from '@/components/presenters/checkout/CheckoutV3Step2Presenter';
import { ConsentModal } from '@/components/checkout/ConsentModal';
import { registrationService } from '@/services/registration.service';

export type PaymentMethod = 'upfront' | 'monthly';
export type PlanTypeV3 = '1month' | '3month' | '6month';

const CheckoutV3Step2Container: React.FC = () => {
    const [searchParams] = useSearchParams();
    const plan = (searchParams.get('plan') as PlanTypeV3) || '6month';
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upfront');
    const [showConsentModal, setShowConsentModal] = useState(false);

    const planPrices = {
        '3month': { monthly: 799, upfront: 1797, upfrontSubtitle: 'Fullfør betalingen din nå. Det vil koste deg 599 kr/mnd. Du sparer 600 kr!', monthlyTitle: 'Månedlig betaling' },
        '6month': { monthly: 649, upfront: 2934, upfrontSubtitle: 'Fullfør betalingen din nå. Det vil koste deg 489 kr/mnd. Du sparer 960 kr!', monthlyTitle: 'Månedlig betaling' },
        '1month': { monthly: 979, upfront: 979, upfrontSubtitle: '', monthlyTitle: 'Månedlig betaling' },
    };

    const handleMethodChange = (method: PaymentMethod) => {
        setSelectedMethod(method);
    };

    const handleContinue = () => {
        setShowConsentModal(true);
    };

    const handleAcceptConsent = async (email: string) => {
        try {
            await registrationService.logConsent({
                email,
                consentType: 'immediate_start_waiver',
                plan: plan,
                userAgent: navigator.userAgent
            });
        } catch (error) {
            console.error('Failed to log consent:', error);
        }

        // Just sample Everfit URLs, typically you'd have different links based on payment method
        const everfitUrls: Record<string, string> = {
            '6month-monthly': 'https://coach.everfit.io/package/HF749073',
            '6month-upfront': 'https://coach.everfit.io/package/HF749073', 
            '3month-monthly': 'https://coach.everfit.io/package/HF749073',
            '3month-upfront': 'https://coach.everfit.io/package/HF749073',
        };

        const key = `${plan}-${selectedMethod}`;
        window.location.href = everfitUrls[key] || 'https://coach.everfit.io/package/HF749073';
    };

    return (
        <>
            <CheckoutV3Step2Presenter
                plan={plan}
                selectedMethod={selectedMethod}
                prices={planPrices[plan] || planPrices['6month']}
                onMethodChange={handleMethodChange}
                onContinue={handleContinue}
            />
            <ConsentModal
                isOpen={showConsentModal}
                onClose={() => setShowConsentModal(false)}
                onAccept={handleAcceptConsent}
            />
        </>
    );
};

export default CheckoutV3Step2Container;
