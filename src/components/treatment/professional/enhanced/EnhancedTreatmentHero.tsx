
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { TranslatedText } from '@/components/ui/translated-text';
import OptimizedImage from '@/components/ui/optimized-image';
import { Button } from '@/components/ui/button';
import TrustBadges from '../components/TrustBadges';

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
  imageUrl,
  treatmentSlug
}) => {
  const handleBooking = () => {
    window.location.href = 'tel:03-566-6915';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/972515666915', '_blank');
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-dental-navy via-dental-navy/95 to-dental-navy/90 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-dental-orange animate-pulse" />
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-dental-orange/50" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white/20" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="text-white">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-dental-orange/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <CheckCircle className="h-4 w-4 text-dental-orange" />
                <span className="text-sm font-medium">טיפול מקצועי מוסמך</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Features List */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-dental-orange flex-shrink-0" />
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-dental-orange hover:bg-dental-orange/90 text-white font-bold"
                onClick={handleBooking}
              >
                קביעת תור ללא התחייבות
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-dental-navy"
                onClick={handleWhatsApp}
              >
                WhatsApp
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-dental-orange" />
                <span>13+ שנות ניסיון</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-dental-orange" />
                <span>זמינים למקרי חירום 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-dental-orange" />
                <span>ייעוץ ללא התחייבות</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src={imageUrl}
                alt={title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dental-navy/20 to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-dental-navy">98%</div>
                <div className="text-sm text-dental-navy/70">שביעות רצון</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-dental-orange rounded-xl p-4 shadow-xl">
              <div className="text-center text-white">
                <div className="text-2xl font-bold">1500+</div>
                <div className="text-sm opacity-90">מטופלים</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Badges */}
      <div className="container mx-auto px-4 md:px-6 mt-16">
        <TrustBadges />
      </div>
    </section>
  );
};

export default EnhancedTreatmentHero;
