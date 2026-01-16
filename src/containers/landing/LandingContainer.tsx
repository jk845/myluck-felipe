import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingPresenter } from '@/components/presenters/landing/LandingPresenter';

export const LandingContainer: React.FC = () => {
  const navigate = useNavigate();

  const handleStartRegistration = () => {
    navigate('/checkout');
  };

  const handleLeadMagnet = () => {
    window.open('https://www.instagram.com/milatimaa?igsh=MTZxY2g5a3djMXZxcg==', '_blank');
  };

  return (
    <LandingPresenter
      onStartRegistration={handleStartRegistration}
      onLeadMagnet={handleLeadMagnet}
    />
  );
};