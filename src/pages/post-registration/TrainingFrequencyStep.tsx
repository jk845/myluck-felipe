import { useForm } from "react-hook-form";
import ActionButton from "@/components/ui/action-button";
import { TrainingFrequencyData } from "@/types/post-registration";

interface TrainingFrequencyStepProps {
  onNext: (data: TrainingFrequencyData) => void;
  onBack: () => void;
  initialData: TrainingFrequencyData | null;
}

const TrainingFrequencyStep: React.FC<TrainingFrequencyStepProps> = ({ onNext, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TrainingFrequencyData>({
    defaultValues: initialData || {
      trainingFrequency: ''
    },
    mode: "onTouched"
  });

  const watchedValues = watch();

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-4 text-black tracking-tighter">
          Treningsfrekvens 🏃‍♀️
        </h2>
        <p className="text-black/60 text-sm font-['Libre_Baskerville'] leading-relaxed">
          Nå kommer det flere spørsmål slik at planen skal passe deg best mulig.
        </p>
      </div>

      {/* Training Frequency */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold font-['Hind_Vadodara'] text-black tracking-tighter">
          Hvor mye pleier du å trene?
        </h3>
        <div className="space-y-4">
          {[
            { value: "none", label: "Trener ikke per nå", emoji: "😴", description: "Klar for å starte reisen" },
            { value: "1-2_weekly", label: "Trener 1-2 ganger i uka", emoji: "🚶‍♀️", description: "Grunnleggende rutine" },
            { value: "3_plus_weekly", label: "Trener 3+ ganger i uken", emoji: "💪", description: "Aktiv livsstil" }
          ].map(option => (
            <button
              key={option.value}
              type="button"
              className={`w-full flex items-center p-6 rounded-3xl transition-all duration-200 ${
                watchedValues.trainingFrequency === option.value
                  ? "bg-[#f5f5f7] ring-2 ring-black shadow-lg"
                  : "bg-[#f5f5f7] hover:bg-neutral-200 hover:shadow-sm"
              }`}
              onClick={() => setValue("trainingFrequency", option.value)}
            >
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
                  {option.label}
                </div>
                <div className="text-xs font-normal font-['Libre_Baskerville'] mt-1 text-black/60">
                  {option.description}
                </div>
              </div>
              <span className="text-2xl ml-4">{option.emoji}</span>
            </button>
          ))}
        </div>
        <input type="hidden" {...register("trainingFrequency", { required: "Vennligst velg treningsfrekvens" })} />
        {errors.trainingFrequency && (
          <div className="flex items-center mt-2 ml-1">
            <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
            <p className="text-red-600 text-xs font-medium font-['Libre_Baskerville']">
              {errors.trainingFrequency.message}
            </p>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="mt-12">
        <ActionButton type="submit">
          Neste 🎯
        </ActionButton>
      </div>
    </form>
  );
};

export default TrainingFrequencyStep;