import React from 'react';
import { useForm } from 'react-hook-form';
import { PreviousObstaclesPresenter } from '@/components/presenters/post-registration/PreviousObstaclesPresenter';

interface PreviousObstaclesData {
  previousObstacles: string;
}

interface PreviousObstaclesContainerProps {
  onNext: (data: PreviousObstaclesData) => void;
  onBack: () => void;
  initialData?: PreviousObstaclesData | null;
}

export const PreviousObstaclesContainer: React.FC<PreviousObstaclesContainerProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    register
  } = useForm<PreviousObstaclesData>({
    defaultValues: initialData || {
      previousObstacles: '',
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: PreviousObstaclesData) => {
    if (data.previousObstacles.trim()) {
      onNext(data);
    }
  };

  return (
    <PreviousObstaclesPresenter
      register={register}
      obstacles={watchedValues.previousObstacles || ''}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      onBack={onBack}
    />
  );
};