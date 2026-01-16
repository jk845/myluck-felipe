import React from 'react';
import { TrainingTypeContainer } from '@/containers/post-registration/TrainingTypeContainer';
import { TrainingTypeData } from '@/types/post-registration';

interface TrainingTypeStepProps {
  onNext: (data: TrainingTypeData) => void;
  onBack: () => void;
  initialData?: TrainingTypeData | null;
}

const TrainingTypeStep: React.FC<TrainingTypeStepProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  return (
    <TrainingTypeContainer
      onNext={onNext}
      onBack={onBack}
      initialData={initialData}
    />
  );
};

export default TrainingTypeStep;