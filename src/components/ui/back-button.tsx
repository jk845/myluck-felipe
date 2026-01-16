import React from 'react';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-8 w-12 h-12 rounded-full bg-[#f5f5f7] hover:bg-neutral-200 flex items-center justify-center transition-all duration-200 hover:shadow-md ${className}`}
      aria-label="Gå tilbake"
    >
      <svg
        className="w-5 h-5 text-black"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export default BackButton;