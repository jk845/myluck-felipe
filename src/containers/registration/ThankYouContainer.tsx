import React from 'react';
import { useLocation } from 'react-router-dom';
import { useThankYouData } from '@/hooks/useThankYouData';
import { ThankYouPresenter } from '@/components/presenters/registration';

export const ThankYouContainer: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const emailFromUrl = searchParams.get('email') || '';
  const orderIdFromUrl = searchParams.get('orderId') || '';

  const { isLoading, error, customerInfo, copyToClipboard } = useThankYouData({
    email: emailFromUrl,
    orderId: orderIdFromUrl,
  });

  return (
    <ThankYouPresenter
      isLoading={isLoading}
      error={error}
      customerInfo={customerInfo}
      onCopyToClipboard={copyToClipboard}
    />
  );
};