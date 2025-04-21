
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/ui/section-header';

const PreventiveMedicineProcess = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: "בדיקה מקיפה והערכת מצב",
      description: "ביצוע בדיקה יסודית של השיניים והחניכיים לאיתור בעיות פוטנציאליות"
    },
    {
      number: "02",
      title: "צילומי רנטגן תקופתיים",
      description: "ביצוע צילומים לפי הצורך לזיהוי בעיות שאינן נראות לעין"
    },
    {
      number: "03",
      title: "ניקוי מקצועי והסרת אבנית",
      description: "הסרת אבנית ורובד חיידקי בטכניקות מתקדמות ועדינות"
    },
    {
      number: "04",
      title: "ייעוץ והדרכה",
      description: "מתן הנחיות מפורטות לשמירה על היגיינת פה נכונה בבית"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-dental-beige/20 via-white to-dental-pink/10">
      <div className="container mx-auto">
        <SectionHeader
          title="תהליך הטיפול המונע"
          subtitle="הצעדים לשמירה על בריאות השיניים שלך"
        />

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative flex opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {index !== steps.length - 1 && (
                <div className="absolute top-16 bottom-0 left-8 w-0.5 bg-dental-orange/20 z-0" />
              )}
              
              <div className="bg-dental-orange/10 text-dental-orange font-bold text-xl w-16 h-16 rounded-full flex items-center justify-center mr-6 z-10 shrink-0">
                {step.number}
              </div>
              
              <div className="pb-12">
                <h3 className="text-xl font-bold text-dental-navy mb-2">{step.title}</h3>
                <p className="text-dental-navy/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreventiveMedicineProcess;
