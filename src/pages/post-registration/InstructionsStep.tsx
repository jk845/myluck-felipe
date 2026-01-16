import { useState, useEffect } from 'react';
import ActionButton from "@/components/ui/action-button";
import { registrationService } from '@/services/registration.service';

const LINK_TO_FACEBOOK = 'https://www.facebook.com/groups/myluckcommunity';

interface InstructionsStepProps {
  onFinish: () => void;
  customerInfo?: {
    email: string;
    password?: string;
  };
  orderId?: string;
}

const InstructionsStep: React.FC<InstructionsStepProps> = ({ onFinish, customerInfo, orderId }) => {
  const [password, setPassword] = useState<string>('');
  const [isLoadingPassword, setIsLoadingPassword] = useState(true);

  useEffect(() => {
    const fetchPassword = async () => {
      if (!customerInfo?.email) {
        setIsLoadingPassword(false);
        return;
      }

      try {
        const response = await registrationService.getUserCredentials(customerInfo.email, orderId);
        if (response.success && response.userData?.password) {
          setPassword(response.userData.password);
        } else {
          setPassword('Passord vil bli sendt på e-post. Hvis du allerede har et passord (ditt gamle), kan du bruke det.');
        }
      } catch (error) {
        console.error('Error fetching password:', error);
        setPassword('Passord vil bli sendt på e-post.');
      } finally {
        setIsLoadingPassword(false);
      }
    };

    fetchPassword();
  }, [customerInfo?.email, orderId]);
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
          Hva skjer nå?
        </h1>
        <p className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville']">
          Se forklaringsvideoen og veiledningen nedenfor!
        </p>
      </div>

      {/* Video Guide */}
      <div className="space-y-4">
        <div className="text-black text-base font-semibold font-['Hind_Vadodara']">
          Videoveiledning fra Mila
        </div>
        <div className="w-full aspect-video bg-zinc-200 rounded-xl flex items-center justify-center">
          <iframe 
            width="100%" 
            height="100%" 
            className="rounded-xl" 
            src="https://www.youtube.com/embed/OrTuo4VyTCs" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Text Instructions */}
      <div className="space-y-4">
        <div className="text-black text-base font-semibold font-['Hind_Vadodara']">
          Veiledning i tekstformat
        </div>
        <div className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville'] space-y-2">
          <p>
            1. Last ned{" "}
            <a href="https://apps.apple.com/no/app/myluck-by-mila/id6475083096" className="text-indigo-500 underline">
              iPhone app
            </a>{" "}
            eller{" "}
            <a href="https://play.google.com/store/apps/details?id=io.everfit.wlmyluck&hl=no" className="text-indigo-500 underline">
              Android App
            </a> 📱
          </p>
          <p>
            2. Bruk innloggingsinformasjonen din nedenfor (du får den også på e-post) 🔐
          </p>
          <p>
            3. Hvis du ikke ser e-posten fra oss, husk å sjekke{" "}
            <span className="font-bold">søppelpost-mappen</span> nøye 📬🚫
          </p>
          <p>
            4. Bli med i den private Facebook-gruppen{" "}
            <a href={LINK_TO_FACEBOOK} className="text-indigo-500 font-bold underline">
              her
            </a> 👥
          </p>
          <p>5. Appen inneholder:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Kostholdsplanen din 🥗</li>
            <li>Treningsprogram for hjemmet og treningssenteret 🏋️‍♀️🏠</li>
            <li>Ekstra materiell 🎁</li>
          </ul>
          <p>
            6. Direktesendinger med Mila skjer kun under Myluck Maraton 🔴<br />
            7. Du får et varsel i appen i forkant av kommende direktesendinger 🔔
          </p>
        </div>
      </div>

      {/* Facebook Group */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold font-['Hind_Vadodara']">
          Bli med i privat Facebook-gruppe!
        </h3>
        <p className="text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville']">
          Det er her Myluck-magien skjer ❤️
        </p>
        <a
          href={LINK_TO_FACEBOOK}
          className="block w-full h-20 bg-[#1877f2] rounded-xl border-2 border-black flex items-center justify-between p-6 pr-2 border-solid hover:bg-[#1464d6] transition-colors"
        >
          <div className="text-white text-base font-bold font-['Libre_Baskerville'] text-start">
            Magisk lenke til <br />
            Myluck-fellesskapet
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
            alt="Facebook logo"
            className="h-12 mr-2"
            loading="lazy"
          />
        </a>
      </div>

      {/* Login Credentials */}
      {customerInfo && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold font-['Hind_Vadodara']">
            Dine innloggingsdetaljer 🔑
          </h3>
          <div className="bg-[#f5f5f7] rounded-xl p-6 space-y-4">
            <div>
              <p className="text-sm text-black/60 font-['Libre_Baskerville'] mb-1">Brukernavn</p>
              <p className="text-lg font-semibold font-['Hind_Vadodara'] text-black">{customerInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-black/60 font-['Libre_Baskerville'] mb-1">Passord</p>
              <p className="text-lg font-semibold font-['Hind_Vadodara'] text-black">
                {isLoadingPassword ? 'Laster...' : password}
              </p>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-xs text-yellow-800">
                💡 Tips: Ta skjermbilde eller skriv ned disse detaljene. Du får dem også på e-post!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* App Download */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold font-['Hind_Vadodara']">
          Last ned Myluck app.
        </h3>
        <a
          href="https://apps.apple.com/no/app/myluck-by-mila/id6475083096"
          className="block w-full h-16 bg-[#f5f5f7] rounded-xl p-4 flex items-center hover:bg-neutral-200 transition-colors"
        >
          <div className="mr-4">
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
          </div>
          <div className="text-black text-base font-normal font-['Hind_Vadodara']">
            Last ned Myluck for iPhone
          </div>
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=io.everfit.wlmyluck&hl=no"
          className="block w-full h-16 bg-[#f5f5f7] rounded-xl p-4 flex items-center hover:bg-neutral-200 transition-colors"
        >
          <div className="mr-4">
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
          </div>
          <div className="text-black text-base font-normal font-['Hind_Vadodara']">
            Last ned Myluck for Android
          </div>
        </a>
      </div>

      {/* Support */}
      <div className="p-6 bg-blue-50 rounded-2xl">
        <h2 className="text-lg font-semibold font-['Hind_Vadodara'] mb-3 text-black">
          Spørsmål eller problemer?
        </h2>
        <div className="space-y-3 text-black/80 font-['Libre_Baskerville'] text-sm leading-relaxed">
          <p>
            Skriv til oss på Epost
          </p>
          <p className="text-center mt-4">
            <a href="mailto:ask@myluck.no" className="font-semibold text-blue-600 underline text-lg">
              ask@myluck.no
            </a> ❤️
          </p>
        </div>
      </div>

      <ActionButton onClick={onFinish}>
        Se dine innloggingsdetaljer
      </ActionButton>
    </div>
  );
};

export default InstructionsStep;