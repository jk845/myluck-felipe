import React from "react";
import { SingleChoiceButton } from "./single-choice-button";
import { VideoInfo } from "./video-info";

interface PregnancySelectorProps {
  value: string | null;
  onChange: (value: string) => void;
  error?: string;
}

export const PregnancySelector: React.FC<PregnancySelectorProps> = ({
  value,
  onChange,
  error
}) => {
  const options = [
    { value: "not_pregnant", label: "Nei", icon: "🌸" },
    { value: "early_pregnancy", label: "Ja (under 3 måneder)", icon: "🤱" },
    { value: "late_pregnancy", label: "Ja (mer enn 3 måneder)", icon: "🤰" }
  ];

  return (
    <div className="" style={{ minHeight: '360px' }}>
      <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-8 text-black tracking-tighter text-left">
        Er du gravid? 🤱
      </h3>
      <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] mb-4 leading-relaxed">
        Det er viktig at jeg har relevant info om din livssituasjon slik at planen passer deg der du er i livet
      </p>
      <div className="mb-6">
        <VideoInfo
          title="Hvorfor spør vi om graviditet?"
          description="Graviditet påvirker hvilke øvelser som er trygge og hvordan kroppen din responderer på trening. Vi tilpasser treningsprogrammet ditt basert på trimester for å sikre trygg og effektiv trening gjennom hele svangerskapet."
          videoUrl="https://www.youtube.com/embed/qclPcdv9-FQ"
        />
      </div>
      <div className="space-y-4 mb-6">
        {options.map((option) => (
          <SingleChoiceButton
            key={option.value}
            label={option.label}
            emoji={option.icon}
            isSelected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
      <div style={{ minHeight: '24px' }}>
        {error && (
          <div className="flex items-center mt-2 ml-1">
            <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
            <p className="text-red-600 text-xs font-medium font-['Libre_Baskerville']">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PregnancySelector;