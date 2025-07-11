
import React from "react";
import { Star, CheckCircle, Phone, MessageCircle, Clock, Award } from "lucide-react";
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
      className="relative py-16 md:py-20 lg:py-24 px-4 bg-gradient-to-br from-white via-blue-50/20 to-pink-50/10 overflow-hidden"
      background="none"
      maxWidth="xl"
      directionAware={true}
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100/30 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-pink-100/30 pointer-events-none" />

      <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
        {/* Content Side */}
        <div className={`w-full lg:w-1/2 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Star className="h-4 w-4 text-blue-500" />
            <span className="text-blue-700 font-medium text-sm">
              {t('childrenDentistry.hero.trustBadge')}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dental-navy leading-tight mb-6 animate-fade-in">
            {t('childrenDentistry.hero.title')}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-dental-navy/70 mb-6 leading-relaxed animate-fade-in">
            {t('childrenDentistry.hero.subtitle')}
          </p>

          {/* Social Proof */}
          <p className="text-lg text-dental-navy/60 mb-8 animate-fade-in">
            {t('childrenDentistry.hero.socialProof')}
          </p>

          {/* Urgency Element */}
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-8 animate-fade-in">
            <p className="text-rose-600 font-semibold">
              ⏰ {t('childrenDentistry.hero.urgencyText')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={handleBooking}
            >
              <Phone className="h-5 w-5 mr-2" />
              {t('childrenDentistry.hero.ctaPrimary')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {t('childrenDentistry.hero.ctaSecondary')}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-dental-navy/60">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>התייעצות חינם</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-500" />
              <span>13+ שנות ניסיון</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-blue-500" />
              <span>98% שביעות רצון</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>זמינות 24/7</span>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative animate-fade-in">
            <OptimizedImage
              src="/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg"
              alt="רפואת שיניים לילדים - חוויה חיובית"
              className="rounded-3xl shadow-lg w-full max-w-[400px] md:max-w-[500px] h-auto object-cover border-4 border-white"
            />
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-blue-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">500+</div>
                <div className="text-sm text-dental-navy/60">ילדים מאושרים</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-blue-500 rounded-xl p-4 shadow-lg">
              <div className="text-center text-white">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-90">הורים מרוצים</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default EnhancedHero;
