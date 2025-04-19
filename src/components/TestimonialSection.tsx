
import React from 'react';
import Reviews from './Reviews';

const TestimonialSection = () => {
  return (
    <section id="team" className="bg-dental-beige py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-dental-navy mb-12">
          מטופלים מספרים עם חיוך
        </h2>
        <Reviews />
      </div>
    </section>
  );
};

export default TestimonialSection;
