import React from 'react';
import ActionButton from '@/components/ui/action-button';
import BackButton from '@/components/ui/back-button';
import { SingleChoiceButton } from '@/components/ui/single-choice-button';
import { FieldErrors } from 'react-hook-form';

interface InnerCircleOption {
  value: string;
  label: string;
  emoji?: string;
}

interface InnerCirclePresenterProps {
  innerCircleOptions: InnerCircleOption[];
  selectedOption: string;
  errors: FieldErrors<{ interestedInInnerCircle: string }>;
  onSelectOption: (option: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const InnerCirclePresenter: React.FC<InnerCirclePresenterProps> = ({
  innerCircleOptions,
  selectedOption,
  errors,
  onSelectOption,
  onSubmit,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
          Hvis jeg får flere Inner Circle-plasser hvor du kan ha 1-1 med meg og oppfølging som om jeg var din PT, vil du at jeg kontakter deg slik at du kan melde deg på?
        </h3>
        <p className="text-sm text-gray-600">Velg ett alternativ</p>

        <div className="space-y-4">
          {innerCircleOptions.map(option => (
            <SingleChoiceButton
              key={option.value}
              label={option.label}
              emoji={option.emoji}
              isSelected={selectedOption === option.value}
              onClick={() => onSelectOption(option.value)}
            />
          ))}
        </div>
        
        {errors.interestedInInnerCircle && (
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
          disabled={!selectedOption}
          className="mt-8"
        >
          Fortsett
        </ActionButton>
        
        <BackButton onClick={onBack} />
      </div>
    </div>
  );
};