import React, { useRef, useEffect, useState } from 'react';
import { Lock, Star, ChevronDown } from 'lucide-react';
import type { PlanType } from '@/containers/checkout/CheckoutV2Container';
import mainSuccess1 from '@/assets/main_success_1.jpg';
import girlSuccess4 from '@/assets/girl_success_4.jpg';
import girlSuccess3 from '@/assets/girl_success_3.jpg';
import girlSuccess2 from '@/assets/girl_success_2.jpg';
import milaAvatar from '@/assets/mila_main.jpg';
import myluckAppPhones from '@/assets/myluck-app-phones-960.webp';

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

interface CheckoutV2PresenterProps {
    selectedPlan: PlanType;
    plans: Record<PlanType, PlanDetails>;
    onPlanChange: (plan: PlanType) => void;
    timeRemaining: string;
    nextBillingDate: string;
    benefits: string[];
    onContinue: () => void;
}

const CheckoutV2Presenter: React.FC<CheckoutV2PresenterProps> = ({
    selectedPlan,
    plans,
    onPlanChange,
    timeRemaining,
    nextBillingDate,
    benefits,
    onContinue,
}) => {
    const currentPlan = plans[selectedPlan];
    const topCtaRef = useRef<HTMLButtonElement>(null);
    const [showBottomBar, setShowBottomBar] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const faqData = [
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
            answer: "Fra 649 kr/mnd. Betaling med Apple Pay, Visa og Mastercard. Kvittering på e-post."
        },
        {
            question: "Er det binding og garanti?",
            answer: "6 måneder: 14 dagers pengene-tilbake-garanti, deretter bindende for hele perioden.\n1 måned: ingen garanti (egnet for å prøve).\nAbonnementet fornyes månedlig. Du kan si opp når bindingstiden er over og beholde tilgangen ut betalt periode."
        },
        {
            question: "Kan jeg bytte plan?",
            answer: "Ja. Oppgrader/nedgrader til neste fornyelse."
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show bottom bar when less than 90% of top CTA is visible (10% is hidden)
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

    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <main className="mx-auto max-w-md px-4 pt-6 pb-44">
                {/* Hero Section */}
                <section className="space-y-3">
                    <h1 className="text-2xl font-semibold leading-tight font-['Hind_Vadodara']">
                        Personlig trenings- og kostholdsplan som fungerer i en travel hverdag.
                    </h1>
                    <p className="text-sm text-zinc-700">
                        <strong>Fra 21 kr dagen</strong> · <strong>Ingen kaloritelling</strong> · <strong>Familievennlige måltider</strong> · <strong>20–35 min, 3x i uka</strong> · <strong>Hjem eller studio</strong>
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
                        <span>4,7/5 — 437 aktive siste 30 dager</span>
                    </div>
                </section>

                {/* Dynamic CTA button based on selected plan */}
                <div className="mt-6">
                    <button
                        ref={topCtaRef}
                        onClick={onContinue}
                        className="w-full rounded-full bg-[#fbdcfb] text-zinc-900 border-2 border-zinc-900 px-6 py-2 text-sm font-semibold transition-all hover:bg-rose-200 flex flex-col items-center justify-center"
                    >
                        <span>{`Start ${selectedPlan === '6month' ? '6 mnd + 1 mnd gratis' : '1 mnd'} nå`}</span>
                        <span className="text-[10px] font-normal opacity-80">Bekreft bestilling og betal</span>
                    </button>
                    <p className="text-xs text-zinc-600 text-center mt-2">
                        Du betaler kun første månedsbeløp i dag. Umiddelbar tilgang + plass i alle kommende maraton i medlemsperioden.
                    </p>
                </div>

                {/* Plan Selection */}
                <section className="mt-6">
                    <h2 className="text-lg font-semibold mb-3 font-['Hind_Vadodara']">Velg plan</h2>
                    <div className="grid gap-6">
                        {/* 6 Month Plan */}
                        <article
                            onClick={() => onPlanChange('6month')}
                            className={`rounded-2xl cursor-pointer relative transition-all ${selectedPlan === '6month'
                                ? 'border-3 border-fuchsia-500 ring-4 ring-fuchsia-100 shadow-md shadow-fuchsia-200/30'
                                : 'outline outline-1 outline-black/10 hover:outline-2 hover:outline-black/20'
                                }`}
                        >
                            <div className="p-4">
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-lg font-semibold">{plans['6month'].label}</h3>
                                    <div className="text-right">
                                        <span className="text-sm text-zinc-600">649 kr/mnd</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    ✅ 14 dagers fornøyd-garanti
                                </p>
                            </div>
                            <div className="border-t rounded-b-2xl overflow-hidden bg-gray-100 text-gray-600 border-gray-200">
                                <div className="px-4 pr-8 md:px-8 md:pr-12 h-[40px] md:h-[52px] flex items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">🎁</span>
                                        <p className="text-xs font-medium leading-tight">Milas kostholdsplan tilpasset deg</p>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* 1 Month Plan */}
                        <article
                            onClick={() => onPlanChange('1month')}
                            className={`rounded-2xl cursor-pointer transition-all ${selectedPlan === '1month'
                                ? 'border-3 border-fuchsia-500 ring-4 ring-fuchsia-100 shadow-md shadow-fuchsia-200/30'
                                : 'outline outline-1 outline-black/10 hover:outline-2 hover:outline-black/20'
                                }`}
                        >
                            <div className="p-4">
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-lg font-semibold">{plans['1month'].label}</h3>
                                    <div className="text-right">
                                        <span className="text-sm text-zinc-600">979 kr/mnd</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Ingen garanti på denne planen
                                </p>
                            </div>
                        </article>
                    </div>
                </section>

                {/* Results Gallery */}
                <section className="mt-10">
                    <h2 className="text-lg font-semibold mb-3 font-['Hind_Vadodara']">Resultater</h2>
                    <div className="relative">
                        <div
                            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
                            onScroll={(e) => {
                                const scrollContainer = e.currentTarget;
                                const scrollPosition = scrollContainer.scrollLeft;
                                const itemWidth = scrollContainer.querySelector('div[data-carousel-item]')?.clientWidth || 0;
                                const gap = 16; // gap-4 = 16px
                                const currentIndex = Math.round(scrollPosition / (itemWidth + gap));

                                // Update dots
                                const dots = document.querySelectorAll('[data-dot]');
                                dots.forEach((dot, index) => {
                                    if (index === currentIndex) {
                                        dot.classList.add('bg-zinc-900');
                                        dot.classList.remove('bg-zinc-300');
                                    } else {
                                        dot.classList.add('bg-zinc-300');
                                        dot.classList.remove('bg-zinc-900');
                                    }
                                });
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
                            <div data-dot className="w-2 h-2 rounded-full bg-zinc-900"></div>
                            <div data-dot className="w-2 h-2 rounded-full bg-zinc-300"></div>
                            <div data-dot className="w-2 h-2 rounded-full bg-zinc-300"></div>
                            <div data-dot className="w-2 h-2 rounded-full bg-zinc-300"></div>
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
                            <span className="text-sm font-medium text-gray-800">Starter 26 jan</span>
                            <span className="text-sm font-mono text-gray-800">{timeRemaining}</span>
                        </div>

                        {/* Content Section */}
                        <div className="p-4">
                            <p className="text-lg font-semibold text-gray-900 mb-2">Kjerne fra innenfra (8 uker)</p>

                            <div className="bg-emerald-50 border-l-4 border-emerald-400 p-3 mb-4 rounded-r-lg">
                                <p className="text-sm font-semibold text-emerald-900 leading-snug italic">
                                    Minimalt med ekstra tidsbruk. Maksimal effekt på styrke og kroppskontroll.
                                </p>
                            </div>

                            {/* Mila Profile */}
                            <div className="flex items-center gap-3 mb-4">
                                <img src={milaAvatar} alt="Mila" className="w-10 h-10 rounded-full object-cover" />
                                <span className="text-sm font-medium text-gray-700">Med Mila, live</span>
                            </div>

                            {/* Features List */}
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <span className="text-green-500 text-sm mt-0.5">✓</span>
                                    <span className="text-sm text-gray-700">Inkluderer daglige korte rutiner samt 3 ukentlige økter som utfyller styrketrening.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-green-500 text-sm mt-0.5">✓</span>
                                    <span className="text-sm text-gray-700">Fokus på kjerne, bekkenbunn, pust og prestasjon – utviklet for å bygge konsistens og kroppsbevissthet.</span>
                                </div>
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

            {/* Sticky Payment Bar - Only show when top CTA is 30% hidden */}
            <div
                className={`fixed bottom-0 inset-x-0 z-20 transform ${showBottomBar ? 'translate-y-0' : 'translate-y-full pointer-events-none'
                    }`}
                style={{
                    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transitionDelay: showBottomBar ? '0.05s' : '0s'
                }}
            >
                <div className="h-[0.5px] bg-gray-400/50"></div>

                {/* Guarantee Banner - Only show for 6m plan */}
                {selectedPlan === '6month' && (
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
                            <div className="text-xs text-zinc-600 font-semibold">
                                {currentPlan.priceToday} kr i dag
                            </div>
                            <div className="text-xs text-zinc-600">
                                Neste månedsbetaling {nextBillingDate}
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
                                <span>{`Start ${selectedPlan === '6month' ? '6 mnd + 1 mnd gratis' : '1 mnd'} nå`}</span>
                            </div>
                            <span className="text-[10px] font-normal opacity-80">Bekreft bestilling og betal</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutV2Presenter;
