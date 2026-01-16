import React from 'react';
import ActionButton from '@/components/ui/action-button';
import { MultiSelectButton } from '@/components/ui/multi-select-button';
import BackButton from '@/components/ui/back-button';
import { FieldErrors } from 'react-hook-form';
import { TrainingTypeData } from '@/types/post-registration';

interface TrainingOption {
  value: string;
  label: string;
  emoji?: string;
  description?: string;
}

interface TrainingTypePresenterProps {
  trainingOptions: TrainingOption[];
  selectedTypes: string[];
  errors: FieldErrors<TrainingTypeData>;
  onToggleType: (type: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const TrainingTypePresenter: React.FC<TrainingTypePresenterProps> = ({
  trainingOptions,
  selectedTypes,
  errors,
  onToggleType,
  onSubmit,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
          Hva slags trening driver du med?
        </h3>
        <p className="text-sm text-gray-600">Du kan velge flere alternativer</p>
        
        <div className="space-y-4">
          {trainingOptions.map(option => (
            <MultiSelectButton
              key={option.value}
              label={option.label}
              emoji={option.emoji}
              isSelected={selectedTypes.includes(option.value)}
              onClick={() => onToggleType(option.value)}
            />
          ))}
        </div>
        
        {errors.trainingType && (
          <div className="flex items-center mt-2 ml-1">
            <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
            <p className="text-red-600 text-xs font-medium font-['Libre_Baskerville']">
              Vennligst velg minst ett alternativ
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <ActionButton 
          onClick={onSubmit}
          disabled={selectedTypes.length === 0}
          className="mt-8"
        >
          Fortsett
        </ActionButton>
        <BackButton onClick={onBack} />
      </div>
    </div>
  );
};