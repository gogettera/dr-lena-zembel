
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';

const Testimonials = () => {
  const { t, language } = useLanguage();
  
  // Define testimonials data with translation keys
  const testimonials = [
    {
      id: 'testimonial1',
      nameKey: 'testimonials.testimonial1.name',
      titleKey: 'testimonials.testimonial1.title', 
      contentKey: 'testimonials.testimonial1.content',
      initial: language === 'he' ? 'מ' : 'M'
    },
    {
      id: 'testimonial2',
      nameKey: 'testimonials.testimonial2.name',
      titleKey: 'testimonials.testimonial2.title',
      contentKey: 'testimonials.testimonial2.content', 
      initial: language === 'he' ? 'ר' : 'R'
    },
    {
      id: 'testimonial3',
      nameKey: 'testimonials.testimonial3.name',
      titleKey: 'testimonials.testimonial3.title',
      contentKey: 'testimonials.testimonial3.content',
      initial: language === 'he' ? 'א' : 'A'
    }
  ];
  
  return (
    <section id="testimonials" className="py-16 bg-dental-beige/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-dental-navy text-center mb-3">
          <TranslatedText textKey="childrenDentistry.testimonials.title" />
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          <TranslatedText textKey="childrenDentistry.testimonials.subtitle" />
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-dental-beige rounded-full flex items-center justify-center mr-4">
                  <span className="text-dental-navy font-bold">{testimonial.initial}</span>
                </div>
                <div>
                  <h3 className="font-semibold">
                    <TranslatedText textKey={testimonial.nameKey} />
                  </h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                <TranslatedText textKey={testimonial.contentKey} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
