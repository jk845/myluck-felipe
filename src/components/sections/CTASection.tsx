import React from 'react';

interface CTASectionProps {
  onStartRegistration: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onStartRegistration }) => {
  return (
    <section className="py-12 px-4 bg-white w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl font-semibold font-['Hind_Vadodara'] mb-5">
            Bli med i Myluck
          </h2>
          
          <div className="w-full max-w-md bg-neutral-100 rounded-3xl overflow-hidden shadow-lg">
            {/* Subscription header */}
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div className="text-start">
                  <h3 className="text-black text-lg font-semibold font-['Hind_Vadodara']">
                    Myluck-abonnement
                  </h3>
                  <p className="text-black text-opacity-60 text-xs font-['Libre_Baskerville']">
                    19,66 kr per dag
                  </p>
                </div>
                <p className="text-black text-lg font-semibold font-['Hind_Vadodara']">
                  590 kr
                </p>
              </div>
            </div>
            
            <hr className="border-black border-opacity-30 mx-6" />
            
            {/* Subscription benefits */}
            <div className="p-6 space-y-6">
              {/* Meal plan */}
              <div className="space-y-1 text-start">
                <div className="flex justify-between items-center">
                  <h4 className="text-black text-base font-semibold font-['Hind_Vadodara']">
                    Daglig kostholdsplan i appen
                  </h4>
                  <div className="flex items-center">
                    <span className="text-black text-base font-semibold font-['Hind_Vadodara'] mr-2">
                      Gratis
                    </span>
                    <span className="text-black text-opacity-60 text-base line-through font-['Hind_Vadodara']">
                      740 kr
                    </span>
                  </div>
                </div>
                <p className="text-black text-opacity-60 text-xs font-['Libre_Baskerville']">
                  Kalorier og makroer tilpasset deg
                </p>
              </div>
              
              {/* Workout program */}
              <div className="space-y-1 text-start">
                <div className="flex justify-between items-center">
                  <h4 className="text-black text-base font-semibold font-['Hind_Vadodara']">
                    Treningsprogram for hjemme og gym
                  </h4>
                  <div className="flex items-center">
                    <span className="text-black text-base font-semibold font-['Hind_Vadodara'] mr-2">
                      Gratis
                    </span>
                    <span className="text-black text-opacity-60 text-base line-through font-['Hind_Vadodara']">
                      690 kr
                    </span>
                  </div>
                </div>
                <p className="text-black text-opacity-60 text-xs font-['Libre_Baskerville']">
                  Enkle treningsøkter i kalenderen din
                </p>
              </div>
              
              {/* Marathons */}
              <div className="space-y-1 text-start">
                <div className="flex justify-between items-center">
                  <h4 className="text-black text-base font-semibold font-['Hind_Vadodara']">
                    Tilgang til Myluck Marathoner
                  </h4>
                  <div className="flex items-center">
                    <span className="text-black text-base font-semibold font-['Hind_Vadodara'] mr-2">
                      Gratis
                    </span>
                    <span className="text-black text-opacity-60 text-base line-through font-['Hind_Vadodara']">
                      2890 kr
                    </span>
                  </div>
                </div>
                <p className="text-black text-opacity-60 text-xs font-['Libre_Baskerville']">
                  Transformasjons-marathoner om ulike temaer
                </p>
              </div>
              
              {/* Livestreams */}
              <div className="space-y-1 text-start">
                <div className="flex justify-between items-center">
                  <h4 className="text-black text-base font-semibold font-['Hind_Vadodara']">
                    Direktesendinger med Mila
                  </h4>
                  <div className="flex items-center">
                    <span className="text-black text-base font-semibold font-['Hind_Vadodara'] mr-2">
                      Gratis
                    </span>
                    <span className="text-black text-opacity-60 text-base line-through font-['Hind_Vadodara']">
                      540 kr
                    </span>
                  </div>
                </div>
                <p className="text-black text-opacity-60 text-xs font-['Libre_Baskerville']">
                  Marathon direktesendinger og Q&A med Mila
                </p>
              </div>
            </div>
            
            <hr className="border-black border-opacity-30 mx-6" />
            
            {/* Total section */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-black text-base font-semibold font-['Hind_Vadodara']">
                  Totalt
                </h3>
                <p className="text-black text-base font-semibold font-['Hind_Vadodara']">
                  590 kr
                </p>
              </div>
              
              {/* CTA button */}
              <button 
                onClick={onStartRegistration}
                className="w-full py-3 px-6 bg-fuchsia-100 text-black font-semibold text-xl rounded-full font-['Hind_Vadodara'] hover:bg-fuchsia-200 transition-colors duration-300 mb-4"
              >
                Bli med i Myluck nå!
              </button>
              
              {/* Disclaimer */}
              <div className="flex justify-center items-center text-sm text-black text-opacity-60 font-['Hind_Vadodara']">
                <div className="w-2 h-2 bg-black bg-opacity-30 rounded-full mr-2"></div>
                <p>Avbestill når som helst</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
export { CTASection };