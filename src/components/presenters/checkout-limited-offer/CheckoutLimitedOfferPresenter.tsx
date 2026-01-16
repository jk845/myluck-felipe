import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Lock, Star, ChevronDown } from 'lucide-react';
import type { PlanType } from '@/containers/checkout-limited-offer/CheckoutLimitedOfferContainer';
import { applyBrowserClasses } from '@/utils/browser-detection';
import mainSuccess1 from '@/assets/main_success_1.jpg';
import girlSuccess4 from '@/assets/girl_success_4.jpg';
import girlSuccess3 from '@/assets/girl_success_3.jpg';
import girlSuccess2 from '@/assets/girl_success_2.jpg';
import milaAvatar from '@/assets/mila_main.jpg';
import myluckAppPhones from '@/assets/myluck-app-phones-960.webp';

// Star SVG component for reusability
const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 88 96"
    fill="#DF72A8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M69.8906 60.8598C69.8906 61.2113 69.6406 61.5004 69.3008 61.559L49.2698 64.8598C44.1214 65.7113 40.0901 69.7387 39.2388 74.8908L35.938 94.9218C35.8794 95.2616 35.5864 95.5116 35.2388 95.5116C34.8872 95.5116 34.5982 95.2616 34.5396 94.9218L31.2388 74.8908C30.3872 69.7424 26.3599 65.7111 21.2078 64.8598L1.17675 61.559C0.836914 61.5004 0.586914 61.2074 0.586914 60.8598C0.586914 60.5082 0.836914 60.2191 1.17675 60.1605L21.2078 56.8597C26.3562 56.0082 30.3875 51.9808 31.2388 46.8287L34.5396 26.7977C34.5981 26.4579 34.8911 26.2079 35.2388 26.2079C35.5903 26.2079 35.8794 26.4579 35.938 26.7977L39.2388 46.8287C40.0904 51.9771 44.1177 56.0084 49.2698 56.8597L69.3008 60.1605C69.6406 60.2191 69.8906 60.5121 69.8906 60.8598ZM86.8126 17.4808L76.8006 15.8324C74.3709 15.4339 72.4803 13.5316 72.0818 11.1136L70.4334 1.10156C70.3748 0.761719 70.0819 0.511719 69.7342 0.511719C69.3827 0.511719 69.0936 0.761719 69.035 1.10156L67.3866 11.1136C66.9882 13.5433 65.0858 15.4339 62.6678 15.8324L52.6558 17.4808C52.316 17.5394 52.066 17.8323 52.066 18.18C52.066 18.5315 52.316 18.8206 52.6558 18.8792L62.6678 20.5276C65.0975 20.926 66.9881 22.8284 67.3866 25.2464L69.035 35.2584C69.0936 35.5982 69.3866 35.8482 69.7342 35.8482C70.0858 35.8482 70.3748 35.5982 70.4334 35.2584L72.0818 25.2464C72.4803 22.8167 74.3826 20.9261 76.8006 20.5276L86.8126 18.8792C87.1525 18.8206 87.4025 18.5276 87.4025 18.18C87.4025 17.8284 87.1525 17.5393 86.8126 17.4808Z" />
  </svg>
);

interface PlanDetails {
  label: string;
  priceToday: number;
  pricePerMonth: number;
  per: string;
  binding: number;
  cta: string;
  guarantee: boolean;
  tagText?: string;
  discount?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
}

interface CheckoutLimitedOfferPresenterProps {
  selectedPlan: PlanType;
  plans: Record<PlanType, PlanDetails>;
  onPlanChange: (plan: PlanType) => void;
  timeRemaining: string;
  nextBillingDate: string;
  benefits: string[];
  onContinue: () => void;
}

