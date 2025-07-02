
import React from "react";
import { Star, CheckCircle, Phone, MessageCircle } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/components/ui/section";

const EnhancedHero: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  const handleBooking = () => {
    window.location.href = 'tel:03-566-6915';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/972515666915', '_blank');
  };
  
  return (
    <Section
      id="hero"
      className="relative py-16 md:py-20 lg:py-24 px-4 bg-gradient-to-br from-dental-beige/30 via-white to-dental-pink/20 overflow-hidden"
      background="none"
      maxWidth="xl"
      directionAware={true}
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-dental-orange/10 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-dental-navy/5 pointer-events-none" />

      <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
        {/* Content Side */}
        <div className={`w-full lg:w-1/2 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-dental-orange/10 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Star className="h-4 w-4 text-dental-orange" />
            <span className="text-dental-navy font-medium text-sm">
              {t('aestheticTreatments.hero.trustBadge')}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dental-navy leading-tight mb-6 animate-fade-in">
            {t('aestheticTreatments.hero.title')}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-dental-navy/80 mb-8 leading-relaxed animate-fade-in">
            {t('aestheticTreatments.hero.subtitle')}
          </p>

          {/* Urgency Element */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 animate-fade-in">
            <p className="text-red-700 font-semibold">
              ⏰ {t('aestheticTreatments.hero.urgencyText')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <Button 
              size="lg" 
              className="bg-dental-orange hover:bg-dental-orange/90 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={handleBooking}
            >
              <Phone className="h-5 w-5 mr-2" />
              {t('aestheticTreatments.hero.ctaPrimary')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {t('aestheticTreatments.hero.ctaSecondary')}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-dental-navy/70">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>ייעוץ ללא התחייבות</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>13+ שנות ניסיון</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>98% שביעות רצון</span>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative animate-fade-in">
            <OptimizedImage
              src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
              alt="טיפולים אסתטיים - חיוך מושלם"
              className="rounded-3xl shadow-2xl w-full max-w-[400px] md:max-w-[500px] h-auto object-cover border-8 border-white"
            />
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-dental-beige/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-dental-navy">1500+</div>
                <div className="text-sm text-dental-navy/70">מטופלים מרוצים</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-dental-orange rounded-xl p-4 shadow-xl">
              <div className="text-center text-white">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-90">שביעות רצון</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default EnhancedHero;
