
import React from 'react';
import { Heart, Smile, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface BenefitsSection {
  title: string;
  items: string[];
}

interface EnhancedTreatmentBenefitsProps {
  title: string;
  health: BenefitsSection;
  aesthetic: BenefitsSection;
}

const EnhancedTreatmentBenefits: React.FC<EnhancedTreatmentBenefitsProps> = ({
  title,
  health,
  aesthetic
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            {title}
          </h2>
          <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
            הטיפול משפר לא רק את המראה אלא גם את בריאות הפה ואיכות החיים
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Health Benefits */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-dental-beige/30 bg-gradient-to-br from-white to-dental-beige/10">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-semibold text-dental-navy">
                  {health.title}
                </h3>
              </div>

              <div className="space-y-4">
                {health.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-dental-navy/80 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Aesthetic Benefits */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-dental-beige/30 bg-gradient-to-br from-white to-dental-orange/5">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-dental-orange/10 rounded-full flex items-center justify-center">
                  <Smile className="h-6 w-6 text-dental-orange" />
                </div>
                <h3 className="text-2xl font-semibold text-dental-navy">
                  {aesthetic.title}
                </h3>
              </div>

              <div className="space-y-4">
                {aesthetic.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-dental-orange flex-shrink-0 mt-0.5" />
                    <span className="text-dental-navy/80 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-dental-navy/5 rounded-full px-6 py-3">
            <CheckCircle className="h-5 w-5 text-dental-navy" />
            <span className="text-dental-navy font-medium">
              כל הטיפולים מבוצעים על ידי ד״ר לנה זמבל - מומחית מוסמכת ברפואת שיניים
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTreatmentBenefits;
