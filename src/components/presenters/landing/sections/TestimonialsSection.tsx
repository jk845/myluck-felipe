import React from 'react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      title: "Verdt alt!",
      content: "Dette er det beste valget og investeringen jeg har gjort for meg selv noensinne! Superbra og godt gjennomført opplegg, ekstremt god faglig kompetanse og oppfølgning, og en hjertevarme som skinner gjennom. Dette anbefaler jeg på det sterkeste og jeg er så takknemlig.",
      author: "Deltaker i Myluck-maraton",
      source: "App Store"
    },
    {
      title: "Fantastisk reise!",
      content: "Mila har virkelig endret livet mitt. Ikke bare fysisk, men også mentalt. Jeg har aldri følt meg sterkere og mer selvsikker. Tusen takk for alt du gjør!",
      author: "Kristine, 34",
      source: "Facebook"
    }
  ];

  return (
    <section className="w-full h-screen bg-gray-50 flex items-center overflow-hidden">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-black text-xl sm:text-2xl md:text-3xl font-semibold font-['Hind_Vadodara'] leading-snug text-center mb-4 sm:mb-6">
          Dette er det andre Myluck damer har å si om Maraton
        </h2>
        
        <div className="space-y-4 sm:space-y-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-white rounded-[20px] sm:rounded-[30px] p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] relative ${index === 1 ? 'hidden sm:block' : ''}`}
            >
              {/* Quote marks */}
              <div className="absolute top-2 left-4 text-4xl text-purple-200 font-serif">"</div>
              <div className="absolute bottom-2 right-4 text-4xl text-purple-200 font-serif rotate-180">"</div>
              
              <h3 className="text-black text-lg sm:text-xl font-bold font-['Libre_Baskerville'] mb-3 sm:mb-4 relative z-10">
                {testimonial.title}
              </h3>
              
              <p className="text-black/80 text-xs sm:text-sm font-normal font-['Libre_Baskerville'] leading-relaxed mb-3 sm:mb-4 relative z-10">
                {testimonial.content}
              </p>
              
              <div className="border-t pt-4">
                <p className="text-black text-base sm:text-lg font-semibold font-['Hind_Vadodara']">
                  {testimonial.author}
                </p>
                <p className="text-black/60 text-sm font-medium font-['Hind_Vadodara']">
                  {testimonial.source}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Rating stars */}
        <div className="flex justify-center items-center gap-1 mt-4 sm:mt-6">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
          <span className="ml-2 text-black/70 text-sm font-medium font-['Hind_Vadodara']">
            4.9 av 5 stjerner
          </span>
        </div>
           <button 
          className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex mt-4 justify-center items-center transition-all hover:scale-105 hover:shadow-lg"
        >
          <span className="text-white text-xl font-semibold font-['Hind_Vadodara']">
            Bli med i Myluck nå!
          </span>
        </button>
      </div>
                   
    </section>
  );
};