import React from 'react';
import { MentalityFocusContainer } from '@/containers/post-registration/MentalityFocusContainer';

interface MentalityFocusData {
  mentalityFocus: string;
}

interface MentalityFocusStepProps {
  onNext: (data: MentalityFocusData) => void;
  onBack: () => void;
  initialData?: MentalityFocusData | null;
}

const MentalityFocusStep: React.FC<MentalityFocusStepProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  return (
    <MentalityFocusContainer
      onNext={onNext}
      onBack={onBack}
      initialData={initialData}
    />
  );
};

export default MentalityFocusStep;