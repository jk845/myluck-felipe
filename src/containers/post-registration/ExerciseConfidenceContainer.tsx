import React from 'react';
import { useForm } from 'react-hook-form';
import { ExerciseConfidencePresenter } from '@/components/presenters/post-registration/ExerciseConfidencePresenter';
import { TrainingConfidenceData } from '@/types/post-registration';

interface ExerciseConfidenceContainerProps {
  onNext: (data: TrainingConfidenceData) => void;
  onBack: () => void;
  initialData?: TrainingConfidenceData | null;
}

export const ExerciseConfidenceContainer: React.FC<ExerciseConfidenceContainerProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TrainingConfidenceData>({
    defaultValues: initialData || {
      trainingConfidence: '',
    },
  });

  const watchedValues = watch();

  const setConfidence = (confidence: string) => {
    setValue("trainingConfidence", confidence);
  };

  const onSubmit = (data: TrainingConfidenceData) => {
    onNext(data);
  };

  const confidenceOptions = [
    { value: "very_well", label: "Jeg håndterer trening og øvelser veldig godt", emoji: "💪" },
    { value: "quite_well", label: "Jeg klarer meg ganske bra, men utvikler meg fortsatt", emoji: "🏋️" },
    { value: "middle", label: "Jeg er litt midt i mellom", emoji: "🤸" },
    { value: "new", label: "Jeg er ny på trening", emoji: "🌱" },
  ];

  return (
    <ExerciseConfidencePresenter
      confidenceOptions={confidenceOptions}
      selectedConfidence={watchedValues.trainingConfidence || ''}
      errors={errors}
      onSelectConfidence={setConfidence}
      onSubmit={handleSubmit(onSubmit)}
      onBack={onBack}
    />
  );
};