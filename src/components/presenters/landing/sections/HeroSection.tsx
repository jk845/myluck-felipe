import React from 'react';
import BackgroundImage from '@/assets/mila_main.jpg';
import LeftQuote from '@/components/assets/icons/LeftQuote';
import GoogleIcon from '@/components/assets/icons/GoogleIcon';

interface HeroSectionProps {
  onStartRegistration: () => void;
  onLeadMagnet: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLeadMagnet
}) => {
  return (
    <>
      {/* Background Image with Overlay - вынесен из section */}
      <div className="absolute inset-0">
        <img
          src={BackgroundImage}
          alt="Mila Myluck"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="max-w-md w-full px-4 mx-auto flex flex-col items-center text-center">
          {/* Ratings Section */}
          <div className="mb-6 flex items-center gap-2">
            {/* Left Quote */}
            <LeftQuote
              className="w-8 h-auto"
              mode="dark"
            />

            <div className="flex flex-col items-center">
              <p className="text-white text-base font-semibold font-['Hind_Vadodara'] mb-2 leading-5 tracking-[-0.8px]">
                Hundrevis av 5-stjerners vurderinger
              </p>

              {/* Stars */}
              <div className="flex justify-center items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-orange-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Double Rating */}
              <div className="flex justify-center items-center gap-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-6" fill="white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="text-white text-sm font-semibold">4.8<span className="text-white/70 text-xs">/5</span></span>
                </div>

                <div className="flex items-center gap-2">
                  <GoogleIcon className="w-5 h-5" />
                  <span className="text-white text-sm font-semibold">4.7<span className="text-white/70 text-xs">/5</span></span>
                </div>
              </div>
            </div>

            {/* Right Quote */}
            <LeftQuote
              className="w-8 h-auto -scale-x-100"
              mode="dark"
            />
          </div>

          {/* Main Title */}
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold font-['Hind_Vadodara'] text-white mb-3 leading-[28px] sm:leading-[34px] md:leading-[40px] tracking-[-1.6px] sm:tracking-[-2px] md:tracking-[-2.4px]">
            Din transformasjon<br />venter
          </h1>

          {/* Subtitle */}
          <p className="text-white text-sm font-bold font-['Libre_Baskerville'] max-w-xs mb-8 leading-normal tracking-[-0.7px]">
            Abonner på Myluck for å få tilgang til appen, direktesendinger og Transformasjons-Marathons
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 w-full max-w-[280px]">
            <a
              href="https://myluck.no"
              className="w-full h-14 bg-white rounded-full flex justify-center items-center transition-all hover:scale-105 hover:shadow-2xl group"
            >
              <span className="text-black text-lg sm:text-xl font-semibold font-['Hind_Vadodara'] leading-5 tracking-[-0.9px] sm:tracking-[-1px] group-hover:text-purple-600 transition-colors">
                Få tilgang nå!
              </span>
            </a>

            <button
              onClick={onLeadMagnet}
              className="w-full h-14 rounded-full border-2 border-white backdrop-blur-md bg-white/10 flex justify-center items-center gap-3 transition-all hover:bg-white/20 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              <span className="text-white text-base sm:text-lg font-semibold font-['Hind_Vadodara'] leading-5 tracking-[-0.8px] sm:tracking-[-0.9px]">
                Spør meg på DM
              </span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};