import React from 'react';
import ActionButton from '@/components/ui/action-button';
import BackButton from '@/components/ui/back-button';
import { SingleChoiceButton } from '@/components/ui/single-choice-button';
import { FieldErrors } from 'react-hook-form';
import { TrainingVariationData } from '@/types/post-registration';

interface VariationOption {
  value: string;
  label: string;
  emoji?: string;
  description?: string;
}

interface TrainingVariationPresenterProps {
  variationOptions: VariationOption[];
  selectedValue: string;
  errors: FieldErrors<TrainingVariationData>;
  onSelectOption: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const TrainingVariationPresenter: React.FC<TrainingVariationPresenterProps> = ({
  variationOptions,
  selectedValue,
  errors,
  onSelectOption,
  onSubmit,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
          Hvordan liker du å trene?
        </h3>
        <p className="text-sm text-gray-600">Velg det alternativet som passer best for deg</p>

        <div className="space-y-4">
          {variationOptions.map(option => (
            <SingleChoiceButton
              key={option.value}
              label={option.label}
              description={option.description}
              emoji={option.emoji}
              isSelected={selectedValue === option.value}
              onClick={() => onSelectOption(option.value)}
            />
          ))}
        </div>

        {errors.variationPreference && (
          <div className="flex items-center mt-2 ml-1">
            <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
            <p className="text-red-600 text-xs font-medium font-['Libre_Baskerville']">
              Vennligst velg ett alternativ
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <ActionButton 
          onClick={onSubmit}
          disabled={!selectedValue}
          className="mt-8"
        >
          Fortsett
        </ActionButton>
        <BackButton onClick={onBack} />
      </div>
    </div>
  );
};