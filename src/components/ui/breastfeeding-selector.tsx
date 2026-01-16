import React from "react";
import { SingleChoiceButton } from "./single-choice-button";
import { VideoInfo } from "./video-info";

interface BreastfeedingSelectorProps {
  value: string | null;
  onChange: (value: string) => void;
  error?: string;
}

export const BreastfeedingSelector: React.FC<BreastfeedingSelectorProps> = ({
  value,
  onChange,
  error
}) => {
  const options = [
    { value: "no", label: "Nei", icon: "🌟" },
    { value: "yes", label: "Ja", icon: "🍼" }
  ];

  const videoInfo = {
    title: "Hvorfor spør vi om amming?",
    description: "Amming påvirker energiforbruket ditt og næringsbehov. Vi tilpasser trenings- og kostholdsplanen din basert på denne informasjonen for å sikre at du får nok næring og energi til både deg selv og barnet.",
    videoUrl: "https://www.youtube.com/embed/qclPcdv9-FQ"
  };

  return (
    <div className="" style={{ minHeight: '240px' }}>
      <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-8 text-black tracking-tighter text-left">
        Ammer du? 🍼
      </h3>
      <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] mb-4 leading-relaxed">
        Det er viktig at jeg har relevant info om din livssituasjon slik at planen passer deg der du er i livet
      </p>
      <div className="mb-6">
        <VideoInfo
          title={videoInfo.title}
          description={videoInfo.description}
          videoUrl={videoInfo.videoUrl}
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

export default BreastfeedingSelector;