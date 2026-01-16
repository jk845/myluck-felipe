import { useForm } from "react-hook-form";
import ActionButton from "@/components/ui/action-button";
import { PhysicalDataPostRegData } from "@/types/post-registration";

interface PhysicalDataPostRegStepProps {
  onNext: (data: PhysicalDataPostRegData) => void;
  onBack: () => void;
  initialData: PhysicalDataPostRegData | null;
}

const PhysicalDataPostRegStep: React.FC<PhysicalDataPostRegStepProps> = ({ onNext, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhysicalDataPostRegData>({
    defaultValues: initialData || { age: 0, height: 0, weight: 0 },
    mode: "onTouched"
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-4 text-black tracking-tighter">
          Fysiske data 📏
        </h2>
        <p className="text-black/60 text-sm font-['Libre_Baskerville'] leading-relaxed">
          Vi trenger oppdaterte målinger for å lage den beste planen for deg.
        </p>
      </div>

      <div className="space-y-6">
        {/* Age */}
        <div className="relative" style={{ minHeight: '80px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none z-10">
            Hvor gammel er du?
          </label>
          <input
            type="number"
            className={`w-full h-20 px-5 pt-8 pb-3 pr-16 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 ${
              errors.age
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
            }`}
            {...register("age", {
              required: "Alder er påkrevd",
              valueAsNumber: true,
              validate: (value) =>
                (typeof value === 'number' && value > 10 && value < 120) ||
                "Vennligst skriv inn en gyldig alder",
            })}
            placeholder="35"
          />
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-base font-semibold">
            år
          </div>
          {errors.age && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errors.age.message}
              </p>
            </div>
          )}
        </div>

        {/* Height */}
        <div className="relative" style={{ minHeight: '100px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none z-10">
            Hvor høy er du?
          </label>
          <input
            type="number"
            className={`w-full h-20 px-5 pt-8 pb-3 pr-16 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 ${
              errors.height
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
            }`}
            {...register("height", {
              required: "Høyde er påkrevd",
              valueAsNumber: true,
              validate: (value) =>
                (typeof value === 'number' && value > 100 && value < 220) ||
                "Vennligst skriv inn en gyldig høyde",
            })}
            placeholder="165"
          />
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-base font-semibold">
            cm
          </div>
          <p className="text-xs text-gray-500 font-['Libre_Baskerville'] mt-2 px-5">
            Hvis du ikke er sikker eller det er lenge siden du har målt - gjerne mål på nytt slik at vi har mest mulig oppdatert data!
          </p>
          {errors.height && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errors.height.message}
              </p>
            </div>
          )}
        </div>

        {/* Weight */}
        <div className="relative" style={{ minHeight: '120px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none z-10">
            Hvor mye veier du?
          </label>
          <input
            type="number"
            className={`w-full h-20 px-5 pt-8 pb-3 pr-16 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 ${
              errors.weight
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
            }`}
            {...register("weight", {
              required: "Vekt er påkrevd",
              valueAsNumber: true,
              validate: (value) =>
                (typeof value === 'number' && value > 25 && value < 150) ||
                "Vennligst skriv inn en gyldig vekt",
            })}
            placeholder="70"
          />
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-base font-semibold">
            kg
          </div>
          <p className="text-xs text-gray-500 font-['Libre_Baskerville'] mt-2 px-5">
            Hvis du ikke er sikker eller det er lenge siden du har veid deg - gjerne vei deg på nytt! Hvis du har mulighet, gjerne vei deg om morgenen, på tom mage.
          </p>
          {errors.weight && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errors.weight.message}
              </p>
            </div>
          )}
        </div>
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

export default PhysicalDataPostRegStep;