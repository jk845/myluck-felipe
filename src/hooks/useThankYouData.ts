import { useState, useEffect } from 'react';
import { registrationService } from '@/services/registration.service';

export interface CustomerInfo {
  email: string;
  password: string;
  orderId: string;
  subscriptionType: string;
  subscriptionPlan: string;
  renewalDate: string;
  nextPaymentDate: string;
  nextCycleDate: string;
  price: string;
}

interface UseThankYouDataProps {
  email: string;
  orderId?: string;
}

export const useThankYouData = ({ email, orderId }: UseThankYouDataProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: email,
    password: '',
    orderId: orderId ? `#${orderId.substring(0, 8)}` : `#${Math.floor(Math.random() * 10000000)}`,
    subscriptionType: 'Premium-abonnement',
    subscriptionPlan: '1month',
    renewalDate: calculateRenewalDate('1month'),
    nextPaymentDate: calculateNextPaymentDate('1month'),
    nextCycleDate: calculateNextCycleDate('1month'),
    price: '490',
  });

  useEffect(() => {
    const fetchUserCredentials = async () => {
      if (!email) {
        setError('Brukerens e-post ble ikke funnet. Vennligst kontakt kundeservice.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await registrationService.getUserCredentials(email, orderId);

        if (!response.success || !response.userData) {
          throw new Error('Kunne ikke hente brukerdata');
        }

        const userData = response.userData;

        setCustomerInfo(prev => ({
          ...prev,
          email: userData.email || email,
          password: userData.password || 'Passord vil bli sendt på e-post. Hvis du allerede har et passord (ditt gamle), kan du bruke det.',
          subscriptionPlan: userData.subscriptionPlan || '12month',
          price: userData.subscriptionPrice || '490',
          renewalDate: calculateRenewalDate(userData.subscriptionPlan || '12month'),
          nextPaymentDate: calculateNextPaymentDate(userData.subscriptionPlan || '12month'),
          nextCycleDate: calculateNextCycleDate(userData.subscriptionPlan || '12month'),
          orderId: userData.paymentId ? `#${userData.paymentId}` : prev.orderId,
        }));
      } catch (error) {
        console.error('Feil ved henting av brukerdetaljer:', error);
        setError('Kunne ikke laste brukerdata. Vennligst sjekk e-posten din for innloggingsdetaljer.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCredentials();
  }, [email, orderId]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Kopiert til utklippstavlen!');
    } catch (err) {
      console.error('Kunne ikke kopiere tekst: ', err);
    }
  };

  return {
    isLoading,
    error,
    customerInfo,
    copyToClipboard,
  };
};

// Helper function to calculate renewal date
function calculateRenewalDate(subscriptionPlan: string): string {
  const currentDate = new Date();
  let monthsToAdd = 1;

  // Handle both regular and pay-at-once plans
  if (subscriptionPlan === '1month') {
    monthsToAdd = 1;
  } else if (subscriptionPlan === '6month' || subscriptionPlan === '6month_pay_at_once') {
    monthsToAdd = 6;
  } else if (subscriptionPlan === '12month' || subscriptionPlan === '12month_pay_at_once') {
    monthsToAdd = 12;
  }

  const renewalDate = new Date(currentDate);
  renewalDate.setMonth(currentDate.getMonth() + monthsToAdd);

  return renewalDate.toLocaleDateString('nb-NO', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Helper function to calculate next payment date
function calculateNextPaymentDate(subscriptionPlan: string): string {
  // For pay-at-once plans, there's no next payment
  if (subscriptionPlan.includes('pay_at_once')) {
    return ''; // No next payment for upfront plans
  }
  
  const currentDate = new Date();
  // For all subscription plans with monthly payments, next payment is in 1 month
  currentDate.setMonth(currentDate.getMonth() + 1);

  return currentDate.toLocaleDateString('nb-NO', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Helper function to calculate next cycle date
function calculateNextCycleDate(subscriptionPlan: string): string {
  const currentDate = new Date();
  let monthsToAdd = 1;

  // Handle both regular and pay-at-once plans
  if (subscriptionPlan === '1month') {
    monthsToAdd = 1;
  } else if (subscriptionPlan === '6month' || subscriptionPlan === '6month_pay_at_once') {
    monthsToAdd = 6;
  } else if (subscriptionPlan === '12month' || subscriptionPlan === '12month_pay_at_once') {
    monthsToAdd = 12;
  }

  const cycleDate = new Date(currentDate);
  cycleDate.setMonth(currentDate.getMonth() + monthsToAdd);

  return cycleDate.toLocaleDateString('nb-NO', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}