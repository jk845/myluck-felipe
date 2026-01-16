import { useForm } from "react-hook-form";
import ActionButton from "@/components/ui/action-button";
import { MotivationFormData } from "@/types/registration";

interface MotivationStepProps {
  onNext: (data: MotivationFormData) => void;
  initialData: MotivationFormData | null | undefined;
}

const MotivationStep: React.FC<MotivationStepProps> = ({ onNext, initialData }) => {
  const {
    register: registerMotivation,
    handleSubmit: handleSubmitMotivation,
  } = useForm<MotivationFormData>({
    mode: "onTouched",
    defaultValues: initialData || {
      motivation: '1-3' as const,
      fitnessGoal: 'weightloss' as const,
      trainingFrequency: 'none' as const, // Default value
      previousObstacles: [] // Default empty
    }
  });

  return (
    <form onSubmit={handleSubmitMotivation((data: MotivationFormData) => onNext(data))}>
      <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-6 text-black tracking-tighter">
        La oss lage din personlige plan! 💪
      </h2>
      <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] mb-8 leading-relaxed">
        Svar på noen raske spørsmål så jeg kan tilpasse programmet perfekt for deg.
      </p>

      {/* Motivation question - Hidden but keeps default value */}
      <div className="hidden">
        <input type="hidden" {...registerMotivation("motivation")} value="1-3" />
      </div>

      {/* Hidden goal field with default value */}
      <input type="hidden" {...registerMotivation("fitnessGoal")} value="weightloss" />

      {/* Hidden fields with default values */}
      <input type="hidden" {...registerMotivation("trainingFrequency")} value="none" />
      <input type="hidden" {...registerMotivation("previousObstacles")} value={[]} />

      {/* Navigation button */}
      <div className="mt-12">
        <ActionButton
          type="submit"
        >
          Neste: Velg abonnement
        </ActionButton>
      </div>
    </form>
  );
};

export default MotivationStep; 