import React from 'react';
import MyluckLogo from '@/components/assets/icons/MyluckLogo';

interface NavbarProps {
  mode: 'dark' | 'light';
}

const Navbar: React.FC<NavbarProps> = ({ mode }) => {
  const isDarkMode = mode === 'dark';

  const handleStartRegistration = () => {
    window.location.href = 'https://myluck.no';
  };

  return (
    <header className={`
      fixed top-0 left-0 w-full z-50
      transition-all duration-500 ease-in-out
      ${isDarkMode ? 'bg-white/[0.01]' : 'bg-black/[0.01]'}
      backdrop-blur-[10px]
    `}>
      <div className="flex items-center justify-between px-4 py-3 transition-colors duration-500 ease-in-out">
        <div className="flex items-center gap-2">
          <MyluckLogo
            color={isDarkMode ? 'white' : 'black'}
            className="h-6 w-auto transition-colors duration-500 ease-in-out"
          />
        </div>

        <button
          onClick={handleStartRegistration}
          className={`
            rounded-full backdrop-blur-xl justify-center items-center gap-1.5 inline-flex
            transition-all duration-200 ease-in-out hover:scale-105
            mr-2 py-2 px-4
            ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'}
          `}
        >
          <span className="text-xs font-semibold font-['Hind_Vadodara'] leading-tight">
            Kjøp abonnement
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
export { Navbar };