import React from "react";
import { cn } from "@/lib/utils";

interface MobileFormErrorProps {
  errors: {
    weight?: { message?: string };
    height?: { message?: string };
    age?: { message?: string };
  };
  className?: string;
}

export const MobileFormError: React.FC<MobileFormErrorProps> = ({ errors, className }) => {
  const hasErrors = errors.weight || errors.height || errors.age;
  
  if (!hasErrors) return null;
  
  return (
    <div 
      className={cn(
        "bg-red-50 border border-red-200 rounded-xl p-3 mb-4",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="text-sm font-medium text-red-800 mb-1">
        Vennligst rett følgende:
      </div>
      <ul className="text-xs text-red-700 space-y-1">
        {errors.weight && (
          <li className="flex items-start">
            <span className="mr-1">•</span>
            <span>{errors.weight.message}</span>
          </li>
        )}
        {errors.height && (
          <li className="flex items-start">
            <span className="mr-1">•</span>
            <span>{errors.height.message}</span>
          </li>
        )}
        {errors.age && (
          <li className="flex items-start">
            <span className="mr-1">•</span>
            <span>{errors.age.message}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileFormError;