import React from 'react';
import ActionButton from '@/components/ui/action-button';
import BackButton from '@/components/ui/back-button';
import { SingleChoiceButton } from '@/components/ui/single-choice-button';
import { FieldErrors } from 'react-hook-form';
import { TrainingConfidenceData } from '@/types/post-registration';

interface ConfidenceOption {
  value: string;
  label: string;
  emoji?: string;
}

interface ExerciseConfidencePresenterProps {
  confidenceOptions: ConfidenceOption[];
  selectedConfidence: string;
  errors: FieldErrors<TrainingConfidenceData>;
  onSelectConfidence: (confidence: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const ExerciseConfidencePresenter: React.FC<ExerciseConfidencePresenterProps> = ({
  confidenceOptions,
  selectedConfidence,
  errors,
  onSelectConfidence,
  onSubmit,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
          Hvor trygg er du på øvelsene og treningen du gjør?
        </h3>
        <p className="text-sm text-gray-600">Velg det alternativet som passer best for deg</p>

        <div className="space-y-4">
          {confidenceOptions.map(option => (
            <SingleChoiceButton
              key={option.value}
              label={option.label}
              emoji={option.emoji}
              isSelected={selectedConfidence === option.value}
              onClick={() => onSelectConfidence(option.value)}
            />
          ))}
        </div>
        
        {errors.trainingConfidence && (
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
          disabled={!selectedConfidence}
          className="mt-8"
        >
          Fortsett
        </ActionButton>
        
        <BackButton onClick={onBack} />
      </div>
    </div>
  );
};