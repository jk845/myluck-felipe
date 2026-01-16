import { useForm } from "react-hook-form";
import ActionButton from "@/components/ui/action-button";
import PregnancySelector from "@/components/ui/pregnancy-selector";
import BreastfeedingSelector from "@/components/ui/breastfeeding-selector";
import { SingleChoiceButton } from "@/components/ui/single-choice-button";
import { GoalsLifestyleFormData } from "@/types/registration";

interface GoalsLifestyleStepProps {
  onNext: (data: GoalsLifestyleFormData) => void;
  initialData: GoalsLifestyleFormData | null | undefined;
}

const GoalsLifestyleStep: React.FC<GoalsLifestyleStepProps> = ({ onNext, initialData }) => {
  const {
    register: registerGoals,
    handleSubmit: handleSubmitGoals,
    formState: { errors: errorsGoals },
    setValue: setGoalsValue,
    watch: watchGoals,
    trigger: triggerGoals,
  } = useForm<GoalsLifestyleFormData>({
    mode: "onTouched",
    defaultValues: initialData || {
      fitnessGoal: 'weightloss' as const,
      pregnancyStatus: 'not_pregnant',
      breastfeedingStatus: 'no'
    }
  });

  const watchedGoals = watchGoals();

  return (
    <form onSubmit={handleSubmitGoals(onNext)}>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-6 text-black tracking-tighter">
            Ditt mål og livssituasjon
          </h2>
          <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] mb-8 leading-relaxed">
            For å kunne lage det beste programmet for akkurat deg trenger vi informasjon om hva ditt overordnede mål er!
          </p>
        </div>

        {/* Goal selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-6 text-black tracking-tighter text-left">
            Hva er ditt hovedmål? ✨
          </h3>
          <div className="space-y-4 mb-6">
            <SingleChoiceButton
              label="Bli slank og definert"
              description="Fettforbrenning og muskeldefinisjon"
              emoji="🔥"
              isSelected={watchedGoals.fitnessGoal === "weightloss"}
              onClick={() => setGoalsValue("fitnessGoal", "weightloss")}
            />
            <SingleChoiceButton
              label="Bygge muskler og styrke"
              description="Øke muskelmasse og bli sterkere"
              emoji="💪"
              isSelected={watchedGoals.fitnessGoal === "musclegain"}
              onClick={() => setGoalsValue("fitnessGoal", "musclegain")}
            />
          </div>
          <input type="hidden" {...registerGoals("fitnessGoal")} />
          {errorsGoals.fitnessGoal && (
            <div className="flex items-center mt-2 ml-1">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium font-['Libre_Baskerville']">
                Vennligst velg ditt mål
              </p>
            </div>
          )}
        </div>

        {/* Pregnancy status */}
        <div className="mb-8">
          <PregnancySelector
            value={watchedGoals.pregnancyStatus}
            onChange={(value) => setGoalsValue("pregnancyStatus", value)}
            error={errorsGoals.pregnancyStatus?.message}
          />
          <input
            type="hidden"
            {...registerGoals("pregnancyStatus", { required: "Vennligst velg alternativ" })}
          />
        </div>

        {/* Breastfeeding status */}
        <div className="mb-8">
          <BreastfeedingSelector
            value={watchedGoals.breastfeedingStatus}
            onChange={(value) => setGoalsValue("breastfeedingStatus", value)}
            error={errorsGoals.breastfeedingStatus?.message}
          />
          <input
            type="hidden"
            {...registerGoals("breastfeedingStatus", { required: "Vennligst velg alternativ" })}
          />
        </div>

        {/* Navigation button */}
        <div className="mt-12">
          <ActionButton
            type="button"
            onClick={async () => {
              const isValid = await triggerGoals();
              if (isValid) {
                handleSubmitGoals(onNext)();
              }
            }}
          >
            Fullfør registrering
          </ActionButton>
        </div>
    </form>
  );
};

export default GoalsLifestyleStep; 