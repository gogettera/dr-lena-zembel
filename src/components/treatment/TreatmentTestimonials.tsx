
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { EnhancedCarousel, CarouselItem } from '@/components/ui/enhanced-carousel';
import { Star } from 'lucide-react';

interface TreatmentTestimonialsProps {
  treatmentType: string;
}

const TreatmentTestimonials: React.FC<TreatmentTestimonialsProps> = ({ treatmentType }) => {
  const { t } = useLanguage();
  
  // This would come from a real data source in a complete implementation
  const testimonials = [
    {
      id: 'testimonial1',
      name: 'Sarah L.',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui.',
      date: '2023-03-15'
    },
    {
      id: 'testimonial2',
      name: 'David M.',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui.',
      date: '2023-02-20'
    },
    {
      id: 'testimonial3',
      name: 'Rachel K.',
      rating: 4,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui.',
      date: '2023-01-10'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-dental-orange fill-dental-orange' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-2xl font-bold text-dental-navy mb-6">
          {t('patientExperiences')}
        </h3>
        
        <EnhancedCarousel className="w-full">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <Card className="h-full border-dental-beige/50 hover:border-dental-orange/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-dental-navy/80 mb-4 italic">"{testimonial.text}"</p>
                  <div className="mt-auto">
                    <p className="font-semibold text-dental-navy">{testimonial.name}</p>
                    <p className="text-sm text-dental-navy/60">
                      {new Date(testimonial.date).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </EnhancedCarousel>
      </CardContent>
    </Card>
  );
};

export default TreatmentTestimonials;
