import React from 'react';
import { useForm } from 'react-hook-form';
import { TrainingVariationPresenter } from '@/components/presenters/post-registration/TrainingVariationPresenter';
import { TrainingVariationData } from '@/types/post-registration';

interface TrainingVariationContainerProps {
  onNext: (data: TrainingVariationData) => void;
  onBack: () => void;
  initialData?: TrainingVariationData | null;
}

export const TrainingVariationContainer: React.FC<TrainingVariationContainerProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TrainingVariationData>({
    defaultValues: initialData || {
      variationPreference: '',
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: TrainingVariationData) => {
    onNext(data);
  };

  const variationOptions = [
    {
      value: "variation",
      label: "Mye variasjon",
      description: "Nytt program hver dag",
      emoji: "🔄"
    },
    {
      value: "mastery",
      label: "Fokus på mestring",
      description: "Repetere for å bli bedre",
      emoji: "💪"
    }
  ];

  return (
    <TrainingVariationPresenter
      variationOptions={variationOptions}
      selectedValue={watchedValues.variationPreference}
      errors={errors}
      onSelectOption={(value: string) => setValue("variationPreference", value)}
      onSubmit={handleSubmit(onSubmit)}
      onBack={onBack}
    />
  );
};