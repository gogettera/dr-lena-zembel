
import React from 'react';
import Reviews from './Reviews';

const TestimonialSection = () => {
  return (
    <section id="team" className="bg-gradient-to-b from-dental-beige to-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-dental-navy mb-16 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          מטופלים מספרים עם חיוך
        </h2>
        <Reviews />
      </div>
    </section>
  );
};

export default TestimonialSection;
