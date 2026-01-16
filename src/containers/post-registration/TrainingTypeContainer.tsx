import React from 'react';
import { useForm } from 'react-hook-form';
import { TrainingTypePresenter } from '@/components/presenters/post-registration/TrainingTypePresenter';
import { TrainingTypeData } from '@/types/post-registration';

interface TrainingTypeContainerProps {
  onNext: (data: TrainingTypeData) => void;
  onBack: () => void;
  initialData?: TrainingTypeData | null;
}

export const TrainingTypeContainer: React.FC<TrainingTypeContainerProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TrainingTypeData>({
    defaultValues: initialData || {
      trainingType: [],
    },
  });

  const watchedValues = watch();

  const toggleTrainingType = (type: string) => {
    const currentTypes = watchedValues.trainingType || [];
    if (currentTypes.includes(type)) {
      setValue("trainingType", currentTypes.filter(t => t !== type));
    } else {
      setValue("trainingType", [...currentTypes, type]);
    }
  };

  const onSubmit = (data: TrainingTypeData) => {
    onNext(data);
  };

  const trainingOptions = [
    { value: "gym", label: "Trener på treningsenter", emoji: "🏋️" },
    { value: "home", label: "Trener hjemme", emoji: "🏠" },
    { value: "yoga_stretching", label: "Yoga eller stretching", emoji: "🧘‍♀️" },
    { value: "walk_run_flat", label: "Går/løper på flat bakke", emoji: "🚶‍♀️" },
    { value: "walk_run_forest", label: "Går/løper i skog og mark", emoji: "🌲" },
    { value: "other", label: "Annet", emoji: "✨" }
  ];

  return (
    <TrainingTypePresenter
      trainingOptions={trainingOptions}
      selectedTypes={watchedValues.trainingType || []}
      errors={errors}
      onToggleType={toggleTrainingType}
      onSubmit={handleSubmit(onSubmit)}
      onBack={onBack}
    />
  );
};