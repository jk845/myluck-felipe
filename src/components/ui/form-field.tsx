import React, { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  suffix?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  suffix,
  ...props
}) => {
  return (
    <div className="relative">
      <label className="absolute left-0 px-6 top-2 text-xs text-black text-opacity-60 pointer-events-none">
        {label}
      </label>
      <input
        className="w-full h-14 px-6 pt-5 pb-1 rounded-xl border border-black border-opacity-20 focus:border-fuchsia-300 focus:border-2 focus:outline-none"
        {...props}
      />
      {suffix && (
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-black text-opacity-60">
          {suffix}
        </div>
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1 ml-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;