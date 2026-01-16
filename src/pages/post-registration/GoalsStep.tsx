import { useForm } from "react-hook-form";
import ActionButton from "@/components/ui/action-button";
import { GoalsData } from "@/types/post-registration";
import { VideoInfo } from "@/components/ui/video-info";

interface GoalsStepProps {
  onNext: (data: GoalsData) => void;
  onBack: () => void;
  initialData: GoalsData | null;
}

const GoalsStep: React.FC<GoalsStepProps> = ({ onNext, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GoalsData>({
    defaultValues: initialData || {
      goal: '',
      pregnant: 'no',
      breastfeeding: 'no'
    },
    mode: "onTouched"
  });

  const watchedValues = watch();

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-12">
      <div>
        <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-4 text-black tracking-tighter">
          Dine mål og livssituasjon 🎯
        </h2>
        <p className="text-black/60 text-sm font-['Libre_Baskerville'] leading-relaxed">
          For å kunne lage det beste programmet for akkurat deg trenger vi informasjon om hva ditt overordnede mål er!
        </p>
      </div>

      {/* Main Goal */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold font-['Hind_Vadodara'] text-black tracking-tighter">
          Hva ønsker du å oppnå?
        </h3>
        <div className="space-y-4">
          <button
            type="button"
            className={`w-full flex items-center p-6 rounded-3xl transition-all duration-200 text-left ${
              watchedValues.goal === "weightloss"
                ? "bg-[#f5f5f7] ring-2 ring-black shadow-lg"
                : "bg-[#f5f5f7] hover:bg-neutral-200 hover:shadow-sm"
            }`}
            onClick={() => setValue("goal", "weightloss")}
          >
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
                Bli slank og definert
              </div>
              <div className="text-xs font-normal font-['Libre_Baskerville'] mt-1 text-black/60">
                Ned i vekt og få synlige, definerte magemuskler
              </div>
            </div>
            <span className="text-2xl ml-4">🔥</span>
          </button>

          <button
            type="button"
            className={`w-full flex items-center p-6 rounded-3xl transition-all duration-200 text-left ${
              watchedValues.goal === "musclegain"
                ? "bg-[#f5f5f7] ring-2 ring-black shadow-lg"
                : "bg-[#f5f5f7] hover:bg-neutral-200 hover:shadow-sm"
            }`}
            onClick={() => setValue("goal", "musclegain")}
          >
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
                Bygge muskler og styrke
              </div>
              <div className="text-xs font-normal font-['Libre_Baskerville'] mt-1 text-black/60">
                Øke muskelmasse, samme vekt eller mer er OK
              </div>
            </div>
            <span className="text-2xl ml-4">💪</span>
          </button>
        </div>
        <input type="hidden" {...register("goal", { required: "Vennligst velg ditt hovedmål" })} />
        {errors.goal && (
          <div className="flex items-center mt-2 ml-1">
            <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
            <p className="text-red-600 text-xs font-medium font-['Libre_Baskerville']">
              {errors.goal.message}
            </p>
          </div>
        )}
      </div>

      {/* Pregnancy Status */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold font-['Hind_Vadodara'] text-black tracking-tighter">
          Er du Gravid? 🤰
        </h3>
        <p className="text-black/60 text-sm font-['Libre_Baskerville'] leading-relaxed">
          Det er viktig at jeg har relevant info om din livssituasjon slik at planen passer deg der du er i livet
        </p>
        <div className="mb-4">
          <VideoInfo
            title="Hvorfor spør vi om graviditet?"
            description="Graviditet påvirker hvilke øvelser som er trygge og hvordan kroppen din responderer på trening. Vi tilpasser treningsprogrammet ditt basert på trimester for å sikre trygg og effektiv trening gjennom hele svangerskapet."
            videoUrl="https://www.youtube.com/embed/qclPcdv9-FQ"
          />
        </div>
        <div className="space-y-4">
          {[
            { value: "under3months", label: "Ja (under 3 måneder)", emoji: "👶" },
            { value: "over3months", label: "Ja (Mer enn 3 måneder)", emoji: "🤱" },
            { value: "no", label: "Nei", emoji: "🙅‍♀️" }
          ].map(option => (
            <button
              key={option.value}
              type="button"
              className={`w-full flex items-center p-6 rounded-3xl transition-all duration-200 ${
                watchedValues.pregnant === option.value
                  ? "bg-[#f5f5f7] ring-2 ring-black shadow-lg"
                  : "bg-[#f5f5f7] hover:bg-neutral-200 hover:shadow-sm"
              }`}
              onClick={() => setValue("pregnant", option.value)}
            >
              <span className="text-sm font-semibold font-['Hind_Vadodara'] tracking-tighter text-black flex-1">
                {option.label}
              </span>
              <span className="text-2xl ml-4">{option.emoji}</span>
            </button>
          ))}
        </div>
        <input type="hidden" {...register("pregnant", { required: "Vennligst velg alternativ" })} />
        {errors.pregnant && (
          <div className="flex items-center mt-2 ml-1">
            <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
            <p className="text-red-600 text-xs font-medium font-['Libre_Baskerville']">
              {errors.pregnant.message}
            </p>
          </div>
        )}
      </div>

      {/* Breastfeeding Status */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold font-['Hind_Vadodara'] text-black tracking-tighter">
          Ammer du? 🤱
        </h3>
        <p className="text-black/60 text-sm font-['Libre_Baskerville'] leading-relaxed">
          Det er viktig at jeg har relevant info om din livssituasjon slik at planen passer deg der du er i livet
        </p>
        <div className="mb-4">
          <VideoInfo
            title="Hvorfor spør vi om amming?"
            description="Amming påvirker energiforbruket ditt og næringsbehov. Vi tilpasser trenings- og kostholdsplanen din basert på denne informasjonen for å sikre at du får nok næring og energi til både deg selv og barnet."
            videoUrl="https://www.youtube.com/embed/qclPcdv9-FQ"
          />
        </div>
        <div className="space-y-4">
          {[
            { value: "yes", label: "Ja", emoji: "🍼" },
            { value: "no", label: "Nei", emoji: "🙅‍♀️" }
          ].map(option => (
            <button
              key={option.value}
              type="button"
              className={`w-full flex items-center p-6 rounded-3xl transition-all duration-200 ${
                watchedValues.breastfeeding === option.value
                  ? "bg-[#f5f5f7] ring-2 ring-black shadow-lg"
                  : "bg-[#f5f5f7] hover:bg-neutral-200 hover:shadow-sm"
              }`}
              onClick={() => setValue("breastfeeding", option.value)}
            >
              <span className="text-sm font-semibold font-['Hind_Vadodara'] tracking-tighter text-black flex-1">
                {option.label}
              </span>
              <span className="text-2xl ml-4">{option.emoji}</span>
            </button>
          ))}
        </div>
        <input type="hidden" {...register("breastfeeding", { required: "Vennligst velg alternativ" })} />
        {errors.breastfeeding && (
          <div className="flex items-center mt-2 ml-1">
            <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
            <p className="text-red-600 text-xs font-medium font-['Libre_Baskerville']">
              {errors.breastfeeding.message}
            </p>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="mt-12">
        <ActionButton type="submit">
          Neste 🚀
        </ActionButton>
      </div>
    </form>
  );
};

export default GoalsStep;