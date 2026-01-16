import React from 'react';
import { InnerCircleContainer } from '@/containers/post-registration/InnerCircleContainer';

interface InnerCircleData {
  interestedInInnerCircle: string;
}

interface InnerCircleStepProps {
  onNext: (data: InnerCircleData) => void;
  onBack: () => void;
  initialData?: InnerCircleData | null;
}

const InnerCircleStep: React.FC<InnerCircleStepProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  return (
    <InnerCircleContainer
      onNext={onNext}
      onBack={onBack}
      initialData={initialData}
    />
  );
};

export default InnerCircleStep;