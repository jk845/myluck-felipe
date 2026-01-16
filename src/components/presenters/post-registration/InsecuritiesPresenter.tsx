import React from 'react';
import ActionButton from '@/components/ui/action-button';
import BackButton from '@/components/ui/back-button';
import { MultiChoiceButton } from '@/components/ui/multi-choice-button';
import { FieldErrors } from 'react-hook-form';
import { InsecuritiesData } from '@/types/post-registration';

interface InsecurityOption {
  value: string;
  label: string;
  emoji?: string;
}

interface InsecuritiesPresenterProps {
  insecurityOptions: InsecurityOption[];
  selectedInsecurities: string[];
  errors: FieldErrors<InsecuritiesData>;
  onToggleInsecurity: (insecurity: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const InsecuritiesPresenter: React.FC<InsecuritiesPresenterProps> = ({
  insecurityOptions,
  selectedInsecurities,
  errors,
  onToggleInsecurity,
  onSubmit,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
          Hva er din største usikkerhet akkurat nå?
        </h3>
        <p className="text-sm text-gray-600">Du kan velge flere alternativer</p>

        <div className="space-y-4">
          {insecurityOptions.map(option => (
            <MultiChoiceButton
              key={option.value}
              label={option.label}
              emoji={option.emoji}
              emojiPosition="right"
              isSelected={selectedInsecurities.includes(option.value)}
              onClick={() => onToggleInsecurity(option.value)}
            />
          ))}
        </div>
        
        {errors.insecurities && (
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
          disabled={selectedInsecurities.length === 0}
          className="mt-8"
        >
          Fortsett
        </ActionButton>
        
        <BackButton onClick={onBack} />
      </div>
    </div>
  );
};