
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useDirectionalStyles } from '@/utils/direction';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  treatment: string;
}

const TestimonialsSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const dir = useDirectionalStyles();

  // Get testimonials from translations
  const testimonials = t('botoxTreatments.testimonials', { returnObjects: true }) as Testimonial[];

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.testimonialsTitle')}
        subtitle={t('botoxTreatments.testimonialsSubtitle')}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={index} 
            className={`p-6 bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-md rounded-xl ${dir.textAlign}`}
          >
            <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-dental-orange fill-dental-orange" />
              ))}
            </div>
            
            <div className="relative">
              <Quote className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-8 h-8 text-dental-orange/20 -translate-y-1/2 ${isRTL ? '-translate-x-1/3' : 'translate-x-1/3'}`} />
              <p className="text-dental-navy/80 mb-4 italic">
                "{testimonial.text}"
              </p>
            </div>
            
            <div className={`mt-6 pt-4 border-t border-dental-beige/30 flex ${dir.flexDir} justify-between items-center`}>
              <div>
                <p className="font-medium text-dental-navy">{testimonial.name}</p>
                <p className="text-sm text-dental-navy/60">{testimonial.treatment}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <a 
          href="#" 
          className="text-dental-orange hover:text-dental-orange/80 font-medium transition-colors"
        >
          {t('botoxTreatments.readFullReview')}
        </a>
      </div>
    </Container>
  );
};

export default TestimonialsSection;
