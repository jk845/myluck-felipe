import React, { useState } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { Navbar } from '@/components/Navbar';
import {
  HeroSection,
  FeaturesSection,
  AboutSection,
  TransformationsSection,
  PainPointsSection,
  CTASection,
  TestimonialsSection,
  HowItWorksSection,
  LessonsSection,
  MarathonSection
} from './sections';

interface LandingPresenterProps {
  onStartRegistration: () => void;
  onLeadMagnet: () => void;
}

export const LandingPresenter: React.FC<LandingPresenterProps> = ({
  onStartRegistration,
  onLeadMagnet
}) => {
  const [navMode, setNavMode] = useState<'dark' | 'light'>('dark');
  
  // Anchors for each section
  const anchors = [
    'hero',
    'features',
    'about',
    'transformations',
    'pain-points',
    'cta',
    'testimonials',
    'how-it-works',
    'lessons',
    'marathon'
  ];

  // Handle navigation color change based on section
  const handleLeave = (_: unknown, destination: { index: number }) => {
    // Hero section has dark nav, all others have light
    setNavMode(destination.index === 0 ? 'dark' : 'light');
  };

  return (
    <>
      <Navbar mode={navMode} />
      
      <ReactFullpage
        licenseKey={'YOUR-LICENSE-KEY'} // Get a license from fullpage.js
        scrollingSpeed={700}
        navigation={false}
        navigationPosition="right"
        anchors={anchors}
        onLeave={handleLeave}
        credits={{ enabled: false }}
        render={() => {
          return (
            <ReactFullpage.Wrapper>
              {/* Section 1: Hero */}
              <div className="section">
                <HeroSection 
                  onStartRegistration={onStartRegistration}
                  onLeadMagnet={onLeadMagnet}
                />
              </div>
              
              {/* Section 2: Features Grid */}
              <div className="section">
                <FeaturesSection />
              </div>
              
              {/* Section 3: About Mila */}
              <div className="section">
                <AboutSection />
              </div>
              
              {/* Section 4: Transformations */}
              <div className="section">
                <TransformationsSection 
                  onStartRegistration={onStartRegistration}
                />
              </div>
              
              {/* Section 5: Pain Points */}
              <div className="section">
                <PainPointsSection 
                  onStartRegistration={onStartRegistration}
                />
              </div>
              
              {/* Section 6: CTA Section */}
              <div className="section">
                <CTASection 
                  onStartRegistration={onStartRegistration}
                  onLeadMagnet={onLeadMagnet}
                />
              </div>
              
              {/* Section 7: Testimonials */}
              <div className="section">
                <TestimonialsSection />
              </div>
              
              {/* Section 8: How It Works */}
              <div className="section">
                <HowItWorksSection 
                  onStartRegistration={onStartRegistration}
                />
              </div>
              
              {/* Section 9: Lessons */}
              <div className="section">
                <LessonsSection />
              </div>
              
              {/* Section 10: Marathon */}
              <div className="section">
                <MarathonSection />
              </div>
          
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </>
  );
};