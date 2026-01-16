import React from 'react';
import PageHeader from '@/components/ui/page-header';
import SuccessIcon from '@/components/ui/success-icon';
import ActionButton from '@/components/ui/action-button';
import Footer from '@/components/Footer';

interface CancellationErrorPresenterProps {
  onTryAgain: () => void;
}

export const CancellationErrorPresenter: React.FC<CancellationErrorPresenterProps> = ({
  onTryAgain,
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 max-w-md mx-auto px-4 py-8">
        <PageHeader subtitle="Feil ved avbestilling" />

        <div className="text-center mb-8">
          <div className="flex flex-col items-center">
            <SuccessIcon icon="❌" className="mb-4" bgColor="bg-red-50" />
            <h2 className="text-3xl font-semibold font-['Hind_Vadodara'] mb-3">
              Noe gikk galt
            </h2>
            <p className="text-center text-black text-opacity-60 text-base font-normal font-['Libre_Baskerville'] mb-8">
              Vi kunne ikke behandle avbestillingen din. Dette kan skyldes at lenken er utløpt eller allerede brukt.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
            Mulige årsaker
          </h3>
          <div className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville'] space-y-2">
            <p>
              1. Lenken du klikket på er utløpt (gyldig i 24 timer) ⏱️
            </p>
            <p>
              2. Lenken har allerede blitt brukt til å avbestille abonnementet 🔄
            </p>
            <p>
              3. Det oppstod en teknisk feil i systemet vårt 🛠️
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
            Hva kan du gjøre?
          </h3>
          <p className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville'] mb-4">
            Du kan prøve å sende en ny avbestillingsforespørsel eller kontakte kundeservice for hjelp.
          </p>
          <div className="space-y-4">
            <ActionButton onClick={onTryAgain}>
              Prøv igjen
            </ActionButton>
            <a
              href="/"
              className="block w-full h-[55px] rounded-[100px] text-xl font-semibold font-['Hind_Vadodara'] leading-tight
              bg-[#f5f5f7] text-black outline outline-2 outline-offset-[-1px] outline-black hover:bg-[#e5e5e7]
              flex items-center justify-center"
            >
              Gå til forsiden
            </a>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
            Spørsmål eller problemer?
          </h3>
          <p className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville']">
            Skriv til oss på Epost
          </p>
          <p className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville']">
            <a href="mailto:ask@myluck.no" className="underline">
              ask@myluck.no
            </a>{" "}
            ❤️
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

