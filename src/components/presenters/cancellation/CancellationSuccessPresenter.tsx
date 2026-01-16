import React from 'react';
import PageHeader from '@/components/ui/page-header';
import SuccessIcon from '@/components/ui/success-icon';
import Footer from '@/components/Footer';

export const CancellationSuccessPresenter: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 max-w-md mx-auto px-4 py-8">
        <PageHeader subtitle="Avbestilling bekreftet" />

        <div className="text-center mb-8">
          <div className="flex flex-col items-center">
            <SuccessIcon icon="✓" className="mb-4" bgColor="bg-green-50" />
            <h2 className="text-3xl font-semibold font-['Hind_Vadodara'] mb-3">
              Avbestilling fullført
            </h2>
            <p className="text-center text-black text-opacity-60 text-base font-normal font-['Libre_Baskerville'] mb-4">
              Ditt abonnement er nå avbestilt. Du vil fortsatt ha tilgang til tjenesten frem til slutten av gjeldende faktureringsperiode.
            </p>
            <p className="text-center text-black text-opacity-60 text-base font-normal font-['Libre_Baskerville'] mb-8">
              Takk for din tilbakemelding! Din mening er viktig for oss og hjelper oss å forbedre tjenesten vår.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
            Hva skjer nå?
          </h3>
          <div className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville'] space-y-2">
            <p>
              1. Du vil motta en bekreftelse på e-post om at abonnementet ditt er avbestilt 📧
            </p>
            <p>
              2. Du vil fortsatt ha tilgang til tjenesten frem til slutten av gjeldende faktureringsperiode 📅
            </p>
            <p>
              3. Ingen flere betalinger vil bli trukket fra kontoen din 💳
            </p>
            <p>
              4. Du kan når som helst starte et nytt abonnement ved å besøke nettsiden vår igjen 🔄
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
            Vil du ombestemme deg?
          </h3>
          <p className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville'] mb-4">
            Hvis du ombestemmer deg, kan du når som helst starte et nytt abonnement ved å besøke nettsiden vår.
          </p>
          <a
            href="/"
            className="block w-full h-[55px] rounded-[100px] text-xl font-semibold font-['Hind_Vadodara'] leading-tight
            bg-[#fbdcfb] text-black outline outline-2 outline-offset-[-1px] outline-black hover:bg-[#f9c9f9]
            flex items-center justify-center"
          >
            Gå til forsiden
          </a>
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

