import React from 'react';
import { PreviousObstaclesContainer } from '@/containers/post-registration/PreviousObstaclesContainer';

interface PreviousObstaclesData {
  previousObstacles: string;
}

interface PreviousObstaclesStepProps {
  onNext: (data: PreviousObstaclesData) => void;
  onBack: () => void;
  initialData?: PreviousObstaclesData | null;
}

const PreviousObstaclesStep: React.FC<PreviousObstaclesStepProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  return (
    <PreviousObstaclesContainer
      onNext={onNext}
      onBack={onBack}
      initialData={initialData}
    />
  );
};

export default PreviousObstaclesStep;