
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';
import { EnhancedCarousel, CarouselItem } from '@/components/ui/enhanced-carousel';
import { EnhancedImage } from '@/components/ui/enhanced-image';

interface Testimonial {
  name: string;
  treatment: string;
  rating: number;
  text: string;
  image?: string;
}

const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();
  
  // Sample testimonials
  const testimonials: Testimonial[] = [
    {
      name: "מירב כהן",
      treatment: "טיפול בוטוקס",
      rating: 5,
      text: "נהניתי מאוד מהטיפול של ד\"ר לנה. היא מקצועית, עדינה ומקשיבה לצרכים שלי. התוצאה נראית טבעית ומחמיאה, בדיוק כפי שרציתי.",
      image: "/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg"
    },
    {
      name: "רונית לוי",
      treatment: "מילוי שפתיים בחומצה היאלרונית",
      rating: 5,
      text: "זה היה הטיפול הראשון שלי במילוי שפתיים וד\"ר לנה הפכה את החוויה לנעימה ומרגיעה. התוצאה עדינה וטבעית בדיוק כמו שביקשתי.",
      image: "/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
    },
    {
      name: "דן אברהמי",
      treatment: "טיפול בוטוקס במצח",
      rating: 4,
      text: "המרפאה מקצועית ונעימה, ד\"ר לנה הסבירה לי את כל התהליך והתוצאות היו טובות מאוד. אחזור בהחלט בעוד מספר חודשים.",
      image: "/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
    }
  ];

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.testimonialsTitle')}
        subtitle="מה אומרים המטופלים שלנו על טיפולי הבוטוקס והחומצה ההיאלרונית"
      />
      
      <div className="mt-12">
        <EnhancedCarousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
          autoplay={5000}
        >
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-2">
              <TestimonialCard testimonial={testimonial} />
            </CarouselItem>
          ))}
        </EnhancedCarousel>
      </div>
      
      <div className="mt-8 text-center">
        <a
          href="#"
          className="text-dental-navy hover:text-dental-orange transition-colors inline-flex items-center"
        >
          {t('readFullReview')} →
        </a>
      </div>
    </Container>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <Card className="border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon 
                key={i}
                className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`}
                fill={i < testimonial.rating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          
          <p className="text-dental-navy mb-4 text-right">"{testimonial.text}"</p>
          
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h4 className="font-bold text-dental-navy">{testimonial.name}</h4>
              <p className="text-sm text-dental-navy/60">{testimonial.treatment}</p>
            </div>
            
            {testimonial.image && (
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <EnhancedImage
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialsSection;
