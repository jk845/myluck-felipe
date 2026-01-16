import React from 'react';
import { useForm } from 'react-hook-form';
import { MentalityFocusPresenter } from '@/components/presenters/post-registration/MentalityFocusPresenter';

interface MentalityFocusData {
  mentalityFocus: string;
}

interface MentalityFocusContainerProps {
  onNext: (data: MentalityFocusData) => void;
  onBack: () => void;
  initialData?: MentalityFocusData | null;
}

export const MentalityFocusContainer: React.FC<MentalityFocusContainerProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<MentalityFocusData>({
    defaultValues: initialData || {
      mentalityFocus: '',
    },
  });

  const watchedValues = watch();

  const setMentalityFocus = (focus: string) => {
    setValue("mentalityFocus", focus);
  };

  const onSubmit = (data: MentalityFocusData) => {
    onNext(data);
  };

  const mentalityOptions = [
    { value: "very_large", label: "En veldig stor del", emoji: "🧠" },
    { value: "somewhat", label: "Det har vært noe involvert", emoji: "🤔" },
    { value: "not_much", label: "Ikke mye", emoji: "😐" },
    { value: "nothing", label: "Ingenting", emoji: "🚫" },
    { value: "not_thought", label: "Jeg har ikke tenkt på det før", emoji: "💭" },
  ];

  return (
    <MentalityFocusPresenter
      mentalityOptions={mentalityOptions}
      selectedMentality={watchedValues.mentalityFocus || ''}
      errors={errors}
      onSelectMentality={setMentalityFocus}
      onSubmit={handleSubmit(onSubmit)}
      onBack={onBack}
    />
  );
};