import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { NextGenImage } from '@/components/ui/next-gen-image';
import { TranslatedText } from '@/components/ui/translated-text';

interface Testimonial {
  id: string;
  name: string;
  age: string;
  location: string;
  treatment: string;
  rating: number;
  text: string;
  image: string;
  verified: boolean;
  treatmentDate: string;
}

const EnhancedTestimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'שרה כהן',
      age: '34',
      location: 'תל אביב',
      treatment: 'טיפול שורש',
      rating: 5,
      text: 'הגעתי לד״ר לנה עם כאבים נוראיים ופחד גדול מטיפול שורש. היא הסבירה לי בסבלנות כל שלב, הטיפול היה ללא כאב לחלוטין, והתוצאה מושלמת. עכשיו אני ממליצה על המרפאה לכל מי שאני מכירה!',
      image: '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg',
      verified: true,
      treatmentDate: 'אוקטובר 2023'
    },
    {
      id: '2', 
      name: 'דוד לוי',
      age: '41',
      location: 'גבעתיים',
      treatment: 'יישור שיניים',
      rating: 5,
      text: 'בתור מבוגר שרצה ליישר שיניים, חששתי שזה יהיה מבאס ויקח נצח. ד״ר לנה הציעה פתרון עם מתקנים שקופים שאף אחד לא שם לב אליהם. התהליך היה מהיר מהצפוי והתוצאה פשוט מדהימה!',
      image: '/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg',
      verified: true,
      treatmentDate: 'ספטמבר 2023'
    },
    {
      id: '3',
      name: 'מיכל רוזן',
      age: '28',
      location: 'רמת גן',
      treatment: 'טיפולי בוטוקס',
      rating: 5,
      text: 'חיפשתי מישהי שתעשה בוטוקס טבעי שלא יראה מלאכותי. ד״ר לנה הבינה בדיוק מה אני רוצה - מראה רענן וטבעי. התוצאה מושלמת, קיבלתי המון מחמאות ואף אחד לא הבין מה השתנה!',
      image: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg',
      verified: true,
      treatmentDate: 'נובמבר 2023'
    }
  ];

  return (
    <section className="premium-section bg-gradient-to-b from-white to-dental-cream/20">
      <div className="premium-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dental-navy mb-6">
            <TranslatedText textKey="trust.testimonials.title" defaultText="מה המטופלים שלנו אומרים" />
          </h2>
          <p className="premium-text-large text-dental-navy/80 max-w-3xl mx-auto">
            <TranslatedText 
              textKey="trust.testimonials.subtitle" 
              defaultText="האמת הכי כנה - מטופלים אמיתיים חולקים את החוויה שלהם עם הטיפולים המתקדמים שלנו"
            />
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={`premium-card hover:shadow-floating group relative overflow-hidden animate-delay-${(index + 1) * 200}`}
            >
              <CardContent className="p-8">
                {/* Quote icon */}
                <div className="absolute top-6 left-6 opacity-10">
                  <Quote className="h-12 w-12 text-dental-primary" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-dental-gold text-dental-gold" />
                  ))}
                </div>

                {/* Testimonial text */}
                <blockquote className="premium-text-body text-dental-navy mb-8 leading-relaxed relative z-10">
                  "{testimonial.text}"
                </blockquote>

                {/* Patient info */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative">
                    <NextGenImage
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 rounded-full object-cover border-2 border-dental-cream"
                    />
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-dental-mint rounded-full p-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="font-semibold text-dental-navy mb-1">
                      {testimonial.name}
                    </div>
                    <div className="premium-text-small text-dental-navy/70 mb-1">
                      גיל {testimonial.age} • {testimonial.location}
                    </div>
                    <div className="text-xs text-dental-primary font-medium">
                      {testimonial.treatment} • {testimonial.treatmentDate}
                    </div>
                  </div>
                </div>

                {/* Verified badge */}
                {testimonial.verified && (
                  <div className="absolute top-6 right-6">
                    <div className="bg-dental-mint/10 text-dental-mint px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      מאומת
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="premium-card bg-gradient-to-r from-dental-primary/5 to-dental-coral/5 p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-dental-navy mb-4">
              <TranslatedText textKey="trust.testimonials.cta.title" defaultText="רוצים להצטרף למעגל המטופלים המרוצים?" />
            </h3>
            <p className="premium-text-body text-dental-navy/80 mb-6">
              <TranslatedText 
                textKey="trust.testimonials.cta.subtitle" 
                defaultText="בואו להכיר אותנו במפגש אישי וללא התחייבות"
              />
            </p>
            <button className="premium-button premium-button-primary">
              <TranslatedText textKey="trust.testimonials.cta.button" defaultText="קבעו פגישת היכרות חינם" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;