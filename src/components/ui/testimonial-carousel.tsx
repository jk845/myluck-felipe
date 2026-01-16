import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// @ts-expect-error - Missing types for swiper css
import "swiper/css";
// @ts-expect-error - Missing types for swiper pagination css
import "swiper/css/pagination";
import TestimonialCard from "./testimonial-card";

interface Testimonial {
  text: string;
  author: string;
  title: string;
  source: string;
  rating?: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials
}) => {
  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Pagination]}
        spaceBetween={10}
        centeredSlides={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            spaceBetween: 15,
          },
          1024: {
            spaceBetween: 30,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard 
              title={testimonial.title}
              text={testimonial.text}
              author={testimonial.author}
              source={testimonial.source}
              rating={testimonial.rating || 5}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialCarousel;