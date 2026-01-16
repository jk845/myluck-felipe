import React from 'react';
import { ExerciseConfidenceContainer } from '@/containers/post-registration/ExerciseConfidenceContainer';
import { TrainingConfidenceData } from '@/types/post-registration';

interface ExerciseConfidenceStepProps {
  onNext: (data: TrainingConfidenceData) => void;
  onBack: () => void;
  initialData?: TrainingConfidenceData | null;
}

const ExerciseConfidenceStep: React.FC<ExerciseConfidenceStepProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  return (
    <ExerciseConfidenceContainer
      onNext={onNext}
      onBack={onBack}
      initialData={initialData}
    />
  );
};

export default ExerciseConfidenceStep;