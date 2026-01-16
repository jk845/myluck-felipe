import React from 'react';
import LazyImage from '@/components/ui/lazy-image';
import Section2_1 from '@/assets/section_2_1.jpg';
import Section2_2 from '@/assets/section_2_2.jpg';
import Section2_3 from '@/assets/section_2_3.jpg';
import Section2_4 from '@/assets/section_2_4.jpg';
import Section2_5 from '@/assets/section_2_5.jpg';
import Section2_6 from '@/assets/section_2_6.jpg';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white w-full">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-semibold font-['Hind_Vadodara'] mb-5">
          Myluck-abonnementet er
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* 200+ treningsøkter */}
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <LazyImage
              src={Section2_1}
              alt="Treningsøkter"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <p className="text-white text-lg font-semibold font-['Hind_Vadodara'] leading-tight">
                200+ unike treningsøkter
              </p>
              <p className="text-white text-lg font-semibold font-['Hind_Vadodara'] text-right leading-tight">

                hjemme og treningssenter
              </p>
            </div>
          </div>

          {/* Mila som coach */}
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <LazyImage
              src={Section2_2}
              alt="Mila som coach"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center p-4">
              <p className="text-black text-lg font-semibold font-['Hind_Vadodara'] text-left leading-tight">
                Mila som en coach i lommen din
              </p>
            </div>
          </div>

          {/* Skreddersydd kostholdsplan */}
          <div className="relative aspect-square rounded-[30px] overflow-hidden">
            <LazyImage
              src={Section2_3}
              alt="Skreddersydd kostholdsplan"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <p className="text-white text-lg font-semibold font-['Hind_Vadodara'] text-center leading-tight">
                Skreddersydd kostholdsplan basert på dine mål.
              </p>
            </div>
          </div>

          {/* Nesten 300 oppskrifter */}
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <LazyImage
              src={Section2_4}
              alt="Oppskrifter"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-start justify-start p-4">
              <p className="text-black text-lg font-semibold font-['Hind_Vadodara'] leading-normal">
                Nesten 300 av Mila sine egene oppskrifter
              </p>
            </div>
          </div>

          {/* PMS Workout */}
          <div className="relative aspect-square rounded-[30px] overflow-hidden">
            <LazyImage
              src={Section2_5}
              alt="PMS Workout"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-start justify-start p-4">
              <p className="text-black text-lg font-semibold font-['Hind_Vadodara'] leading-normal">
                PMS Workout
              </p>
            </div>
          </div>

          {/* Facebook fellesskap */}
          <div className="relative aspect-square rounded-[30px] overflow-hidden">
            <LazyImage
              src={Section2_6}
              alt="Facebook fellesskap"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-white text-lg font-semibold font-['Hind_Vadodara'] text-center leading-tight">
                Tilgang til Facebook fellesskap
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};