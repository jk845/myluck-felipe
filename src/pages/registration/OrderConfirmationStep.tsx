import { useState, useRef, useEffect } from "react";
import LazyImage from "@/components/ui/lazy-image";
import { Lock } from 'lucide-react';

// Import assets
import Photo1 from '@/assets/girl_success_1.jpg';
import Photo2 from '@/assets/girl_success_2.jpg';
import Photo3 from '@/assets/girl_success_3.jpg';
import Photo4 from '@/assets/girl_success_4.jpg';
import Photo5 from '@/assets/girl_success_5.jpg';

interface OrderConfirmationStepProps {
  onSubmit: (paymentMethod?: 'monthly' | 'upfront') => void;
  subscriptionInfo: {
    name: string;
    price: string;
    subscription: string;
  };
  isLoading: boolean;
}

const OrderConfirmationStep: React.FC<OrderConfirmationStepProps> = ({
  onSubmit,
  subscriptionInfo,
  isLoading,
}) => {
  const [showBottomBar, setShowBottomBar] = useState(false);
  const topCtaRef = useRef<HTMLButtonElement>(null);

  const subscriptionMonths = subscriptionInfo.subscription.includes('12') ? 12 :
    subscriptionInfo.subscription.includes('6') ? 6 : 1;

  // Setup intersection observer for sticky bottom bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bottom bar when top CTA button is not visible
        setShowBottomBar(entry.intersectionRatio < 0.9);
      },
      {
        threshold: [0.9],
        rootMargin: '0px'
      }
    );

    if (topCtaRef.current) {
      observer.observe(topCtaRef.current);
    }

    return () => {
      if (topCtaRef.current) {
        observer.unobserve(topCtaRef.current);
      }
    };
  }, []);

  // Handle submit
  const handleSubmit = () => {
    onSubmit(subscriptionMonths > 1 ? 'monthly' : undefined);
  };

  return (
    <div className="pb-32">
      {/* Before/After Results Section */}
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold font-['Hind_Vadodara'] text-center mb-2 tracking-tighter">
          Dette kan bli deg om bare få måneder! 🌟
        </h2>
        <p className="text-center text-black/60 text-sm font-['Libre_Baskerville'] mb-8">
          Se transformasjonene til kvinner akkurat som deg
        </p>

        {/* Hero transformation */}
        <div className="mb-12">
          <div className="mb-6">
            <div className="text-center mb-4">
              <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                Mila's egen transformasjon
              </span>
            </div>
            <h3 className="text-xl font-semibold font-['Hind_Vadodara'] text-center mb-4 tracking-tighter">
              Som mor til 2 fant jeg tilbake til meg selv og min styrke
            </h3>
            <div className="overflow-hidden rounded-3xl">
              <LazyImage src={Photo1} alt="Mila's transformation" className="w-full shadow-lg" />
            </div>
            <p className="text-center mt-4 text-black/70 text-sm font-['Libre_Baskerville'] italic">
              "Jeg har vært der du er nå. La meg vise deg veien."
            </p>
          </div>
        </div>

        {/* Success stories grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-6 tracking-tighter">
            Hundrevis av kvinner har allerede lykkes 💪
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="relative group">
              <div className="absolute top-2 left-2 z-10">
                <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full shadow-lg">
                  Før/Etter ✨
                </span>
              </div>
              <LazyImage src={Photo2} alt="Transformasjon" className="rounded-2xl shadow-md transition-transform group-hover:scale-105" />
            </div>

            <div className="relative group">
              <div className="absolute top-2 left-2 z-10">
                <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full shadow-lg">
                  Resultat 🌟
                </span>
              </div>
              <LazyImage src={Photo3} alt="Transformasjon" className="rounded-2xl shadow-md transition-transform group-hover:scale-105" />
            </div>

            <div className="relative group">
              <div className="absolute top-2 left-2 z-10">
                <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full shadow-lg">
                  Suksess 💪
                </span>
              </div>
              <LazyImage src={Photo4} alt="Transformasjon" className="rounded-2xl shadow-md transition-transform group-hover:scale-105" />
            </div>

            <div className="relative group">
              <div className="absolute top-2 left-2 z-10">
                <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full shadow-lg">
                  Målnådd 🎯
                </span>
              </div>
              <LazyImage src={Photo5} alt="Transformasjon" className="rounded-2xl shadow-md transition-transform group-hover:scale-105" />
            </div>
          </div>

          {/* Testimonial quotes */}
          <div className="space-y-4 mb-8">
            <div className="bg-purple-50 p-4 rounded-2xl">
              <p className="text-sm font-['Libre_Baskerville'] italic text-black/80">
                "Endelig et program som forstår mammalivet! Gikk ned 2 klesstørrelser mens jeg ammet."
              </p>
              <p className="text-xs font-semibold mt-2 text-purple-600">- Sarah, 32 år</p>
            </div>

            <div className="bg-pink-50 p-4 rounded-2xl">
              <p className="text-sm font-['Libre_Baskerville'] italic text-black/80">
                "Treningene tar bare 20 min og jeg ser resultater! Perfekt for en travel mamma."
              </p>
              <p className="text-xs font-semibold mt-2 text-pink-600">- Emma, 28 år</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8">
        <button
          ref={topCtaRef}
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full rounded-full bg-[#fbdcfb] text-zinc-900 border-2 border-zinc-900 px-6 py-2 text-sm font-semibold transition-all hover:bg-rose-200 shadow-lg disabled:opacity-50 flex flex-col items-center justify-center"
        >
          <span>{isLoading ? 'Behandler...' : 'Jeg vil også få resultater! 🚀'}</span>
          <span className="text-[10px] font-normal opacity-70">Bekreft bestilling og betal</span>
        </button>
      </div>

      {/* Sticky Bottom Payment Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-20 transform ${showBottomBar ? 'translate-y-0' : 'translate-y-full pointer-events-none'
          }`}
        style={{
          transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: showBottomBar ? '0.05s' : '0s'
        }}
      >
        <div className="h-[0.5px] bg-gray-400/50"></div>

        {/* Payment Method Info (if applicable) */}
        {subscriptionMonths > 1 && (
          <div className="bg-green-50 border-b border-green-100">
            <div className="mx-auto max-w-md px-4 py-2">
              <p className="text-xs text-green-700 text-center font-medium">
                💳 Månedlig betaling - enkelt og fleksibelt
              </p>
            </div>
          </div>
        )}

        <div className="bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
          <div className="mx-auto max-w-md px-4 py-4 flex items-center justify-between gap-3">
            <div className="text-sm">
              <div className="font-semibold">
                {subscriptionInfo.name}
              </div>
              <div className="text-xs text-zinc-600 font-semibold">
                {subscriptionInfo.price} per måned
              </div>
              {subscriptionMonths > 1 && (
                <div className="text-xs text-zinc-500 mt-1">
                  {subscriptionMonths} måneders binding
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="shrink-0 rounded-full bg-[#fbdcfb] text-zinc-900 hover:bg-rose-200 hover:scale-[1.02] border border-zinc-900 px-5 py-2 text-sm font-semibold transition-all duration-300 ease-out flex flex-col items-center justify-center leading-tight disabled:opacity-50"
            >
              <div className="flex items-center gap-1.5 text-xs">
                <Lock className="w-3.5 h-3.5" />
                <span>{isLoading ? 'Behandler...' : 'Betal nå'}</span>
              </div>
              <span className="text-[10px] font-normal opacity-70">Bekreft bestilling og betal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationStep; 