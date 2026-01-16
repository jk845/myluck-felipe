import React from 'react';
import PageHeader from '@/components/ui/page-header';
import FormField from '@/components/ui/form-field';
import ActionButton from '@/components/ui/action-button';
import Footer from '@/components/Footer';
import SuccessIcon from '@/components/ui/success-icon';

interface CancelSubscriptionPresenterProps {
  email: string;
  cancellationReason: string;
  isLoading: boolean;
  error: string;
  success: boolean;
  onEmailChange: (value: string) => void;
  onCancellationReasonChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CancelSubscriptionPresenter: React.FC<CancelSubscriptionPresenterProps> = ({
  email,
  cancellationReason,
  isLoading,
  error,
  success,
  onEmailChange,
  onCancellationReasonChange,
  onSubmit,
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 max-w-md mx-auto px-4 py-8">
        <PageHeader subtitle="Avbestill abonnementet ditt" />

        {success ? (
          <div className="text-center mb-8">
            <div className="flex flex-col items-center">
              <SuccessIcon icon="✉️" className="mb-4" />
              <h2 className="text-3xl font-semibold font-['Hind_Vadodara'] mb-3">
                E-post sendt!
              </h2>
              <p className="text-center text-black text-opacity-60 text-base font-normal font-['Libre_Baskerville'] mb-8">
                Vi har sendt en e-post med instruksjoner for å avbestille abonnementet ditt.
                Vennligst sjekk innboksen din (og eventuelt søppelpost-mappen).
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-3">
                Avbestill abonnement
              </h2>
              <p className="text-black text-opacity-60 text-base font-normal font-['Libre_Baskerville'] mb-6">
                Skriv inn e-postadressen din nedenfor for å avbestille abonnementet ditt.
                Vi vil sende deg en e-post med instruksjoner for å bekrefte avbestillingen.
              </p>

              {error && (
                <div className="w-full bg-red-50 rounded-xl p-4 text-center mb-6">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={onSubmit}>
                <div className="mb-6">
                  <FormField
                    label="E-postadresse"
                    type="email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    placeholder="din@epost.no"
                    required
                  />
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold font-['Hind_Vadodara'] leading-tight text-center mb-8">
                    Vi er lei for å se deg gå.<br />Kan du fortelle oss hvorfor du avbestiller? 🙏
                  </h3>

                  <div className="flex flex-col items-center">
                    <textarea
                      className="w-full h-60 rounded-xl font-['Libre_Baskerville'] tracking-tight border border-black border-opacity-20 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-300 transition-all mb-10"
                      value={cancellationReason}
                      onChange={(e) => onCancellationReasonChange(e.target.value)}
                      placeholder="Din tilbakemelding hjelper oss å forbedre tjenesten..."
                      required
                    />
                  </div>
                </div>

                <ActionButton
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Send avbestillingsforespørsel
                </ActionButton>
              </form>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
                Hva skjer etter avbestilling?
              </h3>
              <div className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville'] space-y-2">
                <p>
                  1. Du vil motta en e-post med en lenke for å bekrefte avbestillingen 📧
                </p>
                <p>
                  2. Etter bekreftelse vil abonnementet ditt avsluttes ved slutten av gjeldende faktureringsperiode 📅
                </p>
                <p>
                  3. Du vil ha tilgang til tjenesten frem til slutten av perioden du har betalt for 🔑
                </p>
                <p>
                  4. Du kan når som helst starte et nytt abonnement ved å besøke nettsiden vår igjen 🔄
                </p>
              </div>
            </div>
          </>
        )}

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

