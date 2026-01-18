import React from 'react';

import { LandingPresenter } from '@/components/presenters/landing/LandingPresenter';

export const LandingContainer: React.FC = () => {

  const handleStartRegistration = () => {
    window.location.href = 'https://myluck.no';
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