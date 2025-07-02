
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EnhancedWhyUs: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const reasons = [
    {
      title: t('childrenDentistry.whyChooseUs.reasons.0.title'),
      description: t('childrenDentistry.whyChooseUs.reasons.0.description'),
      icon: '👨‍⚕️',
      benefit: t('childrenDentistry.whyChooseUs.reasons.0.benefit')
    },
    {
      title: t('childrenDentistry.whyChooseUs.reasons.1.title'),
      description: t('childrenDentistry.whyChooseUs.reasons.1.description'),
      icon: '🎮',
      benefit: t('childrenDentistry.whyChooseUs.reasons.1.benefit')
    },
    {
      title: t('childrenDentistry.whyChooseUs.reasons.2.title'),
      description: t('childrenDentistry.whyChooseUs.reasons.2.description'),
      icon: '🧸',
      benefit: t('childrenDentistry.whyChooseUs.reasons.2.benefit')
    },
    {
      title: t('childrenDentistry.whyChooseUs.reasons.3.title'),
      description: t('childrenDentistry.whyChooseUs.reasons.3.description'),
      icon: '👨‍👩‍👧‍👦',
      benefit: t('childrenDentistry.whyChooseUs.reasons.3.benefit')
    }
  ];

  const handleBooking = () => {
    window.location.href = 'tel:03-566-6915';
  };

  return (
    <Section
      className="py-16 md:py-20 bg-gradient-to-b from-white to-green-50/20"
      background="none"
      maxWidth="xl"
      directionAware={true}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dental-navy mb-6">
          {t('childrenDentistry.whyChooseUs.title')}
        </h2>
        <p className="text-lg md:text-xl text-dental-navy/70 max-w-3xl mx-auto">
          {t('childrenDentistry.whyChooseUs.subtitle')}
        </p>
      </div>

      {/* Reasons Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {reasons.map((reason, index) => (
          <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 relative overflow-hidden">
            <CardContent className="p-6 h-full flex flex-col">
              {/* Icon */}
              <div className="text-4xl mb-4 text-center">
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-dental-navy mb-3 text-center">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-dental-navy/70 mb-4 flex-grow leading-relaxed text-center">
                {reason.description}
              </p>

              {/* Benefit Highlight */}
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-green-700 font-semibold text-sm">
                  ✨ {reason.benefit}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Elements */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-8">
          המספרים מדברים בעד עצמם
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">
              {t('childrenDentistry.whyChooseUs.trustElements.satisfaction')}
            </div>
            <p className="text-white/80 text-sm">שביעות רצון הורים</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">
              {t('childrenDentistry.whyChooseUs.trustElements.children')}
            </div>
            <p className="text-white/80 text-sm">ילדים מטופלים מדי שנה</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">
              {t('childrenDentistry.whyChooseUs.trustElements.experience')}
            </div>
            <p className="text-white/80 text-sm">שנות ניסיון מוכח</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">
              {t('childrenDentistry.whyChooseUs.trustElements.availability')}
            </div>
            <p className="text-white/80 text-sm">זמינות לחירום</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-dental-navy mb-4">
          מוכנים לתת לילד שלכם חוויה חיובית?
        </h3>
        <p className="text-dental-navy/70 mb-6 max-w-2xl mx-auto">
          בואו להתייעצות חינם ובלי התחייבות. נכיר את הילד שלכם ונראה איך אנחנו יכולים לעזור.
        </p>
        <Button 
          size="lg" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={handleBooking}
        >
          קביעת התייעצות חינם עכשיו
        </Button>
      </div>
    </Section>
  );
};

export default EnhancedWhyUs;
