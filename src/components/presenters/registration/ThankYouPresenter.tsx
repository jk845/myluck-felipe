import React from 'react';
import SuccessIcon from '@/components/ui/success-icon';
import CopyField from '@/components/ui/copy-field';
import Footer from '@/components/Footer';
import { CustomerInfo } from '@/hooks/useThankYouData';
import { OrderDetailsSimple } from '@/components/ui/order-details-simple';

interface ThankYouPresenterProps {
  isLoading: boolean;
  error: string;
  customerInfo: CustomerInfo;
  onCopyToClipboard: (text: string) => Promise<void>;
}

const LINK_TO_FACEBOOK = 'https://www.facebook.com/groups/myluckcommunity';


export const ThankYouPresenter: React.FC<ThankYouPresenterProps> = ({
  isLoading,
  error,
  customerInfo,
  onCopyToClipboard,
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-normal font-['Averia_Serif_Libre'] mb-8">
            myluck
          </h1>

          <div className="flex flex-col items-center">
            <SuccessIcon icon="🎉" className="mb-4" />
            <h2 className="text-3xl font-semibold font-['Hind_Vadodara'] mb-3">
              Alt er klart!
            </h2>
            <p className="text-center text-black text-opacity-60 text-base font-normal font-['Libre_Baskerville']">
              Velkommen til Myluck-familien! ❤️
            </p>
          </div>
        </div>

        {/* Quick Start Guide */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
            <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4 text-black text-center">
              🚀 Kom i gang med 3 enkle steg
            </h3>
            <div className="space-y-4">
              <StepItem
                number={1}
                title="Last ned appen"
                description="Finn Myluck i App Store eller Google Play"
              />
              <StepItem
                number={2}
                title="Logg inn"
                description="Bruk innloggingsdetaljene nedenfor"
              />
              <StepItem
                number={3}
                title="Bli med i Facebook-gruppen"
                description="Der skjer magien! ✨"
              />
            </div>
          </div>
        </section>

        {/* Login credentials */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
            Dine innloggingsdetaljer 🔑
          </h3>

          {isLoading ? (
            <LoadingCredentials />
          ) : error ? (
            <ErrorCredentials error={error} />
          ) : (
            <Credentials
              email={customerInfo.email}
              password={customerInfo.password}
              onCopy={onCopyToClipboard}
            />
          )}
        </section>

        {/* Order details */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
            Din bestilling
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-black/60 font-['Libre_Baskerville']">Order ID</span>
            <span className="text-sm font-semibold font-['Hind_Vadodara']">{customerInfo.orderId}</span>
          </div>
          <OrderDetailsSimple
            subscriptionType={customerInfo.subscriptionType}
            subscriptionPlan={customerInfo.subscriptionPlan}
            price={customerInfo.price}
            renewalDate={customerInfo.renewalDate}
            nextPaymentDate={customerInfo.nextPaymentDate}
            nextCycleDate={customerInfo.nextCycleDate}
          />
        </section>

        {/* Video Guide */}
        <VideoSection />

        {/* App Download */}
        <AppDownloadSection />

        {/* Snapchat Group */}
        <FacebookSection />

        {/* What's included */}
        <WhatsIncludedSection />

        {/* Important reminders */}
        <RemindersSection />

        {/* Support */}
        <SupportSection />
      </main>
      <Footer />
    </div>
  );
};

// Sub-components
const StepItem: React.FC<{ number: number; title: string; description: string }> = ({
  number,
  title,
  description
}) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
      {number}
    </div>
    <div>
      <p className="text-sm text-black/80 font-['Libre_Baskerville']">
        <strong>{title}</strong> - {description}
      </p>
    </div>
  </div>
);

const LoadingCredentials = () => (
  <div className="w-full bg-[#f5f5f7] rounded-xl h-40 flex items-center justify-center">
    <div className="animate-pulse text-gray-400">
      Laster innloggingsdetaljer...
    </div>
  </div>
);

const ErrorCredentials: React.FC<{ error: string }> = ({ error }) => (
  <div className="w-full bg-red-50 rounded-xl p-6 text-center">
    <p className="text-red-600 mb-2">{error}</p>
    <p className="text-black text-opacity-60 text-sm">
      Vennligst sjekk e-posten din for innloggingsdetaljer eller kontakt
      kundeservice.
    </p>
  </div>
);

const Credentials: React.FC<{
  email: string;
  password: string;
  onCopy: (text: string) => Promise<void>;
}> = ({ email, password, onCopy }) => (
  <div className="w-full bg-[#f5f5f7] rounded-xl p-6 space-y-4">
    <CopyField
      value={email}
      label="Brukernavn"
      onCopy={onCopy}
    />
    <CopyField
      value={password}
      label="Passord"
      onCopy={onCopy}
    />
    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
      <p className="text-xs text-yellow-800">
        💡 Tips: Du får også disse detaljene på e-post. Sjekk søppelpost hvis du ikke ser den!
      </p>
    </div>
  </div>
);


const VideoSection = () => (
  <section className="mb-10">
    <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
      Se Milas velkomstvideo 📹
    </h3>
    <div className="w-full aspect-video bg-zinc-200 rounded-xl overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        className="rounded-xl"
        src="https://www.youtube.com/embed/OrTuo4VyTCs"
        title="YouTube video player"

        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  </section>
);

const AppDownloadSection = () => (
  <section className="mb-10">
    <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
      Last ned Myluck-appen 📱
    </h3>
    <div className="space-y-3">
      <AppDownloadLink
        href="https://apps.apple.com/no/app/myluck-by-mila/id6475083096"
        platform="iPhone"
        icon={<AppleIcon />}
      />
      <AppDownloadLink
        href="https://play.google.com/store/apps/details?id=io.everfit.wlmyluck&hl=no"
        platform="Android"
        icon={<AndroidIcon />}
      />
    </div>
  </section>
);

const AppDownloadLink: React.FC<{
  href: string;
  platform: string;
  icon: React.ReactNode;
}> = ({ href, platform, icon }) => (
  <a
    href={href}
    className="block w-full h-16 bg-[#f5f5f7] rounded-xl p-4 flex items-center hover:bg-neutral-200 transition-colors"
  >
    <div className="mr-4">{icon}</div>
    <div className="text-black text-base font-normal font-['Hind_Vadodara']">
      Last ned Myluck for {platform}
    </div>
  </a>
);

const FacebookSection = () => (
  <section className="mb-10">
    <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
      Bli med i Facebook-gruppen! 👥
    </h3>
    <p className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville'] mb-4">
      Det er her Myluck-magien skjer! Bli kjent med andre jenter på samme reise.
    </p>
    <a
      href={LINK_TO_FACEBOOK}
      className="block w-full h-20 bg-[#1877f2] rounded-xl border-2 border-black flex items-center justify-between p-6 pr-2 border-solid hover:bg-[#1464d6] transition-colors"
    >
      <div className="text-white text-base font-bold font-['Libre_Baskerville'] text-start">
        Klikk her for å bli med i <br />
        Myluck-fellesskapet
      </div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
        alt="Facebook logo"
        className="h-12 mr-2"
        loading="lazy"
      />
    </a>
  </section>
);

const WhatsIncludedSection = () => (
  <section className="mb-10">
    <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
      Dette får du i appen 🎁
    </h3>
    <div className="bg-green-50 rounded-xl p-6">
      <div className="space-y-3">
        <FeatureItem emoji="🥗" title="Personlig kostholdsplan" description="Skreddersydd etter dine preferanser og mål" />
        <FeatureItem emoji="🏋️‍♀️" title="Treningsprogram" description="For både hjemmet og treningssenteret" />
        <FeatureItem emoji="📚" title="Nesten 300 oppskrifter" description="Milas favorittoppskrifter - sunne og deilige!" />
        <FeatureItem emoji="🔴" title="Live-sendinger med Mila" description="Under Myluck Maraton - du får varsel i appen" />
      </div>
    </div>
  </section>
);

const FeatureItem: React.FC<{ emoji: string; title: string; description: string }> = ({
  emoji,
  title,
  description
}) => (
  <div className="flex items-start">
    <span className="mr-3">{emoji}</span>
    <div>
      <p className="text-sm font-semibold font-['Hind_Vadodara'] text-black">
        {title}
      </p>
      <p className="text-xs text-black/60 font-['Libre_Baskerville']">
        {description}
      </p>
    </div>
  </div>
);

const RemindersSection = () => (
  <section className="mb-10">
    <div className="bg-blue-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold font-['Hind_Vadodara'] mb-3 text-black">
        Viktig å huske 📌
      </h3>
      <div className="space-y-2 text-sm text-black/80 font-['Libre_Baskerville']">
        <p>• Mat- og treningsplanen kommer innen 48 timer</p>
        <p>• Sjekk søppelpost-mappen for e-post fra oss</p>
        <p>• Gå til "Ekstra" → "Lær mer" i appen for intro-video</p>
        <p>• Lagre passordet ditt et trygt sted</p>
      </div>
    </div>
  </section>
);

const SupportSection = () => (
  <section className="mb-8 text-center">
    <div className="p-6 bg-gray-50 rounded-xl">
      <h3 className="text-lg font-semibold font-['Hind_Vadodara'] mb-2 text-black">
        Trenger du hjelp? 💬
      </h3>
      <p className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville'] mb-2">
        Vi er her for deg! Kontakt kundestøtte på:
      </p>
      <a href="mailto:ask@myluck.no" className="text-blue-600 underline font-semibold text-lg">
        ask@myluck.no
      </a>
    </div>
  </section>
);

// Icon components
const AppleIcon = () => (
  <svg
    width="25"
    height="31"
    viewBox="0 0 25 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.2045 10.5679C24.0264 10.7074 20.8815 12.4961 20.8815 16.4734C20.8815 21.0738 24.8833 22.7013 25.0031 22.7416C24.9846 22.8408 24.3673 24.9705 22.8931 27.1405C21.5786 29.0501 20.2058 30.9566 18.1173 30.9566C16.0289 30.9566 15.4914 29.7321 13.0805 29.7321C10.731 29.7321 9.89558 30.9969 7.98526 30.9969C6.07494 30.9969 4.74201 29.2299 3.20946 27.0599C1.43428 24.5117 0 20.553 0 16.7958C0 10.7694 3.88206 7.5733 7.7027 7.5733C9.7328 7.5733 11.4251 8.9187 12.6996 8.9187C13.9128 8.9187 15.8047 7.4927 18.1143 7.4927C18.9896 7.4927 22.1345 7.5733 24.2045 10.5679ZM17.0178 4.9414C17.973 3.7975 18.6486 2.2103 18.6486 0.6231C18.6486 0.403 18.6302 0.1798 18.5903 0C17.0362 0.0589 15.1873 1.0447 14.0725 2.3498C13.1972 3.3542 12.3802 4.9414 12.3802 6.5503C12.3802 6.7921 12.4201 7.0339 12.4386 7.1114C12.5369 7.13 12.6966 7.1517 12.8563 7.1517C14.2506 7.1517 16.0043 6.2093 17.0178 4.9414Z"
      fill="black"
    />
  </svg>
);

const AndroidIcon = () => (
  <svg
    width="30"
    height="18"
    viewBox="0 0 30 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.9162 16.8129C29.9064 16.7514 29.897 16.6907 29.8868 16.63C29.8248 16.2534 29.7477 15.8811 29.6582 15.514C29.5008 14.8726 29.3029 14.2466 29.0667 13.6403C28.8671 13.1268 28.6397 12.6274 28.3875 12.1432C28.063 11.5215 27.6971 10.9248 27.2929 10.3572C26.7973 9.66172 26.2437 9.01012 25.6393 8.40968C25.3857 8.15733 25.1232 7.9138 24.8523 7.68048C24.2653 7.17369 23.6382 6.71222 22.9777 6.29973C22.9835 6.29019 22.9884 6.27998 22.9942 6.27044C23.2968 5.74756 23.6003 5.22534 23.9029 4.70245C24.1989 4.19196 24.4948 3.68146 24.7907 3.17101C25.0038 2.80461 25.2164 2.43745 25.4281 2.07104C25.4784 1.984 25.5181 1.89406 25.548 1.80193C25.6309 1.54521 25.6344 1.27535 25.568 1.02447C25.5511 0.962338 25.5306 0.901634 25.5056 0.842402C25.4807 0.783125 25.4517 0.725363 25.4187 0.669785C25.3055 0.479653 25.1437 0.314346 24.9405 0.193652C24.7609 0.0869088 24.5599 0.0232639 24.354 0.00499052C24.2675 -0.00231883 24.1806 -0.00160573 24.0941 0.00717441C24.0228 0.0144838 23.952 0.0276763 23.8815 0.0459496C23.6311 0.112492 23.3984 0.249988 23.2175 0.4489C23.1524 0.520567 23.0935 0.599589 23.0432 0.686588C22.8306 1.05299 22.618 1.42015 22.4059 1.78656L21.518 3.318C21.2154 3.84093 20.9119 4.3631 20.6093 4.88603C20.5763 4.94304 20.5429 5.00009 20.5099 5.05789C20.464 5.03958 20.4185 5.0213 20.3726 5.00374C18.7039 4.36747 16.8935 4.01939 15.0011 4.01939C14.9494 4.01939 14.8982 4.01939 14.846 4.0201C13.1635 4.0369 11.547 4.32945 10.0388 4.85457C9.8645 4.91527 9.69203 4.97963 9.52088 5.04693C9.49013 4.99354 9.45848 4.94014 9.42817 4.88675C9.12555 4.36382 8.82204 3.84164 8.51941 3.31871C8.22347 2.80826 7.92753 2.29777 7.63159 1.78727C7.41855 1.42087 7.20595 1.05375 6.99425 0.687346C6.94344 0.600302 6.88506 0.521325 6.81999 0.449658C6.63903 0.250701 6.40638 0.113205 6.1559 0.0466628C6.08548 0.0283894 6.01462 0.0152414 5.94286 0.00793209C5.85684 -0.00084805 5.76993 -0.00160573 5.68347 0.00570363C5.47756 0.0232639 5.27655 0.0869088 5.09649 0.19441C4.89326 0.315059 4.73281 0.480366 4.61871 0.670498C4.58573 0.726076 4.55631 0.783882 4.5318 0.843115C4.50684 0.902348 4.48545 0.963051 4.4694 1.02522C4.403 1.27606 4.40656 1.54593 4.48901 1.80265C4.51932 1.89482 4.55854 1.98476 4.60891 2.0718C4.82195 2.4382 5.03454 2.80532 5.24624 3.17172C5.54263 3.68222 5.83857 4.19272 6.13451 4.70317C6.43714 5.2261 6.74021 5.74827 7.04283 6.2712C7.04506 6.27557 7.04818 6.27998 7.05041 6.28435C6.43981 6.66395 5.85907 7.08446 5.31087 7.54446C4.9824 7.82021 4.66595 8.10906 4.36288 8.41111C3.75897 9.01154 3.20586 9.66319 2.70936 10.3587C2.30467 10.9262 1.93832 11.5223 1.61474 12.1447C1.36248 12.6288 1.13518 13.1283 0.935508 13.6418C0.699291 14.248 0.501403 14.874 0.344073 15.5154C0.254489 15.8826 0.178275 16.2541 0.115433 16.6315C0.105182 16.6922 0.0958213 16.7536 0.0864617 16.8143C0.0525891 17.033 0.0240674 17.2532 0 17.4748H30C29.9759 17.2532 29.9474 17.033 29.914 16.8143L29.9162 16.8129Z"
      fill="#34A853"
    />
  </svg>
);

