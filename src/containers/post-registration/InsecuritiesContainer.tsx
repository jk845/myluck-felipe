import React from 'react';
import { useForm } from 'react-hook-form';
import { InsecuritiesPresenter } from '@/components/presenters/post-registration/InsecuritiesPresenter';
import { InsecuritiesData } from '@/types/post-registration';

interface InsecuritiesContainerProps {
  onNext: (data: InsecuritiesData) => void;
  onBack: () => void;
  initialData?: InsecuritiesData | null;
}

export const InsecuritiesContainer: React.FC<InsecuritiesContainerProps> = ({
  onNext,
  onBack,
  initialData
}) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<InsecuritiesData>({
    defaultValues: initialData || {
      insecurities: [],
    },
  });

  const watchedValues = watch();

  const toggleInsecurity = (insecurity: string) => {
    const currentInsecurities = watchedValues.insecurities || [];
    
    if (insecurity === "all") {
      if (currentInsecurities.includes("all")) {
        setValue("insecurities", []);
      } else {
        const allValues = insecurityOptions.map(opt => opt.value);
        setValue("insecurities", allValues);
      }
    } else {
      if (currentInsecurities.includes(insecurity)) {
        setValue("insecurities", currentInsecurities.filter(i => i !== insecurity && i !== "all"));
      } else {
        setValue("insecurities", [...currentInsecurities, insecurity]);
      }
    }
  };

  const onSubmit = (data: InsecuritiesData) => {
    onNext(data);
  };

  const insecurityOptions = [
    { value: "stomach", label: "Magen min", emoji: "🤰" },
    { value: "arms", label: "Armene mine", emoji: "💪" },
    { value: "thighs", label: "Lårene mine", emoji: "🦵" },
    { value: "back", label: "Ryggen min", emoji: "🔙" },
    { value: "neck", label: "Nakken min", emoji: "🦒" },
    { value: "calves", label: "Leggene mine", emoji: "🦵" },
    { value: "butt", label: "Rumpa mi", emoji: "🍑" },
    { value: "endurance", label: "Utholdenheten", emoji: "🏃" },
    { value: "general_health", label: "Min generelle helse", emoji: "❤️" },
    { value: "all", label: "Alt det ovenfor", emoji: "🎯" },
  ];

  return (
    <InsecuritiesPresenter
      insecurityOptions={insecurityOptions}
      selectedInsecurities={watchedValues.insecurities || []}
      errors={errors}
      onToggleInsecurity={toggleInsecurity}
      onSubmit={handleSubmit(onSubmit)}
      onBack={onBack}
    />
  );
};