const CheckoutLimitedOfferPresenter: React.FC<CheckoutLimitedOfferPresenterProps> = ({
  selectedPlan,
  plans,
  onPlanChange,
  timeRemaining,
  nextBillingDate,
  benefits,
  onContinue,
}) => {
  const currentPlan = plans[selectedPlan];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showGuaranteeInBar, setShowGuaranteeInBar] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const sixMonthPlanRef = useRef<HTMLElement>(null);

  const faqData = useMemo(() => [
    {
      question: "Når får jeg tilgang?",
      answer: "Med en gang etter betaling. Du åpner appen og kan starte i dag. Du blir automatisk med på neste Transformasjons-maraton (opptak lagres)."
    },
    {
      question: "Hvor mye tid trenger jeg?",
      answer: "20–35 min, 3 ganger i uken. I tillegg får du små mikrooppgaver (2–5 min) for travle dager."
    },
    {
      question: "Må jeg telle kalorier?",
      answer: "Nei. Matplanen bruker enkle porsjoner og handlelister—familievennlig."
    },
    {
      question: "Hjem eller studio? Trenger jeg utstyr?",
      answer: "Begge deler funker. Du kan bytte når som helst. Strikk/manualer er fint, men alle økter har alternativer uten utstyr."
    },
    {
      question: "Jeg mister fort motivasjonen – hvordan hjelper dere?",
      answer: "Små seire og klare perioder. Streaks, mikrooppgaver, community og live-økter under maraton holder deg i gang."
    },
    {
      question: "Jeg er ny/ute av form – passer dette?",
      answer: "Ja. Vi starter skånsomt, med tydelige teknikkvideoer og trygg progresjon."
    },
    {
      question: "Skader, gravid eller postpartum?",
      answer: "Tilpasninger finnes. Skånsomme alternativer for rygg/knær/skuldre, samt gravid- og postpartum-spor. Avklar med lege ved akutte plager."
    },
    {
      question: "Hva koster det og hvordan betaler jeg?",
      answer: "Fra 490 kr/mnd. Betaling med Apple Pay, Visa og Mastercard. Kvittering på e-post."
    },
    {
      question: "Er det binding og garanti?",
      answer: "6 og 12 mnd: 14 dagers pengene-tilbake-garanti.\n\n1 mnd: ingen garanti (fin for å prøve).\nAbonnement fornyes månedlig. Du kan avslutte når bindingen er over og beholder tilgang ut betalt periode."
    },
    {
      question: "Kan jeg bytte plan?",
      answer: "Ja. Oppgrader/nedgrader til neste fornyelse."
    }
  ], []);

  // Apply browser detection classes on mount
  useEffect(() => {
    applyBrowserClasses();
  }, []);

  // Monitor 6-month plan visibility for guarantee banner
  useEffect(() => {
    if (!sixMonthPlanRef.current) return;

    // Check if IntersectionObserver is supported (it might have issues in some Instagram browsers)
    if (typeof IntersectionObserver !== 'undefined') {
      try {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // Show guarantee in bar when less than 20% of 6-month plan is visible
              setShowGuaranteeInBar(entry.intersectionRatio < 0.2);
            });
          },
          {
            threshold: [0, 0.2, 0.5, 0.8, 1.0], // Multiple thresholds for smooth tracking
            rootMargin: '0px'
          }
        );

        observer.observe(sixMonthPlanRef.current);

        return () => {
          observer.disconnect();
        };
      } catch (error) {
        // Fallback for browsers with IntersectionObserver issues
        console.warn('IntersectionObserver not fully supported, using fallback');
        setShowGuaranteeInBar(true); // Show by default in problematic browsers
      }
    } else {
      // No IntersectionObserver support
      setShowGuaranteeInBar(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Timer Banner */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-amber-50 border-b border-amber-100">
        <div className="mx-auto max-w-md px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-amber-900">
                Tilbudet utløper om
              </h3>
              <p className="text-xs text-amber-800">
                Deretter gjelder første måned til full pris
              </p>
            </div>
            <span
              className="text-sm font-mono text-amber-900 font-semibold ml-4"
              aria-live="polite"
              aria-atomic="true"
            >
              {timeRemaining}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-md px-4 pt-20 pb-44">
        {/* Hero Section */}
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold leading-tight font-['Hind_Vadodara']">
            Kickstart transformasjonen<br />din for <span className="text-fuchsia-500">49 kr første mnd.</span>
          </h1>
          <p className="text-sm text-zinc-700">
            <strong>Ingen kaloritelling</strong> · <strong>Familievennlige måltider</strong> · <strong>Trening ~25 min, 3x i uka</strong> · <strong>Hjem eller studio</strong>
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <div className="flex relative">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-300'}`}
                />
              ))}
              {/* 60% filled last star overlay */}
              <div className="absolute left-[64px] overflow-hidden w-[9.6px]">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <span>4,7/5</span>
          </div>
        </section>

        {/* Plan Selection */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-3 font-['Hind_Vadodara']">Velg plan</h2>
          <div className="grid gap-6">
            {/* 12 Month Plan */}
            <article
              onClick={() => onPlanChange('12month')}
              className={`rounded-2xl cursor-pointer relative transition-all ${selectedPlan === '12month'
                ? 'ring-2 ring-black'
                : 'outline outline-1 outline-black/10 hover:outline-2 hover:outline-black/20'
                }`}
            >
              {plans['12month'].tagText && (
                <div className="absolute -top-3 right-4 bg-[#CC77A1] text-white text-[11px] font-bold px-4 py-1 rounded-full z-10">
                  Beste verdi
                </div>
              )}
              <div className="rounded-t-2xl p-4 bg-white">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold">{plans['12month'].label}</h3>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-zinc-600"><span className="text-sm">første mnd</span> <span className="text-lg font-bold">49 kr</span></span>
                      <StarIcon className="animate-pulse-glow" />
                    </div>
                    <span className="text-xs text-zinc-600 block text-right">Deretter <span className="font-bold">490 kr/mnd</span> i <span className="font-bold">11 mnd</span></span>
                  </div>
                </div>
              </div>
              <div className="rounded-b-2xl bg-gray-50 text-gray-700">
                <div className="px-4 h-[42px] md:h-[47px] flex items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 text-sm">✓</span>
                    <p className="text-xs font-medium leading-tight text-green-700">14 dagers pengene-tilbake</p>
                  </div>
                </div>
              </div>
            </article>

            {/* 6 Month Plan */}
            <article
              ref={sixMonthPlanRef}
              onClick={() => onPlanChange('6month')}
              className={`rounded-2xl cursor-pointer relative transition-all ${selectedPlan === '6month'
                ? 'ring-2 ring-black'
                : 'outline outline-1 outline-black/10 hover:outline-2 hover:outline-black/20'
                }`}
            >
              <div className="absolute -top-3 right-4 bg-black text-white text-[11px] font-bold px-4 py-1 rounded-full z-10">
                Mest populær
              </div>
              <div className="rounded-t-2xl p-4 bg-white">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold">{plans['6month'].label}</h3>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-zinc-600"><span className="text-sm">første mnd</span> <span className="text-lg font-bold">59 kr</span></span>
                      <StarIcon className="animate-pulse-glow" />
                    </div>
                    <span className="text-xs text-zinc-600 block text-right">Deretter <span className="font-bold">590 kr/mnd</span> i <span className="font-bold">5 mnd</span></span>
                  </div>
                </div>
              </div>
              <div className="rounded-b-2xl bg-gray-50 text-gray-700">
                <div className="px-4 h-[42px] md:h-[47px] flex items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 text-sm">✓</span>
                    <p className="text-xs font-medium leading-tight text-green-700">14 dagers pengene-tilbake</p>
                  </div>
                </div>
              </div>
            </article>

            {/* 1 Month Plan */}
            <article
              onClick={() => onPlanChange('1month')}
              className={`rounded-2xl cursor-pointer transition-all ${selectedPlan === '1month'
                ? 'ring-2 ring-black'
                : 'outline outline-1 outline-black/10 hover:outline-2 hover:outline-black/20'
                }`}
            >
              <div className="p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">{plans['1month'].label}</h3>
                  <div className="text-right">
                    <span className="text-sm text-zinc-600">890 kr/mnd</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Ingen garanti på denne planen
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Hva skjer videre? Section */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4 font-['Hind_Vadodara']">Hva skjer videre?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedPlan === '12month' ? 'Start i dag for 49 kr' :
                    selectedPlan === '6month' ? 'Start i dag for 59 kr' :
                      'Start i dag'}
                </p>
                <p className="text-xs text-gray-600">Få full tilgang med en gang</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏃‍♀️</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Bli med på transformasjonsmaraton i dag</p>
                <p className="text-xs text-gray-600">Første livestream 20. okt kl. 20:00</p>
              </div>
            </div>
            {selectedPlan !== '1month' && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔔</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Om 30 dager</p>
                  <p className="text-xs text-gray-600">
                    {selectedPlan === '12month' ? 'Neste trekk er 490 kr – avbryt innen 14 dager hvis det ikke passer' :
                      'Neste trekk er 590 kr – avbryt innen 14 dager hvis det ikke passer'}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤩</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Om 2 måneder</p>
                <p className="text-xs text-gray-600">Begynn å få komplimenter fra venner og familie</p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Gallery */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-3 font-['Hind_Vadodara']">Resultater</h2>
          <div className="relative">
            <div
              className="overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
              style={{
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
              }}
              onScroll={(e) => {
                const scrollContainer = e.currentTarget;
                const scrollPosition = scrollContainer.scrollLeft;
                const itemWidth = scrollContainer.querySelector('div[data-carousel-item]')?.clientWidth || 0;
                const gap = 16; // gap-4 = 16px
                const currentIndex = Math.round(scrollPosition / (itemWidth + gap));
                setCurrentCarouselIndex(currentIndex);
              }}
            >
              <div className="flex gap-4 pb-2">
                {/* Before/After 1 */}
                <div data-carousel-item className="w-[70vw] max-w-[280px] flex-shrink-0 snap-start">
                  <div className="aspect-[4/3] w-full rounded-lg relative overflow-hidden">
                    <img
                      src={mainSuccess1}
                      alt="Transformation result 1"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">Før</div>
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">Etter</div>
                  </div>
                  <p className="text-xs text-zinc-700 mt-2">«Slik startet min egen reise - derfor vet jeg at det fungerer 💪» — Mila, grunnlegger</p>
                </div>

                {/* Before/After 2 */}
                <div data-carousel-item className="w-[70vw] max-w-[280px] flex-shrink-0 snap-start">
                  <div className="aspect-[4/3] w-full rounded-lg relative overflow-hidden">
                    <img
                      src={girlSuccess4}
                      alt="Transformation result 2"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">Før</div>
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">Etter</div>
                  </div>
                  <p className="text-xs text-zinc-700 mt-2">«Endelig en kropp jeg er stolt av - takk Mila! 🙏✨» — Emma, 28</p>
                </div>

                {/* Before/After 3 */}
                <div data-carousel-item className="w-[70vw] max-w-[280px] flex-shrink-0 snap-start">
                  <div className="aspect-[4/3] w-full rounded-lg relative overflow-hidden">
                    <img
                      src={girlSuccess3}
                      alt="Transformation result 3"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">Før</div>
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">Etter</div>
                  </div>
                  <p className="text-xs text-zinc-700 mt-2">«Fra usikker til selvsikker på 6 måneder 💕» — Lena, 41</p>
                </div>

                {/* Before/After 4 */}
                <div data-carousel-item className="w-[70vw] max-w-[280px] flex-shrink-0 snap-start">
                  <div className="aspect-[4/3] w-full rounded-lg relative overflow-hidden">
                    <img
                      src={girlSuccess2}
                      alt="Transformation result 4"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">Før</div>
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">Etter</div>
                  </div>
                  <p className="text-xs text-zinc-700 mt-2">«Bygget muskler og mistet fett samtidig» — Ingrid, 37</p>
                </div>

                {/* Spacer for last item */}
                <div className="w-4 shrink-0"></div>
              </div>
            </div>

            {/* Scroll dots indicator */}
            <div className="flex justify-center gap-1.5 mt-4">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${currentCarouselIndex === index ? 'bg-zinc-900' : 'bg-zinc-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Marathon Event Section */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-['Hind_Vadodara']">Neste maraton</h2>
          </div>

          <div className="bg-gray-50 rounded-2xl overflow-hidden relative">
            {/* Pink Top Section */}
            <div className="bg-gray-100 px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">Starter 20 okt</span>
              <span className="text-sm font-mono text-gray-800">{timeRemaining}</span>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-900 mb-4">Styrke, hud & mat (6 uker)</p>

              {/* Mila Profile */}
              <div className="flex items-center gap-3 mb-4">
                <img src={milaAvatar} alt="Mila" className="w-10 h-10 rounded-full object-cover" />
                <span className="text-sm font-medium text-gray-700">Med Mila, live</span>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-sm mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">Direktesendte treningsøkter – teknikk i dybden</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-sm mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">Mat & hudhelse – praktiske måltider</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-sm mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">Mila sin tilskudds-stack – hva, når og hvorfor</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-700">Opptak tilgjengelig</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-700">Q&A live</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-700">Passer hjemme/studio</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-3 font-['Hind_Vadodara']">Dette får du</h2>
          <ul className="space-y-3 text-sm text-zinc-800">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex gap-3">
                <span>{benefit.split(' ')[0]}</span>
                <span>{benefit.substring(benefit.indexOf(' ') + 1)}</span>
              </li>
            ))}
          </ul>

          {/* App Preview */}
          <div className="mt-6">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white">
              <img
                src={myluckAppPhones}
                alt="MyLuck app preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4 font-['Hind_Vadodara']">
            Vanlige spørsmål (for rask beslutning)
          </h2>
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-sm">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky Payment Bar */}
      <div
        className="fixed bottom-0 inset-x-0 z-20"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0)',
        }}
      >
        <div className="h-[0.5px] bg-gray-400/50"></div>

        {/* Guarantee Banner - Only show for 6m and 12m plans when scrolled past 80% of 6-month plan */}
        {(selectedPlan === '6month' || selectedPlan === '12month') && showGuaranteeInBar && (
          <div className="bg-green-50 border-b border-green-100">
            <div className="mx-auto max-w-md px-4 py-2">
              <p className="text-xs text-green-700 text-center font-medium">
                14 dagers pengene-tilbake. Ingen spørsmål.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
          <div className="mx-auto max-w-md px-4 py-4 flex items-center justify-between gap-3">
            <div className="text-sm">
              <div className="font-semibold">
                Premium {currentPlan.label}{currentPlan.binding > 0 ? ' binding' : ''}
              </div>
              <div className="text-xs text-zinc-600">
                Neste månedsbetaling <span className="font-bold">{currentPlan.pricePerMonth} kr</span> {nextBillingDate}
              </div>
              <div className="text-xs">
                <a
                  href="/terms-v2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 underline hover:text-zinc-800"
                >
                  Se Vilkår og betingelser
                </a>
              </div>
            </div>
            <button
              onClick={onContinue}
              className="shrink-0 rounded-full bg-[#fbdcfb] text-zinc-900 hover:bg-rose-200 hover:scale-[1.02] border border-zinc-900 px-5 py-2 text-sm font-semibold transition-all duration-300 ease-out flex flex-col items-center justify-center leading-tight"
            >
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Betal {selectedPlan === '12month' ? '49' : selectedPlan === '6month' ? '59' : '890'} kr i dag</span>
              </div>
              <span className="text-[10px] font-normal opacity-80">Bekreft bestilling og betal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLimitedOfferPresenter;