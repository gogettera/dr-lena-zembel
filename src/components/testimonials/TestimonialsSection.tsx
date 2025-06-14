
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';

interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
}

const TestimonialsSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample testimonials - in a real app, these would come from an API
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'שרה כ.',
      treatment: 'Teeth Whitening',
      rating: 5,
      review: 'מעולה! הרופא מקצועי וסבלני. הטיפול עבר ללא כאב והתוצאה מדהימה.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: '2',
      name: 'דוד מ.',
      treatment: 'Root Canal',
      rating: 5,
      review: 'פחדתי מטיפול שורש אבל הרופא הסביר הכל בסבלנות. ממליץ בחום!',
      date: '2024-01-10',
      verified: true
    },
    {
      id: '3',
      name: 'רחל ש.',
      treatment: 'Aesthetic Treatments',
      rating: 5,
      review: 'תוצאות מעבר לציפיות! הצוות מקצועי והמרפאה נקייה ומודרנית.',
      date: '2024-01-05',
      verified: true
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-dental-beige/30" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-navy mb-4">
            <TranslatedText textKey="navigation.testimonials" />
          </h2>
          <p className="text-lg text-dental-navy/70">
            <TranslatedText textKey="navigation.patientsExperiences" />
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevTestimonial}
                  className="p-2"
                >
                  <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>

                <div className="text-center flex-1">
                  <div className="flex justify-center mb-2">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  <p className="text-lg text-dental-navy/80 mb-4 leading-relaxed">
                    "{testimonials[currentIndex].review}"
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <p className="font-semibold text-dental-navy">
                      {testimonials[currentIndex].name}
                    </p>
                    {testimonials[currentIndex].verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        <TranslatedText textKey="testimonials.verified" />
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-dental-navy/60">
                    {testimonials[currentIndex].treatment}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextTestimonial}
                  className="p-2"
                >
                  <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </div>

              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-dental-orange' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <a href="#write-review">
                <TranslatedText textKey="testimonials.writeReview" />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
