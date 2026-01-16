import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CancellationErrorPresenter } from '@/components/presenters/cancellation';

export const CancellationErrorContainer: React.FC = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/cancel-subscription');
  };

  return <CancellationErrorPresenter onTryAgain={handleTryAgain} />;
};