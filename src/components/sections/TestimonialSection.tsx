import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { RatingsDisplay } from '@/components/ratings/RatingsDisplay';
import 'swiper/swiper-bundle.css';

const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      title: 'Verdt alt!',
      text: 'Dette er det beste valget og investeringen jeg har gjort for meg selv noensinne! Superbra og godt gjennomført opplegg, ekstremt god faglig kompetanse og oppfølgning, og en hjertevarme som skinner gjennom. Dette anbefaler jeg på det sterkeste og jeg er så takknemlig.',
      author: 'Maria, 34 år',
      source: 'Myluck-medlem siden 2023'
    },
    {
      title: 'Fantastisk!',
      text: 'Jeg har aldri følt meg så sterk og selvsikker. Mila har gitt meg verktøyene jeg trengte for å ta kontroll over min egen helse og kropp. Støtten fra fellesskapet er uvurderlig!',
      author: 'Camilla, 28 år',
      source: 'Myluck-medlem siden 2024'
    },
    {
      title: 'Livsforandrende',
      text: 'Som småbarnsmor hadde jeg gitt opp håpet om å komme i form igjen. Men Myluck-programmet passer perfekt inn i min hektiske hverdag. Jeg er i bedre form nå enn før jeg fikk barn!',
      author: 'Solveig, 41 år',
      source: 'Myluck-medlem siden 2023'
    }
  ];
  
  return (
    <section className="py-12 px-6 bg-white w-full flex items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold font-['Hind_Vadodara'] text-center mb-12">
          Dette sier Myluck-damene
        </h2>

        <div className="w-full">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            centeredSlides={true}
            pagination={{ clickable: true }}
            className="mb-8"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-neutral-100 rounded-3xl p-8 md:p-12">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl">⭐</span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold font-['Libre_Baskerville'] mb-6">
                    "{testimonial.title}"
                  </h3>
                  
                  <p className="text-base md:text-lg font-['Libre_Baskerville'] mb-8">
                    "{testimonial.text}"
                  </p>
                  
                  <div>
                    <p className="font-semibold font-['Hind_Vadodara']">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-black/60 font-['Hind_Vadodara']">
                      {testimonial.source}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex justify-center">
          <RatingsDisplay mode="light" title="Hundrevis av 5-stjerners vurderinger" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
export { TestimonialSection };