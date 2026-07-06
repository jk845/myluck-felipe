import React from 'react';
import { Lock } from 'lucide-react';
import type { PaymentMethod, PlanTypeV3 } from '@/containers/checkout/CheckoutV3Step2Container';

interface CheckoutV3Step2PresenterProps {
    plan: PlanTypeV3;
    selectedMethod: PaymentMethod;
    prices: { monthly: number; upfront: number; upfrontSubtitle: string; monthlyTitle: string };
    onMethodChange: (method: PaymentMethod) => void;
    onContinue: () => void;
}

const CheckoutV3Step2Presenter: React.FC<CheckoutV3Step2PresenterProps> = ({
    plan,
    selectedMethod,
    prices,
    onMethodChange,
    onContinue,
}) => {
    const isSixMonth = plan === '6month';
    const months = isSixMonth ? 6 : 3;

    return (
        <div className="min-h-screen bg-white">
            <main className="mx-auto max-w-md px-4 pt-6 pb-44">
                <section className="space-y-3">
                    <h1 className="text-2xl font-semibold leading-tight font-['Hind_Vadodara']">
                        Velg betalingsmetode
                    </h1>
                    <p className="text-sm text-zinc-700">
                        Du har valgt <strong>{months} måneder</strong> planen. Hvordan vil du betale?
                    </p>
                </section>

                <section className="mt-8">
                    <div className="grid gap-4">
                        {/* Upfront */}
                        <article
                            onClick={() => onMethodChange('upfront')}
                            className={`rounded-2xl cursor-pointer relative transition-all ${selectedMethod === 'upfront'
                                ? 'border-3 border-fuchsia-500 ring-4 ring-fuchsia-100 shadow-md shadow-fuchsia-200/30'
                                : 'outline outline-1 outline-black/10 hover:outline-2 hover:outline-black/20'
                                }`}
                        >
                            <div className="p-4">
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-lg font-semibold">Betal alt på en gang</h3>
                                    <div className="text-right">
                                        <div className="text-lg text-zinc-600 font-semibold">{prices.upfront} kr</div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">{prices.upfrontSubtitle}</p>
                            </div>
                            {selectedMethod === 'upfront' && (
                                <div className="border-t rounded-b-2xl overflow-hidden bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200 px-4 py-2 text-xs font-medium">
                                    Anbefalt – billigst totalt sett!
                                </div>
                            )}
                        </article>

                        {/* Monthly */}
                        <article
                            onClick={() => onMethodChange('monthly')}
                            className={`rounded-2xl cursor-pointer transition-all ${selectedMethod === 'monthly'
                                ? 'border-3 border-fuchsia-500 ring-4 ring-fuchsia-100 shadow-md shadow-fuchsia-200/30'
                                : 'outline outline-1 outline-black/10 hover:outline-2 hover:outline-black/20'
                                }`}
                        >
                            <div className="p-4">
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-lg font-semibold">{prices.monthlyTitle}</h3>
                                    <div className="text-right">
                                        <span className="text-lg text-zinc-600 font-semibold">{prices.monthly} kr/mnd</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Betal et mindre beløp per måned over {months} måneder.</p>
                                <p className="text-xs text-gray-400 mt-1">Total kostnad for {prices.monthly * months}NOK</p>
                            </div>
                        </article>
                    </div>
                </section>

                <div className="mt-8">
                    <button
                        onClick={onContinue}
                        className="w-full rounded-full bg-[#fbdcfb] text-zinc-900 border-2 border-zinc-900 px-6 py-4 text-lg font-semibold transition-all hover:bg-rose-200 flex flex-col items-center justify-center"
                    >
                        <div className="flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            <span>Bekreft bestilling og betal</span>
                        </div>
                    </button>
                    <p className="text-xs text-zinc-600 text-center mt-3">
                        Transaksjonen er sikret med kryptering.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default CheckoutV3Step2Presenter;
