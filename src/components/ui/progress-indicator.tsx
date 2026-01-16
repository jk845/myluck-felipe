import React from "react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps
}) => {
  // Validate inputs and add logging for debugging
  const validCurrentStep = Math.max(0, Math.min(currentStep, totalSteps));
  const validTotalSteps = Math.max(1, totalSteps);
  
  // Log if there's a mismatch (only in development)
  if (process.env.NODE_ENV === 'development' && currentStep !== validCurrentStep) {
    console.warn('[ProgressIndicator] currentStep out of bounds:', {
      currentStep,
      totalSteps,
      correctedTo: validCurrentStep
    });
  }
  
  // Calculate width percentage with validated values
  const widthPercentage = `${(validCurrentStep / validTotalSteps) * 100}%`;

  return (
    <div className="flex justify-center">
      <div className="mb-8 w-[75%]">
        <div className="relative h-2 bg-black/10 rounded-full mb-2">
          <div
            className="absolute top-0 left-0 h-2 bg-[#E4A3F6] rounded-full transition-all duration-300"
            style={{ width: widthPercentage }}
          ></div>
        </div>
        <p
          className="text-center text-black/60 tracking-tighter text-xs font-normal font-['Libre_Baskerville'] transition-opacity duration-300"
          key={validCurrentStep}
        >
          {validCurrentStep} av {validTotalSteps}
        </p>
      </div>
    </div>

  );
};

export default ProgressIndicator;