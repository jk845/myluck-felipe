import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface ConsentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: (email: string) => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onClose, onAccept }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const canSubmit = isChecked && isEmailValid;

    const handleAccept = () => {
        if (canSubmit) {
            onAccept(email);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[90%] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-300">
                    <Dialog.Title className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
                        Bekreftelse
                    </Dialog.Title>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 font-['Hind_Vadodara']">
                                Din e-postadresse
                            </label>
                            <input
                                type="email"
                                placeholder="navn@epost.no"
                                className="w-full h-12 px-4 rounded-xl border-2 border-zinc-200 focus:border-[#fbdcfb] focus:outline-none transition-all font-['Libre_Baskerville']"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <label className="flex gap-3 cursor-pointer group">
                            <div className="relative flex items-start pt-1">
                                <input
                                    type="checkbox"
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-zinc-300 transition-all checked:border-[#fbdcfb] checked:bg-[#fbdcfb]"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                <div className="pointer-events-none absolute left-[3px] top-[4px] hidden peer-checked:block">
                                    <svg className="h-3.5 w-3.5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-sm text-zinc-700 leading-relaxed font-['Libre_Baskerville']">
                                Jeg ber om at tjenesten starter umiddelbart etter betaling. Jeg erkjenner at jeg ved dette frasier meg retten til refusjon for den leverte første måneden dersom jeg kansellerer innen 14-dagersfristen. Jeg har lest og godtar <a href="/terms-v2" target="_blank" className="underline font-semibold hover:text-zinc-900 transition-colors">vilkårene og betingelsene</a>.
                            </span>
                        </label>

                        <button
                            disabled={!canSubmit}
                            onClick={handleAccept}
                            className={`w-full h-14 rounded-full font-semibold font-['Hind_Vadodara'] transition-all flex items-center justify-center ${canSubmit
                                ? 'bg-[#fbdcfb] text-zinc-900 border-2 border-zinc-900 hover:bg-rose-200'
                                : 'bg-zinc-100 text-zinc-400 border-2 border-transparent cursor-not-allowed'
                                }`}
                        >
                            Gå til betaling
                        </button>
                    </div>

                    <Dialog.Close asChild>
                        <button className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-all">
                            <X className="h-5 w-5" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
