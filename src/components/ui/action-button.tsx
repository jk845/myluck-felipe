import React, { useState } from "react";

interface ActionButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  isLoading = false,
  disabled = false,
  className = "",
  type = "button"
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Handle the click event
  const handleClick = () => {
    if (onClick && !isLoading && !disabled) {
      onClick();
    }
  };

  // Determine styles based on state
  const getStyles = () => {
    if (disabled) {
      return "bg-[#fbdcfb]/50 text-black/60 cursor-not-allowed outline-none border-none";
    }

    if (isLoading) {
      return "bg-[#fbdcfb]/50 text-black/60 cursor-wait outline-none border-none";
    }

    if (isPressed) {
      return "bg-black text-[#fbdcfb] outline outline-2 outline-offset-[-1px] outline-black";
    }

    return "bg-[#fbdcfb] text-black outline outline-2 outline-offset-[-1px] outline-black hover:bg-[#f9c9f9]";
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isLoading || disabled}
      onMouseDown={() => !disabled && !isLoading && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        w-full h-[55px] rounded-[100px] text-xl font-semibold font-['Hind_Vadodara'] leading-tight
        transition-all duration-150 relative
        backdrop-blur-[15px]
        ${getStyles()}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <span className="opacity-0">{children}</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-6 w-6 text-black/40"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </>
      ) : (
        <div className="inline-flex justify-center items-center gap-[7px]">
          {children}
        </div>
      )}
    </button>
  );
};

export default ActionButton;