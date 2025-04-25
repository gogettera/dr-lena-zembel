
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useDirectionalStyles } from '@/utils/direction';

const TestimonialsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const dir = useDirectionalStyles();

  // Example testimonials - these should ideally come from translations
  const testimonials = [
    {
      name: language === 'he' ? "רונית כ." : "Ronit K.",
      text: language === 'he' 
        ? "הגעתי לטיפול בוטוקס ראשון אצל ד״ר לנה והיא הייתה מקצועית ומרגיעה. התוצאות טבעיות בדיוק כמו שרציתי." 
        : "I came for my first Botox treatment with Dr. Lena and she was professional and calming. The results are natural, exactly as I wanted.",
      rating: 5,
      treatment: language === 'he' ? "בוטוקס באזור המצח" : "Botox in forehead area"
    },
    {
      name: language === 'he' ? "דניאל מ." : "Daniel M.",
      text: language === 'he'
        ? "לאחר התייעצות מקיפה, החלטתי לעשות מילוי לשפתיים. התוצאה טבעית ומחמיאה והיחס היה אישי ומקצועי."
        : "After a comprehensive consultation, I decided to get lip fillers. The result is natural and flattering, and the treatment was personal and professional.",
      rating: 5,
      treatment: language === 'he' ? "מילוי שפתיים" : "Lip fillers"
    },
    {
      name: language === 'he' ? "שרית ל." : "Sarit L.",
      text: language === 'he'
        ? "לא האמנתי שאפשר להשיג תוצאות כאלה בטיפול קצר. קו הלסת שלי מוגדר יותר וההתאוששות הייתה מהירה."
        : "I couldn't believe such results were possible in a short treatment. My jawline is more defined and recovery was quick.",
      rating: 5,
      treatment: language === 'he' ? "עיצוב קו הלסת" : "Jawline contouring"
    }
  ];

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
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-dental-orange fill-dental-orange" />
              ))}
            </div>
            
            <div className="relative">
              <Quote className={`absolute top-0 ${dir.isRTL ? 'right-0' : 'left-0'} w-8 h-8 text-dental-orange/20 -translate-y-1/2 ${dir.isRTL ? '-translate-x-1/3' : 'translate-x-1/3'}`} />
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
          {t('readFullReview')}
        </a>
      </div>
    </Container>
  );
};

export default TestimonialsSection;
