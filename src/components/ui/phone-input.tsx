import React, { useState, useRef, useEffect } from "react";
import { getCountryByCode, popularCountries, formatPhoneNumber } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryChange: (code: string) => void;
  error?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  countryCode,
  onCountryChange,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(popularCountries);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedCountry = getCountryByCode(countryCode) || popularCountries[0];

  // Filter countries when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCountries(popularCountries);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredCountries(
        popularCountries.filter(
          country =>
            country.name.toLowerCase().includes(term) ||
            country.code.toLowerCase().includes(term) ||
            country.dialCode.includes(term)
        )
      );
    }
  }, [searchTerm]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format phone number on input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input, countryCode);
    onChange(formatted);
  };

  // Handle country selection
  const handleSelectCountry = (code: string) => {
    onCountryChange(code);
    setIsOpen(false);
    setSearchTerm("");
    // Focus the input field after selecting a country
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full" style={{ minHeight: '80px' }}>
      {/* Main input container */}
      <div
        className={`w-full rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
          error
            ? `border-red-300 bg-gray-50/50 ${isFocused ? 'ring-4 ring-red-50 bg-white' : ''}`
            : `bg-gray-50/50 ${isFocused ? 'border-fuchsia-300 ring-4 ring-fuchsia-50 bg-white' : 'border-gray-100'}`
        }`}
      >
        <div className="flex" ref={dropdownRef}>
          {/* Country selector */}
          <div
            className="h-20 pl-5 pr-3 flex items-center justify-center bg-gray-100/50 cursor-pointer hover:bg-gray-200/50 transition-colors duration-200 border-r border-gray-200"
            onClick={() => setIsOpen(!isOpen)}
            style={{ minWidth: '70px' }}
          >
            <span className="text-xl">{selectedCountry.flag}</span>

            <svg
              className={`ml-2 w-4 h-4 transition-transform text-gray-500 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Phone input field */}
          <div className="relative flex-1">
            <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none z-10">
              Telefon
            </label>
            <input
              ref={inputRef}
              type="tel"
              value={value}
              onChange={handlePhoneChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-20 px-5 pt-8 pb-3 focus:outline-none text-lg font-medium text-gray-900 placeholder:text-gray-400 bg-transparent"
              placeholder="12 34 56 78"
            />
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="absolute left-5 bottom-1 flex items-center">
          <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
          <p className="text-red-600 text-xs font-medium">{error}</p>
        </div>
      )}

      {/* Country dropdown */}
      {isOpen && (
        <div className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-auto left-0" style={{ width: '280px' }}>
          {/* Search field */}
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Søk land eller landskode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-black border-opacity-20 focus:border-fuchsia-300 focus:border-2 focus:outline-none"
              autoFocus
            />
          </div>

          {/* Country list */}
          <div className="py-1">
            {filteredCountries.map((country) => (
              <div
                key={country.code}
                className={`flex items-center px-4 py-2 hover:bg-fuchsia-50 cursor-pointer ${country.code === countryCode ? 'bg-fuchsia-100' : ''
                  }`}
                onClick={() => handleSelectCountry(country.code)}
              >
                <span className="mr-2 text-lg">{country.flag}</span>
                <span className="flex-1 text-sm">{country.name}</span>
                <span className="text-gray-500 text-sm">{country.dialCode}</span>
              </div>
            ))}

            {filteredCountries.length === 0 && (
              <div className="px-4 py-3 text-gray-500 text-center">
                Ingen land funnet
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;