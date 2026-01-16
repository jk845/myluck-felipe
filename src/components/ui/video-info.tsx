import React, { useState } from "react";

interface VideoInfoProps {
  title: string;
  description: string;
  videoUrl: string;
  className?: string;
}

export const VideoInfo: React.FC<VideoInfoProps> = ({
  title,
  description,
  videoUrl,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && !isVideoLoaded) {
      setIsVideoLoaded(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-left"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span className="text-sm text-gray-700 font-medium font-['Hind_Vadodara']">
            {title}
          </span>
        </div>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm text-gray-600 font-['Libre_Baskerville'] leading-relaxed">
              {description}
            </p>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          
          {isVideoLoaded && (
            <div className="relative w-full pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={videoUrl}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoInfo;