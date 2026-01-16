import { useForm, Controller } from "react-hook-form";
import ActionButton from "@/components/ui/action-button";
import PhoneInput from "@/components/ui/phone-input";
import { ContactInfoFormData } from "@/types/registration";
import { analyticsService } from "@/services/analytics.service";

interface ContactInfoStepProps {
  onNext: (data: ContactInfoFormData) => void;
  initialData: ContactInfoFormData | null | undefined;
  subscriptionPlan?: '1month' | '6month' | '12month';
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({ onNext, initialData, subscriptionPlan }) => {
  // Set country to NO by default
  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    control,
    formState: { errors: errorsContact },
    trigger,
  } = useForm<ContactInfoFormData>({
    defaultValues: initialData || {
      country: "NO",
      phone: "",
      firstName: '',
      lastName: '',
      email: ''
    },
    mode: "onTouched"
  });

  const selectedCountry = "NO"; // Always use Norway

  // Determine button text based on subscription plan
  const getButtonText = () => {
    switch (subscriptionPlan) {
      case '1month':
        return 'Start 1 mnd nå';
      case '6month':
        return 'Start 6 mnd nå';
      case '12month':
      default:
        return 'Start 12 mnd nå';
    }
  };

  const handleFormSubmit = (data: ContactInfoFormData) => {
    // Track any validation errors if they exist
    if (Object.keys(errorsContact).length > 0) {
      Object.keys(errorsContact).forEach((field) => {
        analyticsService.trackFormValidationError(
          'contact-info',
          field,
          'required_field_missing'
        );
      });
    }
    onNext(data);
  };

  const handleFieldBlur = async (fieldName: keyof ContactInfoFormData) => {
    const isValid = await trigger(fieldName);
    if (!isValid && errorsContact[fieldName]) {
      analyticsService.trackFormValidationError(
        'contact-info',
        fieldName,
        errorsContact[fieldName]?.type || 'validation_error',
        {
          message: errorsContact[fieldName]?.message
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmitContact(handleFormSubmit)}>
      <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-2 text-black tracking-tighter">
        Kontaktinformasjon
      </h2>
      <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] mb-8 leading-relaxed">
        Vi trenger kontaktinformasjonen din for å opprette din konto.
      </p>
      <div className="space-y-4">
        {/* First name input */}
        <div className="relative" style={{ minHeight: '80px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none transition-all duration-200 z-10">
            Fornavn
          </label>
          <input
            type="text"
            autoComplete="given-name"
            className={`w-full h-20 px-5 pt-8 pb-3 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 ${errorsContact.firstName
              ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
              : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
              }`}
            {...registerContact("firstName", { required: "Fornavn er påkrevd" })}
            placeholder="Anna"
            onBlur={() => handleFieldBlur('firstName')}
          />
          {errorsContact.firstName && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errorsContact.firstName.message}
              </p>
            </div>
          )}
        </div>

        {/* Last name input */}
        <div className="relative" style={{ minHeight: '80px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none transition-all duration-200 z-10">
            Etternavn
          </label>
          <input
            type="text"
            autoComplete="family-name"
            className={`w-full h-20 px-5 pt-8 pb-3 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 ${errorsContact.lastName
              ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
              : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
              }`}
            {...registerContact("lastName", {
              required: "Etternavn er påkrevd",
            })}
            placeholder="Hansen"
            onBlur={() => handleFieldBlur('lastName')}
          />
          {errorsContact.lastName && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errorsContact.lastName.message}
              </p>
            </div>
          )}
        </div>

        {/* Email input */}
        <div className="relative" style={{ minHeight: '80px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none transition-all duration-200 z-10">
            E-post
          </label>
          <input
            type="email"
            autoComplete="email"
            className={`w-full h-20 px-5 pt-8 pb-3 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 ${errorsContact.email
              ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
              : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
              }`}
            {...registerContact("email", {
              required: "E-post er påkrevd",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Vennligst skriv inn en gyldig e-postadresse",
              },
            })}
            placeholder="anna@example.com"
            onBlur={() => handleFieldBlur('email')}
          />
          {errorsContact.email && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errorsContact.email.message}
              </p>
            </div>
          )}
        </div>

        {/* Hidden country field with default value */}
        <input type="hidden" {...registerContact("country")} value="NO" />

        {/* Phone input */}
        <div className="relative" style={{ zIndex: 10 }}>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Telefonnummer er påkrevd",
              validate: value =>
                value.replace(/\D/g, "").length >= 5 ||
                "Vennligst skriv inn et gyldig telefonnummer"
            }}
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                countryCode={selectedCountry}
                onCountryChange={() => { }} // Country is always NO
                error={errorsContact.phone?.message}
              />
            )}
          />
        </div>

      </div>

      {/* Navigation button */}
      <div className="mt-12">
        <ActionButton
          type="submit"
        >
          <div className="flex flex-col items-center justify-center leading-tight">
            <span>{getButtonText()}</span>
            <span className="text-[10px] font-normal opacity-70">Bekreft bestilling og betal</span>
          </div>
        </ActionButton>
      </div>
    </form>
  );
};

export default ContactInfoStep; 