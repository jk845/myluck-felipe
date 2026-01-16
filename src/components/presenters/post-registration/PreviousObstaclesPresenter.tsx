import React from 'react';
import ActionButton from '@/components/ui/action-button';
import BackButton from '@/components/ui/back-button';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface PreviousObstaclesData {
  previousObstacles: string;
}

interface PreviousObstaclesPresenterProps {
  register: UseFormRegister<PreviousObstaclesData>;
  obstacles: string;
  errors: FieldErrors<PreviousObstaclesData>;
  onSubmit: () => void;
  onBack: () => void;
}

export const PreviousObstaclesPresenter: React.FC<PreviousObstaclesPresenterProps> = ({
  register,
  obstacles,
  errors,
  onSubmit,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
          Hva er hovedgrunnen til at du ikke har nådd målene dine tidligere? 📝
        </h3>
        <p className="text-sm text-gray-600">Del din historie med oss</p>

        <div className="space-y-4">
          <div className="relative">
            <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none">
              Din historie
            </label>
            <textarea
              {...register('previousObstacles', { 
                required: 'Dette feltet er påkrevd',
                validate: value => value.trim().length > 0 || 'Dette feltet er påkrevd'
              })}
              placeholder="Skriv din historie her..."
              className="w-full h-32 px-5 pt-8 pb-3 rounded-2xl border-2 border-gray-100 bg-gray-50/50 focus:border-fuchsia-300 focus:bg-white focus:ring-4 focus:ring-fuchsia-50 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 resize-none"
            />
          </div>
          
          {errors.previousObstacles && (
            <div className="flex items-center mt-2 ml-1">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium font-['Libre_Baskerville']">
                {errors.previousObstacles.message}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <ActionButton 
          onClick={onSubmit}
          disabled={!obstacles.trim()}
          className="mt-8"
        >
          Fortsett
        </ActionButton>
        
        <BackButton onClick={onBack} />
      </div>
    </div>
  );
};