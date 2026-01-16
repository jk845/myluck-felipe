import { useForm } from "react-hook-form";
import ActionButton from "@/components/ui/action-button";
import { PersonalInfoData } from "@/types/post-registration";

interface PersonalInfoStepProps {
  onNext: (data: PersonalInfoData) => void;
  onBack: () => void;
  initialData: PersonalInfoData | null;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ onNext, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoData>({
    defaultValues: initialData || {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      instagram: ''
    },
    mode: "onTouched"
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-4 text-black tracking-tighter">
          Personlig informasjon 📋
        </h2>
        <p className="text-black/60 text-sm font-['Libre_Baskerville'] leading-relaxed">
          Vi trenger disse opplysningene for å sette opp profilen din.
        </p>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div className="relative" style={{ minHeight: '80px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none z-10">
            Fornavn
          </label>
          <input
            type="text"
            className={`w-full h-20 px-5 pt-8 pb-3 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 ${
              errors.name
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
            }`}
            {...register("name", { required: "Fornavn er påkrevd" })}
            placeholder="Anna"
          />
          {errors.name && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errors.name.message}
              </p>
            </div>
          )}
        </div>

        {/* Last Name */}
        <div className="relative" style={{ minHeight: '80px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none z-10">
            Etternavn
          </label>
          <input
            type="text"
            className={`w-full h-20 px-5 pt-8 pb-3 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 ${
              errors.lastName
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
            }`}
            {...register("lastName", { required: "Etternavn er påkrevd" })}
            placeholder="Hansen"
          />
          {errors.lastName && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errors.lastName.message}
              </p>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="relative" style={{ minHeight: '100px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none z-10">
            E-post
          </label>
          <input
            type="email"
            className={`w-full h-20 px-5 pt-8 pb-3 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 ${
              errors.email
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
            }`}
            {...register("email", {
              required: "E-post er påkrevd",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Vennligst skriv inn en gyldig e-postadresse",
              },
            })}
            placeholder="anna@example.com"
          />
          <p className="text-xs text-gray-500 font-['Libre_Baskerville'] mt-2 px-5">
            Hvis du har vært med før og brukt appen så er det viktig du oppgir samme mail som tidligere for å beholde brukeren din
          </p>
          {errors.email && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errors.email.message}
              </p>
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="relative" style={{ minHeight: '80px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none z-10">
            Mobilnummer
          </label>
          <input
            type="tel"
            className={`w-full h-20 px-5 pt-8 pb-3 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 ${
              errors.phone
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
            }`}
            {...register("phone", { required: "Mobilnummer er påkrevd" })}
            placeholder="+47 123 45 678"
          />
          {errors.phone && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errors.phone.message}
              </p>
            </div>
          )}
        </div>

        {/* Instagram */}
        <div className="relative" style={{ minHeight: '80px' }}>
          <label className="absolute left-12 top-4 text-xs font-medium text-gray-600 pointer-events-none z-10">
            Instagram (valgfritt)
          </label>
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold z-10">
            @
          </div>
          <input
            type="text"
            className="w-full h-20 px-5 pt-8 pb-3 pl-12 rounded-2xl border-2 border-gray-100 bg-gray-50/50 focus:border-fuchsia-300 focus:bg-white focus:ring-4 focus:ring-fuchsia-50 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400"
            {...register("instagram")}
            placeholder="brukernavn"
          />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12">
        <ActionButton type="submit">
          Neste 💪
        </ActionButton>
      </div>
    </form>
  );
};

export default PersonalInfoStep;