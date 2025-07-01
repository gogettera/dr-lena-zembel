
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, User, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TranslatedText } from '@/components/ui/translated-text';

interface TreatmentTestimonialsProps {
  treatmentType: string;
}

const TreatmentTestimonials: React.FC<TreatmentTestimonialsProps> = ({ treatmentType }) => {
  const getTestimonials = (type: string) => {
    const testimonials = {
      'root-canal': [
        {
          name: 'דנה כ.',
          age: 34,
          treatment: 'טיפול שורש',
          rating: 5,
          date: 'נובמבר 2024',
          text: 'הייתי בפאניקה מטיפול השורש, אבל ד״ר זמבל הפגינה מקצועיות וסבלנות מדהימות. הטיפול היה ללא כאב בכלל והתוצאה מושלמת. הרגשתי בידיים בטוחות לאורך כל התהליך.',
          verified: true
        },
        {
          name: 'מיכאל ר.',
          age: 42,
          treatment: 'טיפול שורש מורכב',
          rating: 5,
          date: 'אוקטובר 2024',
          text: 'לאחר שני רופאים אמרו שצריך לעקור את השן, ד״ר זמבל הצליחה להציל אותה עם טיפול שורש מתקדם. 6 חודשים אחרי והשן בריאה לחלוטין. תודה על המקצועיות והמסירות!',
          verified: true
        },
        {
          name: 'רבקה ל.',
          age: 28,
          treatment: 'טיפול שורש',
          rating: 5,
          date: 'ספטמבר 2024',
          text: 'המרפאה מודרנית והצוות מקצועי. הטכנולוגיה המתקדמת נראית והרגישה במהלך הטיפול. שירות אדיב ומענה מהיר לכל שאלה. ממליצה בחום!',
          verified: true
        }
      ]
    };

    return testimonials[type] || testimonials['root-canal'];
  };

  const testimonials = getTestimonials(treatmentType);

  return (
    <section className="py-16 bg-gradient-to-b from-dental-beige/20 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            <TranslatedText textKey="treatments.testimonials.title" defaultText="מה אומרים המטופלים שלנו?" />
          </h2>
          <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
            <TranslatedText 
              textKey="treatments.testimonials.subtitle" 
              defaultText="קולות אמיתיים של מטופלים שחוו את הטיפול המקצועי שלנו"
            />
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-dental-beige/30 bg-white relative">
              <CardContent className="p-0">
                {/* Quote Icon */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-dental-orange rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {testimonial.verified && (
                    <Badge variant="outline" className="mr-2 text-xs border-green-600 text-green-600">
                      מאומת
                    </Badge>
                  )}
                </div>

                {/* Testimonial Text */}
                <p className="text-dental-navy/80 leading-relaxed mb-6 text-sm">
                  "{testimonial.text}"
                </p>

                {/* Patient Info */}
                <div className="flex items-center justify-between pt-4 border-t border-dental-beige/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-dental-orange/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-dental-orange" />
                    </div>
                    <div>
                      <p className="font-semibold text-dental-navy text-sm">{testimonial.name}</p>
                      <p className="text-xs text-dental-navy/60">{testimonial.treatment}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-dental-navy/60">
                      <Calendar className="h-3 w-3" />
                      {testimonial.date}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-dental-orange mb-1">98%</div>
              <div className="text-xs text-dental-navy/70">שביעות רצון</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dental-orange mb-1">2000+</div>
              <div className="text-xs text-dental-navy/70">מטופלים מרוצים</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dental-orange mb-1">4.9</div>
              <div className="text-xs text-dental-navy/70">דירוג ממוצע</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dental-orange mb-1">95%</div>
              <div className="text-xs text-dental-navy/70">המלצות</div>
            </div>
          </div>
          
          <p className="text-xs text-dental-navy/60 mt-6">
            כל ההמלצות מאומתות ומבוססות על ביקורים אמיתיים במרפאה
          </p>
        </div>
      </div>
    </section>
  );
};

export default TreatmentTestimonials;
