
import React from "react";
import { Phone, Calendar, Award, Shield, Syringe } from "lucide-react";
import { NextGenImage } from "@/components/ui/next-gen-image";
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslatedText } from "@/components/ui/translated-text";

const RootCanalHero: React.FC = () => {
  const { t, language, isRTL } = useLanguage();

  const headline = t("rootCanal.headline", "Advanced Root Canal Treatment Focused On Comfort and Support");
  
  const subtext = t("rootCanal.subtext", "Professional and reassuring care – so you can preserve your tooth and smile again with confidence.");

  const features = [
    t("rootCanal.features.technology", "Advanced German technology for pain reduction"),
    t("rootCanal.features.experience", "13+ years of experience in complex root canal treatments"), 
    t("rootCanal.features.success", "98% success rate in treatments")
  ];

  return (
    <section id="hero" className="relative premium-section bg-gradient-to-br from-dental-primary/5 via-white to-dental-coral/5 overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-dental-primary/5 rounded-full blur-3xl animate-premium-float" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-dental-coral/5 rounded-full blur-2xl animate-delay-200" />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-dental-mint/5 rounded-full blur-xl animate-premium-glow" />

      <div className="premium-container relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
          
          {/* Hero Content */}
          <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'} animate-premium-slide-up`}>
            {/* Trust badge */}
            <div className="flex items-center gap-2 mb-6 animate-delay-100">
              <div className="w-8 h-8 bg-dental-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-dental-primary" />
              </div>
              <span className="premium-text-small font-medium text-dental-primary">
                <TranslatedText textKey="treatments.professionalCare" defaultText="טיפול מקצועי מובטח" />
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dental-navy mb-6 leading-tight animate-delay-200">
              {headline}
            </h1>
            
            <p className="premium-text-large text-dental-navy/80 mb-8 animate-delay-300">
              {subtext}
            </p>

            {/* Key features */}
            <div className="space-y-4 mb-8 animate-delay-400">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-dental-mint/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-3 h-3 text-dental-mint" />
                  </div>
                  <span className="premium-text-body text-dental-navy">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 animate-delay-500 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
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

          {/* Hero Image */}
          <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'} relative animate-delay-300`}>
            <div className="relative">
              {/* Background decorations */}
              <div className="absolute inset-0 bg-gradient-to-br from-dental-primary/10 to-dental-coral/10 rounded-3xl blur-2xl transform rotate-3 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-tr from-dental-mint/10 to-dental-primary/5 rounded-3xl blur-lg transform -rotate-2 scale-102" />
              
              {/* Main image */}
              <div className="relative premium-card border-0 shadow-floating overflow-hidden">
                <NextGenImage
                  src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
                  alt={t("rootCanal.heroImageAlt", "Root Canal Treatment at our clinic")}
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover rounded-3xl"
                  priority
                />
                
                {/* Floating icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 bg-dental-primary rounded-full flex items-center justify-center shadow-floating animate-pulse">
                    <Syringe className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Overlay info badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="premium-glass p-4 rounded-2xl shadow-floating">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-dental-navy font-bold text-sm mb-1">
                          <TranslatedText textKey="doctor.name" defaultText="ד״ר לנה זמבל" />
                        </div>
                        <div className="premium-text-small text-dental-navy/70">
                          <TranslatedText textKey="doctor.rootCanalExpert" defaultText="מומחית לטיפולי שורש" />
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-dental-gold/10 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-dental-gold" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RootCanalHero;
