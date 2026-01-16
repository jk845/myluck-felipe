import React from 'react';
import LazyImage from '@/components/ui/lazy-image';
import Photo2 from '@/assets/girl_success_2.jpg';

const SubscriptionSection: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white w-full">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-semibold font-['Hind_Vadodara'] mb-5">
          Myluck-abonnementet er
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black bg-opacity-30 rounded-3xl p-4 flex items-center justify-center aspect-square">
            <div className="text-center text-white text-lg md:text-xl font-semibold font-['Hind_Vadodara'] leading-tight">
              200+ unike<br />
              treningsøkter<br />
              hjemme & gym
            </div>
          </div>

          <div className="bg-neutral-100 rounded-3xl p-4 flex flex-col items-center justify-center aspect-square relative">
            <div className="text-center text-black text-lg md:text-xl font-semibold font-['Hind_Vadodara'] leading-tight">
              Mila som en coach<br />
              i lommen din
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden aspect-square relative">
            <LazyImage
              className="w-full h-full object-cover"
              src={Photo2}
              alt="Skreddersydd kostholdsplan"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center text-white text-lg md:text-xl font-semibold font-['Hind_Vadodara'] leading-tight drop-shadow-lg">
                Skreddersydd<br />
                kostholdsplan basert<br />
                på dine mål
              </div>
            </div>
          </div>

          <div className="bg-neutral-100 rounded-3xl p-4 flex items-center justify-center aspect-square">
            <div className="text-center text-black text-lg md:text-xl font-semibold font-['Hind_Vadodara'] leading-tight">
              Nesten 300 oppskrifter<br />
              fra Mila
            </div>
          </div>

          <div className="bg-pink-100 rounded-3xl p-4 flex items-center justify-center aspect-square">
            <div className="text-center text-black text-lg md:text-xl font-semibold font-['Hind_Vadodara'] leading-tight">
              Direktesendinger<br />
              og Q&A med Mila
            </div>
          </div>

          <div className="bg-black bg-opacity-20 rounded-3xl p-4 flex flex-col items-center justify-center aspect-square relative">
            <div className="text-center text-white text-lg md:text-xl font-semibold font-['Hind_Vadodara'] leading-tight">
              Tilgang til<br />
              Facebook-gruppe
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
export { SubscriptionSection };