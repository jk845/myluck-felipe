import React from 'react';

interface PainPointsSectionProps {
  onStartRegistration: () => void;
}

export const PainPointsSection: React.FC<PainPointsSectionProps> = ({
  onStartRegistration
}) => {
  const painPoints = [
    'Du har prøvd "alt" men ingenting fungerer lenge nok',
    "Du vet ikke hvordan du skal trene riktig for DIN kropp",
    "Du mangler tid, energi og motivasjon",
    "Du føler deg alene i reisen mot bedre helse"
  ];

  return (
    <section className="w-full min-h-screen bg-white flex items-center">
      <div className="max-w-md mx-auto px-4 py-16">

        <h2 className="text-3xl font-semibold font-['Hind_Vadodara'] text-black mb-6 leading-[23px] tracking-[-1.5px]">
          Kjenner du deg igjen? 🤔
        </h2>
        
        <div className="space-y-4 mb-10">
          {painPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-4">
              <span className="text-2xl mt-[-4px]">❌</span>
              <p className="text-sm font-['Libre_Baskerville'] text-gray-800 leading-normal tracking-[-0.7px]">
                {point}
              </p>
            </div>
          ))}
        </div>
        
        {/* Pink Card */}
        <div className="bg-pink-100 rounded-[30px] p-8 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-6xl">💜</div>
          <h3 className="text-[25px] font-semibold font-['Hind_Vadodara'] text-black mb-2 leading-[23px] tracking-[-1.25px]">
            Det er IKKE din feil!
          </h3>
          <p className="text-sm font-['Libre_Baskerville'] w-60 text-gray-800 leading-normal tracking-[-0.7px]">
            Du har bare ikke hatt riktig veiledning og støtte. Ennå.
          </p>
        </div>
                <button 
          className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex mt-4 justify-center items-center transition-all hover:scale-105 hover:shadow-lg"
          onClick={onStartRegistration}
        >
          <span className="text-white text-xl font-semibold font-['Hind_Vadodara']">
            Bli med i Myluck nå!
          </span>
        </button>
        

      </div>
    </section>
  );
};