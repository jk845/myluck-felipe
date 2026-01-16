import Footer from "@/components/Footer";
import ActionButton from "@/components/ui/action-button";

interface PaymentFailedPresenterProps {
    onRetry: () => void;
}

export function PaymentFailedPresenter({ onRetry }: PaymentFailedPresenterProps) {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <main className="max-w-md mx-auto px-4 py-8 w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-normal font-['Averia_Serif_Libre'] mb-8">
                        myluck
                    </h1>
                </div>

                <p className="text-center text-black text-xl font-normal font-['Hind_Vadodara'] mb-8">
                    😱 <br />
                    Betaling her feilet
                </p>

                <ActionButton className="w-full" onClick={onRetry}>
                    Prøv igjen 🥳
                </ActionButton>
            </main>
            <Footer />
        </div>
    );
}