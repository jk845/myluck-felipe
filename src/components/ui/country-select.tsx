import React, { useState, useRef, useEffect } from "react";
import { Country, popularCountries } from "@/lib/utils";

interface CountrySelectProps {
  value: string;
  onChange: (countryCode: string) => void;
  onClose?: () => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(popularCountries);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Находим выбранную страну по коду
  const selectedCountry = popularCountries.find(country => country.code === value) || popularCountries[0];

  // Фильтруем страны при изменении поискового запроса
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCountries(popularCountries);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredCountries(
        popularCountries.filter(
          country =>
            country.name.toLowerCase().includes(term) ||
            country.code.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm]);

  // Обработчик клика вне компонента для закрытия выпадающего списка
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Обработчик выбора страны
  const handleSelectCountry = (country: Country) => {
    onChange(country.code);
    setIsOpen(false);
    setSearchTerm("");
    setIsFocused(false);
    if (onClose) onClose();
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsFocused(!isOpen); // Установка фокуса при открытии дропдауна
  };

  return (
    <div className="relative w-full">
      {/* Outer container with stable dimensions */}
      <div className="w-full" style={{ padding: '1px' }}>
        {/* Position wrapper for margin compensation */}
        <div style={{
          margin: isFocused ? '-1px' : '0',
          position: 'relative'
        }} ref={dropdownRef}>
          {/* Main container with changing border */}
          <div
            className={`w-full rounded-2xl overflow-hidden transition-all duration-300 ${isFocused
              ? "border-2 border-fuchsia-300 bg-white ring-4 ring-fuchsia-50"
              : "border-2 border-gray-100 bg-gray-50/50"
              }`}
            style={{ boxSizing: 'border-box' }}
          >
            {/* Выбранная страна (когда выпадающий список закрыт) */}
            <div
              className="relative w-full h-20 px-5 flex items-center cursor-pointer hover:bg-white/70 transition-colors duration-200"
              onClick={handleToggleDropdown}
            >
              <div className="flex flex-col justify-center w-full">
                <label className="text-xs font-medium text-gray-600 mb-1">
                  Land
                </label>
                <div className="flex items-center">
                  <span className="mr-3 text-xl">{selectedCountry.flag}</span>
                  <span className="text-lg font-medium text-gray-900">{selectedCountry.name}</span>
                </div>
              </div>

              {/* Индикатор выпадающего списка */}
              <svg
                className={`ml-auto w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Выпадающий список стран */}
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-auto">
          {/* Поле поиска */}
          <div className="p-3 border-b">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Søk land eller landskode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-10 pr-3 py-2 rounded-lg border border-black border-opacity-20 focus:border-fuchsia-300 focus:border-2 focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Список стран */}
          <div className="py-1">
            {filteredCountries.map((country) => (
              <div
                key={country.code}
                className={`flex items-center px-4 py-3 hover:bg-fuchsia-50 cursor-pointer transition-colors ${country.code === value ? 'bg-fuchsia-100' : ''
                  }`}
                onClick={() => handleSelectCountry(country)}
              >
                <span className="mr-3 text-lg">{country.flag}</span>
                <span className="flex-1 text-sm font-medium">{country.name}</span>
                <span className="text-gray-500 text-sm">{country.dialCode}</span>
              </div>
            ))}

            {filteredCountries.length === 0 && (
              <div className="px-4 py-4 text-gray-500 text-center">
                Ingen land funnet
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;