import React from 'react';
import { useForm } from 'react-hook-form';
import { InnerCirclePresenter } from '@/components/presenters/post-registration/InnerCirclePresenter';

interface InnerCircleData {
  interestedInInnerCircle: string;
}

interface InnerCircleContainerProps {
  onNext: (data: InnerCircleData) => void;
  onBack: () => void;
  initialData?: InnerCircleData | null;
}

export const InnerCircleContainer: React.FC<InnerCircleContainerProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<InnerCircleData>({
    defaultValues: initialData || {
      interestedInInnerCircle: '',
    },
  });

  const watchedValues = watch();

  const setInterest = (interest: string) => {
    setValue("interestedInInnerCircle", interest);
  };

  const onSubmit = (data: InnerCircleData) => {
    onNext(data);
  };

  const innerCircleOptions = [
    { value: "yes", label: "Ja", emoji: "✅" },
    { value: "no", label: "Nei", emoji: "❌" },
  ];

  return (
    <InnerCirclePresenter
      innerCircleOptions={innerCircleOptions}
      selectedOption={watchedValues.interestedInInnerCircle || ''}
      errors={errors}
      onSelectOption={setInterest}
      onSubmit={handleSubmit(onSubmit)}
      onBack={onBack}
    />
  );
};