import React from 'react';
import { TrainingVariationContainer } from '@/containers/post-registration/TrainingVariationContainer';
import { TrainingVariationData } from '@/types/post-registration';

interface TrainingVariationStepProps {
  onNext: (data: TrainingVariationData) => void;
  onBack: () => void;
  initialData?: TrainingVariationData | null;
}

const TrainingVariationStep: React.FC<TrainingVariationStepProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  return (
    <TrainingVariationContainer
      onNext={onNext}
      onBack={onBack}
      initialData={initialData}
    />
  );
};

export default TrainingVariationStep;