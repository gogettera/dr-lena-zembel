import React from 'react';
import { Phone, Calendar, Award, Shield } from 'lucide-react';
import { NextGenImage } from '@/components/ui/next-gen-image';
import { TranslatedText } from '@/components/ui/translated-text';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnhancedTreatmentHeroProps {
  title: string;
  subtitle: string;
  features: string[];
  imageUrl: string;
  treatmentSlug: string;
}

const EnhancedTreatmentHero: React.FC<EnhancedTreatmentHeroProps> = ({
  title,
  subtitle,
  features,
  imageUrl
}) => {
  const { isRTL } = useLanguage();

  return (
    <section id="hero" className="relative premium-section bg-gradient-to-br from-dental-primary/5 via-white to-dental-coral/5 overflow-hidden">
      <div className="premium-container relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
          <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'} animate-premium-slide-up`}>
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-dental-primary" />
              <span className="premium-text-small font-medium text-dental-primary">
                <TranslatedText textKey="treatments.professionalCare" defaultText="טיפול מקצועי מובטח" />
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-dental-navy mb-6">
              {title}
            </h1>
            
            <p className="premium-text-large text-dental-navy/80 mb-8">
              {subtitle}
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-dental-mint mt-1" />
                  <span className="premium-text-body text-dental-navy">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="premium-button premium-button-primary">
                <Phone className="w-5 h-5" />
                <TranslatedText textKey="common.bookVisit" defaultText="קבע ביקור" />
              </button>
              <button className="premium-button premium-button-secondary">
                <Calendar className="w-5 h-5" />
                <TranslatedText textKey="common.freeConsultation" defaultText="יעוץ חינם" />
              </button>
            </div>
          </div>

          <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'} relative`}>
            <div className="premium-card border-0 shadow-floating overflow-hidden">
              <NextGenImage
                src={imageUrl}
                alt={title}
                width={600}
                height={500}
                className="w-full h-auto object-cover rounded-3xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTreatmentHero;