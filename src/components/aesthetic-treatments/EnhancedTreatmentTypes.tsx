
import React from "react";
import { Clock, DollarSign, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/components/ui/section";

const EnhancedTreatmentTypes: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  const treatments = [
    {
      key: 'whitening',
      icon: '✨',
      popular: true
    },
    {
      key: 'veneers', 
      icon: '🦷',
      premium: true
    },
    {
      key: 'crowns',
      icon: '👑',
      popular: false
    },
    {
      key: 'bonding',
      icon: '⚡',
      popular: false
    },
    {
      key: 'gumContouring',
      icon: '🎨',
      popular: false
    },
    {
      key: 'smileDesign',
      icon: '💎',
      premium: true
    }
  ];

  const handleBooking = () => {
    window.location.href = 'tel:03-566-6915';
  };
  
  return (
    <Section
      id="treatments"
      className="py-16 md:py-20 bg-gradient-to-b from-white to-dental-beige/20"
      background="none"
      maxWidth="xl"
      directionAware={true}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dental-navy mb-6">
          {t('aestheticTreatments.treatments.title')}
        </h2>
        <p className="text-lg md:text-xl text-dental-navy/70 max-w-3xl mx-auto">
          {t('aestheticTreatments.treatments.subtitle')}
        </p>
      </div>

      {/* Treatments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {treatments.map((treatment) => (
          <Card key={treatment.key} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-dental-orange/20 relative overflow-hidden">
            {/* Popular/Premium Badge */}
            {(treatment.popular || treatment.premium) && (
              <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10`}>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  treatment.popular 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {treatment.popular ? 'פופולרי' : 'פרימיום'}
                </span>
              </div>
            )}

            <CardContent className="p-6 h-full flex flex-col">
              {/* Icon */}
              <div className="text-4xl mb-4 text-center">
                {treatment.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-dental-navy mb-3 text-center">
                {t(`aestheticTreatments.treatments.${treatment.key}.title`)}
              </h3>

              {/* Description */}
              <p className="text-dental-navy/70 mb-4 flex-grow leading-relaxed">
                {t(`aestheticTreatments.treatments.${treatment.key}.description`)}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {[0, 1, 2, 3].map((index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Star className="h-4 w-4 text-dental-orange mt-0.5 flex-shrink-0" />
                    <span className="text-dental-navy/80">
                      {t(`aestheticTreatments.treatments.${treatment.key}.features.${index}`)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Treatment Info */}
              <div className="space-y-3 mb-6 p-4 bg-dental-beige/20 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-dental-orange" />
                  <span className="font-medium text-dental-navy">
                    {t(`aestheticTreatments.treatments.${treatment.key}.duration`)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-dental-orange" />
                  <span className="font-bold text-dental-navy">
                    {t(`aestheticTreatments.treatments.${treatment.key}.price`)}
                  </span>
                </div>
              </div>

              {/* Result */}
              <p className="text-sm text-dental-orange font-semibold mb-4 text-center">
                {t(`aestheticTreatments.treatments.${treatment.key}.result`)}
              </p>

              {/* CTA Button */}
              <Button 
                className="w-full bg-dental-navy hover:bg-dental-navy/90 text-white font-semibold rounded-full group-hover:bg-dental-orange group-hover:scale-105 transition-all duration-300"
                onClick={handleBooking}
              >
                קבלת פרטים נוספים
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center bg-gradient-to-r from-dental-orange/5 to-dental-pink/5 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-dental-navy mb-4">
          לא בטוחים איזה טיפול מתאים לכם?
        </h3>
        <p className="text-dental-navy/70 mb-6 max-w-2xl mx-auto">
          בואו להתייעצות חינם ובלי התחייבות. נבדוק, נייעץ ונמליץ על הטיפול המושלם בדיוק עבורכם.
        </p>
        <Button 
          size="lg" 
          className="bg-dental-orange hover:bg-dental-orange/90 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={handleBooking}
        >
          קביעת התייעצות חינם עכשיו
        </Button>
      </div>
    </Section>
  );
};

export default EnhancedTreatmentTypes;
