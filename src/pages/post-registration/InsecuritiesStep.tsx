import React from 'react';
import { InsecuritiesContainer } from '@/containers/post-registration/InsecuritiesContainer';
import { InsecuritiesData } from '@/types/post-registration';

interface InsecuritiesStepProps {
  onNext: (data: InsecuritiesData) => void;
  onBack: () => void;
  initialData?: InsecuritiesData | null;
}

const InsecuritiesStep: React.FC<InsecuritiesStepProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  return (
    <InsecuritiesContainer
      onNext={onNext}
      onBack={onBack}
      initialData={initialData}
    />
  );
};

export default InsecuritiesStep;