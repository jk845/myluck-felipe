import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ActionButton from "@/components/ui/action-button";
import IOSWheelPicker from "@/components/ui/ios-wheel-picker";
import MobileFormError from "@/components/ui/mobile-form-error";
import { PhysicalDataFormData } from "@/types/registration";
import { useSearchParams } from "react-router-dom";

interface PhysicalDataStepProps {
  onNext: (data: PhysicalDataFormData) => void;
  initialData: PhysicalDataFormData | null | undefined;
}

const PhysicalDataStepHorizontal: React.FC<PhysicalDataStepProps> = ({ onNext, initialData }) => {
  const [searchParams] = useSearchParams();
  const isSimplified = searchParams.get('simplified') === 'true';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [weight, setWeight] = useState(initialData?.weight ? parseInt(initialData.weight) : 70);
  const [height, setHeight] = useState(initialData?.height ? parseInt(initialData.height) : 165);
  const [age, setAge] = useState(initialData?.age ? parseInt(initialData.age) : 35);
  const [pregnancyStatus, setPregnancyStatus] = useState<'not_pregnant' | 'pregnant' | 'postpartum'>(
    initialData?.pregnancyStatus || 'not_pregnant'
  );
  const [breastfeedingStatus, setBreastfeedingStatus] = useState<'yes' | 'no'>(
    initialData?.breastfeedingStatus || 'no'
  );
  const [mobileErrors, setMobileErrors] = useState<{ weight?: { message?: string }, height?: { message?: string }, age?: { message?: string } }>({});
  
  const {
    register: registerPhysical,
    handleSubmit: handleSubmitPhysical,
    formState: { errors: errorsPhysical },
    trigger: triggerPhysical,
    setValue,
  } = useForm<PhysicalDataFormData>({
    mode: "onTouched",
    defaultValues: initialData || {
      weight: "",
      height: "",
      age: ""
    }
  });
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    setValue('weight', weight.toString());
    setValue('height', height.toString());
    setValue('age', age.toString());
    if (isSimplified) {
      setValue('pregnancyStatus', pregnancyStatus as 'not_pregnant' | 'pregnant' | 'postpartum');
      setValue('breastfeedingStatus', breastfeedingStatus as 'yes' | 'no');
    }
  }, [weight, height, age, pregnancyStatus, breastfeedingStatus, setValue, isSimplified]);
  
  const handleFormSubmit = async () => {
    // Clear previous errors
    setMobileErrors({});
    
    // Validate the values before submitting
    const errors: typeof mobileErrors = {};
    
    if (weight < 30 || weight > 150) {
      errors.weight = { message: 'Vekt må være mellom 30 og 150 kg' };
    }
    
    if (height < 120 || height > 220) {
      errors.height = { message: 'Høyde må være mellom 120 og 220 cm' };
    }
    
    if (age < 16 || age > 120) {
      errors.age = { message: 'Du må være minst 16 år for å registrere deg' };
    }
    
    if (Object.keys(errors).length > 0) {
      setMobileErrors(errors);
      // Vibrate on error if supported
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
      return;
    }
    
    const data: PhysicalDataFormData = {
      weight: weight.toString(),
      height: height.toString(),
      age: age.toString()
    };

    if (isSimplified) {
      data.pregnancyStatus = pregnancyStatus as 'not_pregnant' | 'pregnant' | 'postpartum';
      data.breastfeedingStatus = breastfeedingStatus as 'yes' | 'no';
    }

    onNext(data);
  };
  
  // Debug mobile detection
  console.log('isMobile:', isMobile, 'width:', window.innerWidth, 'userAgent:', navigator.userAgent);
  
  if (isMobile) {
    return (
      <form onSubmit={handleSubmitPhysical(handleFormSubmit)} aria-label="Fysiske data skjema">
        <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-6 text-black tracking-tighter">
          Om din kropp
        </h2>
        <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] mb-8 leading-relaxed">
          Vi trenger disse opplysningene for å lage den beste trenings- og kostholdsplanen for deg.
        </p>
        
        <MobileFormError errors={mobileErrors} />
        
        <div className="relative bg-white rounded-3xl border-2 border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-transparent pointer-events-none" />
          
          <div className="relative p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* Weight */}
              <div>
                <div className="text-center mb-2">
                  <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Vekt</div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{weight}<span className="text-sm sm:text-base font-normal text-gray-600 ml-0.5 sm:ml-1">kg</span></div>
                </div>
                <IOSWheelPicker
                  min={30}
                  max={150}
                  value={weight}
                  onChange={setWeight}
                  suffix="kg"
                  className="bg-gray-50/50"
                  aria-label="Velg vekt i kilogram"
                />
              </div>
              
              {/* Height */}
              <div>
                <div className="text-center mb-2">
                  <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Høyde</div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{height}<span className="text-sm sm:text-base font-normal text-gray-600 ml-0.5 sm:ml-1">cm</span></div>
                </div>
                <IOSWheelPicker
                  min={120}
                  max={220}
                  value={height}
                  onChange={setHeight}
                  suffix="cm"
                  className="bg-gray-50/50"
                  aria-label="Velg høyde i centimeter"
                />
              </div>
              
              {/* Age */}
              <div>
                <div className="text-center mb-2">
                  <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Alder</div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{age}<span className="text-sm sm:text-base font-normal text-gray-600 ml-0.5 sm:ml-1">år</span></div>
                </div>
                <IOSWheelPicker
                  min={16}
                  max={120}
                  value={age}
                  onChange={setAge}
                  suffix="år"
                  className="bg-gray-50/50"
                  aria-label="Velg alder i år"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pregnancy questions for simplified mode */}
        {isSimplified && (
          <div className="mt-8 space-y-6">
            {/* Pregnancy Status */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Er du gravid eller har du nylig født?</p>
              <div className="space-y-2">
                <label className="flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                  style={{ borderColor: pregnancyStatus === 'not_pregnant' ? '#e879f9' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    value="not_pregnant"
                    checked={pregnancyStatus === 'not_pregnant'}
                    onChange={(e) => setPregnancyStatus(e.target.value as 'not_pregnant' | 'pregnant' | 'postpartum')}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      pregnancyStatus === 'not_pregnant' ? 'border-pink-500' : 'border-gray-300'
                    }`}>
                      {pregnancyStatus === 'not_pregnant' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                      )}
                    </div>
                    <span className="text-sm">Nei, jeg er ikke gravid</span>
                  </div>
                </label>

                <label className="flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                  style={{ borderColor: pregnancyStatus === 'pregnant' ? '#e879f9' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    value="pregnant"
                    checked={pregnancyStatus === 'pregnant'}
                    onChange={(e) => setPregnancyStatus(e.target.value as 'not_pregnant' | 'pregnant' | 'postpartum')}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      pregnancyStatus === 'pregnant' ? 'border-pink-500' : 'border-gray-300'
                    }`}>
                      {pregnancyStatus === 'pregnant' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                      )}
                    </div>
                    <span className="text-sm">Ja, jeg er gravid 🤰</span>
                  </div>
                </label>

                <label className="flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                  style={{ borderColor: pregnancyStatus === 'postpartum' ? '#e879f9' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    value="postpartum"
                    checked={pregnancyStatus === 'postpartum'}
                    onChange={(e) => setPregnancyStatus(e.target.value as 'not_pregnant' | 'pregnant' | 'postpartum')}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      pregnancyStatus === 'postpartum' ? 'border-pink-500' : 'border-gray-300'
                    }`}>
                      {pregnancyStatus === 'postpartum' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                      )}
                    </div>
                    <span className="text-sm">Jeg har født nylig (postpartum) 👶</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Breastfeeding Status */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Ammer du?</p>
              <div className="space-y-2">
                <label className="flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                  style={{ borderColor: breastfeedingStatus === 'no' ? '#e879f9' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    value="no"
                    checked={breastfeedingStatus === 'no'}
                    onChange={(e) => setBreastfeedingStatus(e.target.value as 'yes' | 'no')}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      breastfeedingStatus === 'no' ? 'border-pink-500' : 'border-gray-300'
                    }`}>
                      {breastfeedingStatus === 'no' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                      )}
                    </div>
                    <span className="text-sm">Nei</span>
                  </div>
                </label>

                <label className="flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                  style={{ borderColor: breastfeedingStatus === 'yes' ? '#e879f9' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    value="yes"
                    checked={breastfeedingStatus === 'yes'}
                    onChange={(e) => setBreastfeedingStatus(e.target.value as 'yes' | 'no')}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      breastfeedingStatus === 'yes' ? 'border-pink-500' : 'border-gray-300'
                    }`}>
                      {breastfeedingStatus === 'yes' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                      )}
                    </div>
                    <span className="text-sm">Ja, jeg ammer 🤱</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <ActionButton type="submit">
            Neste
          </ActionButton>
        </div>
      </form>
    );
  }
  
  return (
    <form onSubmit={handleSubmitPhysical(onNext)}>
      <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-6 text-black tracking-tighter">
        Om din kropp
      </h2>
      <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] mb-8 leading-relaxed">
        Vi trenger disse opplysningene for å lage den beste trenings- og kostholdsplanen for deg.
      </p>
      <div className="space-y-8">
        <div className="relative" style={{ minHeight: '80px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none transition-all duration-200 z-10">
            Vekt
          </label>
          <input
            type="number"
            inputMode="numeric"
            className={`w-full h-20 px-5 pt-8 pb-3 pr-16 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              errorsPhysical.weight
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
            }`}
            {...registerPhysical("weight", {
              required: "Vekt er påkrevd",
              validate: (value) =>
                ((!isNaN(Number(value)) && Number(value) > 25) && Number(value) < 150) ||
                "Vennligst skriv inn en gyldig vekt",
            })}
            placeholder="70"
          />
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-base font-semibold">
            kg
          </div>
          {errorsPhysical.weight && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errorsPhysical.weight.message}
              </p>
            </div>
          )}
        </div>

        <div className="relative" style={{ minHeight: '80px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none transition-all duration-200 z-10">
            Høyde
          </label>
          <input
            type="number"
            inputMode="numeric"
            className={`w-full h-20 px-5 pt-8 pb-3 pr-16 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              errorsPhysical.height
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
            }`}
            {...registerPhysical("height", {
              required: "Høyde er påkrevd",
              validate: (value) =>
                ((!isNaN(Number(value)) && Number(value) > 100) && Number(value) < 220) ||
                "Vennligst skriv inn en gyldig høyde",
            })}
            placeholder="165"
          />
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-base font-semibold">
            cm
          </div>
          {errorsPhysical.height && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errorsPhysical.height.message}
              </p>
            </div>
          )}
        </div>

        <div className="relative" style={{ minHeight: '80px' }}>
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none transition-all duration-200 z-10">
            Alder
          </label>
          <input
            type="number"
            inputMode="numeric"
            className={`w-full h-20 px-5 pt-8 pb-3 pr-16 rounded-2xl border-2 bg-gray-50/50 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              errorsPhysical.age
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-gray-100 focus:border-fuchsia-300 focus:ring-fuchsia-50'
            }`}
            {...registerPhysical("age", {
              required: "Alder er påkrevd",
              validate: (value) =>
                (!isNaN(Number(value)) && Number(value) >= 16 && Number(value) <= 120) ||
                "Du må være minst 16 år for å registrere deg",
            })}
            placeholder="35"
          />
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-base font-semibold">
            år
          </div>
          {errorsPhysical.age && (
            <div className="absolute left-5 bottom-1 flex items-center">
              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
              <p className="text-red-600 text-xs font-medium">
                {errorsPhysical.age.message}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pregnancy questions for simplified mode - Desktop */}
      {isSimplified && (
        <div className="mt-8 space-y-6">
          {/* Pregnancy Status */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">Er du gravid eller har du nylig født?</p>
            <div className="space-y-2">
              <label className="flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                style={{ borderColor: pregnancyStatus === 'not_pregnant' ? '#e879f9' : '#e5e7eb' }}>
                <input
                  type="radio"
                  value="not_pregnant"
                  checked={pregnancyStatus === 'not_pregnant'}
                  onChange={(e) => setPregnancyStatus(e.target.value as 'not_pregnant' | 'pregnant' | 'postpartum')}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                    pregnancyStatus === 'not_pregnant' ? 'border-pink-500' : 'border-gray-300'
                  }`}>
                    {pregnancyStatus === 'not_pregnant' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                    )}
                  </div>
                  <span className="text-sm">Nei, jeg er ikke gravid</span>
                </div>
              </label>

              <label className="flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                style={{ borderColor: pregnancyStatus === 'pregnant' ? '#e879f9' : '#e5e7eb' }}>
                <input
                  type="radio"
                  value="pregnant"
                  checked={pregnancyStatus === 'pregnant'}
                  onChange={(e) => setPregnancyStatus(e.target.value as 'not_pregnant' | 'pregnant' | 'postpartum')}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                    pregnancyStatus === 'pregnant' ? 'border-pink-500' : 'border-gray-300'
                  }`}>
                    {pregnancyStatus === 'pregnant' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                    )}
                  </div>
                  <span className="text-sm">Ja, jeg er gravid 🤰</span>
                </div>
              </label>

              <label className="flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                style={{ borderColor: pregnancyStatus === 'postpartum' ? '#e879f9' : '#e5e7eb' }}>
                <input
                  type="radio"
                  value="postpartum"
                  checked={pregnancyStatus === 'postpartum'}
                  onChange={(e) => setPregnancyStatus(e.target.value as 'not_pregnant' | 'pregnant' | 'postpartum')}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                    pregnancyStatus === 'postpartum' ? 'border-pink-500' : 'border-gray-300'
                  }`}>
                    {pregnancyStatus === 'postpartum' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                    )}
                  </div>
                  <span className="text-sm">Jeg har født nylig (postpartum) 👶</span>
                </div>
              </label>
            </div>
          </div>

          {/* Breastfeeding Status */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">Ammer du?</p>
            <div className="space-y-2">
              <label className="flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                style={{ borderColor: breastfeedingStatus === 'no' ? '#e879f9' : '#e5e7eb' }}>
                <input
                  type="radio"
                  value="no"
                  checked={breastfeedingStatus === 'no'}
                  onChange={(e) => setBreastfeedingStatus(e.target.value as 'yes' | 'no')}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                    breastfeedingStatus === 'no' ? 'border-pink-500' : 'border-gray-300'
                  }`}>
                    {breastfeedingStatus === 'no' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                    )}
                  </div>
                  <span className="text-sm">Nei</span>
                </div>
              </label>

              <label className="flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                style={{ borderColor: breastfeedingStatus === 'yes' ? '#e879f9' : '#e5e7eb' }}>
                <input
                  type="radio"
                  value="yes"
                  checked={breastfeedingStatus === 'yes'}
                  onChange={(e) => setBreastfeedingStatus(e.target.value as 'yes' | 'no')}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                    breastfeedingStatus === 'yes' ? 'border-pink-500' : 'border-gray-300'
                  }`}>
                    {breastfeedingStatus === 'yes' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                    )}
                  </div>
                  <span className="text-sm">Ja, jeg ammer 🤱</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <ActionButton
          type="button"
          onClick={async () => {
            const isValid = await triggerPhysical();
            if (isValid) {
              handleFormSubmit();
            }
          }}
        >
          Neste
        </ActionButton>
      </div>
    </form>
  );
};

export default PhysicalDataStepHorizontal;