
import React from 'react';
import Reviews from './Reviews';

const TestimonialSection = () => {
  return (
    <section id="team" className="bg-gradient-to-b from-white to-dental-beige/30 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            חוויות של מטופלים שלנו
          </h2>
          <p className="text-lg text-dental-navy/80 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            מטופלים מספרים על החוויה שלהם במרפאה שלנו
          </p>
          <div className="w-24 h-1 bg-dental-orange mx-auto mt-6 rounded-full opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]"></div>
        </div>
        <Reviews />
      </div>
    </section>
  );
};

export default TestimonialSection;
