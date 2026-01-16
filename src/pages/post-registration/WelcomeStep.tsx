import ActionButton from "@/components/ui/action-button";
import { WelcomeData } from "@/types/post-registration";

interface WelcomeStepProps {
  onNext: (data: WelcomeData) => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  const handleNext = () => {
    onNext({ acknowledged: true });
  };

  return (
    <div className="space-y-10 text-center">
      {/* Header */}
      <div className="space-y-6">
        <h1 className="text-4xl font-normal font-['Averia_Serif_Libre'] text-black">
          myluck
        </h1>
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] tracking-tighter text-black leading-tight">
          Velkommen til MyLuck!
        </h2>
        <h3 className="text-xl font-semibold font-['Hind_Vadodara'] tracking-tighter text-black/80">
          Her begynner transformasjons reisen din
        </h3>
      </div>

      {/* Support Info */}
      <div className="bg-blue-50 p-6 rounded-2xl">
        <p className="text-center text-black/80 font-['Libre_Baskerville'] leading-relaxed">
          Om du har spørsmål eller problemer så kontakter du kundestøtte på:
          <br />
          <a href="mailto:ask@myluck.no" className="font-semibold text-blue-600 underline text-lg">
            ask@myluck.no
          </a>
        </p>
      </div>

      {/* Description */}
      <div className="space-y-4 max-w-sm mx-auto">
        <p className="text-black font-['Libre_Baskerville'] leading-relaxed text-lg">
          Først må jeg ha litt info om deg, etterpå vil du få spørsmål som vil hjelpe meg å skreddersy en plan til deg.
        </p>
      </div>

      {/* Action Button */}
      <ActionButton onClick={handleNext} className="w-full">
        La oss begynne! ✨
      </ActionButton>
    </div>
  );
};

export default WelcomeStep;