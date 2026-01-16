import React from "react";

interface CopyFieldProps {
  value: string;
  label: string;
  onCopy: (text: string) => void;
}

export const CopyField: React.FC<CopyFieldProps> = ({
  value,
  label,
  onCopy
}) => {
  return (
    <div className="flex">
      {/* Icon column (fixed width) */}
      <div
        className="cursor-pointer flex-shrink-0 w-10 h-10 bg-black bg-opacity-5 rounded-md flex items-center justify-center mr-3 self-start mt-1"
        onClick={() => onCopy(value)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3146 1.25C17.2131 1.25 18.7521 2.78903 18.7521 4.6875V10.3125C18.7521 12.211 17.2131 13.75 15.3146 13.75H13.7513L13.7521 15.3125C13.7521 17.211 12.2131 18.75 10.3146 18.75H4.6875C2.78903 18.75 1.25 17.211 1.25 15.3125V9.6875C1.25 7.78902 2.78903 6.25 4.6875 6.25H6.25V4.6875C6.25 2.78903 7.78902 1.25 9.6875 1.25H15.3146ZM6.25 8.125H4.6875C3.82455 8.125 3.125 8.82455 3.125 9.6875V15.3125C3.125 16.1755 3.82455 16.875 4.6875 16.875H10.3146C11.1776 16.875 11.8771 16.1755 11.8771 15.3125V15L11.8763 11.875L11.8771 9.6875C11.8771 8.82455 11.1776 8.125 10.3146 8.125H8.32771H6.25ZM15.3146 3.125H9.6875C8.82455 3.125 8.125 3.82455 8.125 4.6875V6.25H10.3146C12.2131 6.25 13.7521 7.78902 13.7521 9.6875L13.7513 11.875H15.3146C16.1776 11.875 16.8771 11.1755 16.8771 10.3125V4.6875C16.8771 3.82455 16.1776 3.125 15.3146 3.125Z"
            fill="black"
          />
        </svg>
      </div>

      {/* Data column (stretches) */}
      <div className="flex-1 min-w-0">

        {/* Label */}
        <div className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville']">
          {label}
        </div>

        {/* Value with overflow handling */}
        <div className="text-black text-sm font-semibold font-['Hind_Vadodara'] break-words">
          {value}
        </div>

      </div>
    </div>
  );
};

export default CopyField;