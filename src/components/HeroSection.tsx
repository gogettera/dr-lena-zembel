
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, ArrowRight, Award, Users, Clock } from 'lucide-react';
import { NextGenImage } from '@/components/ui/next-gen-image';
import { useLanguage } from '@/contexts/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useIsMobile } from '@/hooks/use-mobile';
import { TranslatedText } from '@/components/ui/translated-text';

const HeroSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  const isMobile = useIsMobile();

  const getWhatsAppLink = () => {
    const phone = "972515666915";
    const message = encodeURIComponent(t('common.whatsappMessage'));
    return `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
  };

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Subtle background elements - Apple style */}
      <div className="absolute top-1/4 left-12 w-40 h-40 rounded-full bg-gradient-to-br from-dental-primary/5 to-dental-coral/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-16 w-32 h-32 rounded-full bg-gradient-to-br from-dental-mint/10 to-dental-primary/5 blur-2xl pointer-events-none" />

      <div
        className="apple-container py-32 md:py-40 relative z-10"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-24">
          {/* Content */}
          <div className={`lg:w-1/2 space-y-10 ${isMobile ? 'text-center' : isRTL ? 'lg:order-1 text-right' : 'text-left'}`}>
            {/* Personal introduction badge */}
            <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full px-6 py-3 animate-apple-spring">
              <Heart className="h-4 w-4 text-dental-coral" />
              <span className="text-gray-800 font-medium text-sm tracking-tight">
                ד״ר לנה זמבל • 13 שנות מצוינות
              </span>
            </div>

            {/* Personal headline */}
            <div className="space-y-6 animate-delay-1">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[0.9] tracking-tight">
                <span className="block mb-2 text-gray-900">
                  שלום, אני
                </span>
                <span className="apple-gradient-text block mb-2">
                  ד״ר לנה זמבל
                </span>
                <span className="text-gray-700 text-4xl md:text-5xl lg:text-6xl font-semibold block">
                  רופאת השיניים שלכם
                </span>
              </h1>
            </div>

            {/* Personal story */}
            <div className="space-y-4 animate-delay-2">
              <p className="apple-text-large max-w-2xl">
                <strong className="text-dental-coral">13 שנים</strong> שאני עוזרת למשפחות בצפון יפו ליצור את החיוך המושלם. 
                כל מטופל הוא עולם שלם עבורי.
              </p>
              <p className="text-lg text-gray-600 max-w-2xl">
                בוגרת אוניברסיטת קלן, גרמניה • מתמחה ביישור שיניים וטיפולי ילדים • 
                מדברת עברית, גרמנית, אנגלית ורוסית
              </p>
            </div>

            {/* Personal approach */}
            <div className="bg-dental-cream/50 rounded-3xl p-8 animate-delay-3">
              <blockquote className="text-lg text-gray-800 italic leading-relaxed">
                "הגישה שלי פשוטה: כל מטופל מקבל את מלא הזמן, התשומת לב והטיפול שאני הייתי רוצה לקבל. 
                זה לא רק טיפול - זה יחס אישי מהלב."
              </blockquote>
              <div className="mt-4 text-dental-navy font-semibold">
                ד״ר לנה זמבל
              </div>
            </div>

            {/* Personal CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-delay-4">
              <Button 
                className="apple-button apple-button-primary group text-lg px-8 py-4 h-auto" 
                asChild
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <Calendar className={`h-5 w-5 transition-transform group-hover:scale-110 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  בואו נכיר - התייעצות חינם
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="apple-button apple-button-secondary text-lg px-8 py-4 h-auto group"
                onClick={() => window.location.href = 'tel:03-566-6915'}
              >
                התקשרו אליי עכשיו
                <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </div>

            {/* Personal achievements */}
            <div className="grid grid-cols-3 gap-8 pt-12 animate-delay-5">
              <div className="text-center group">
                <div className="w-12 h-12 bg-dental-coral/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-dental-coral" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-dental-coral transition-colors duration-250">
                  2000+
                </div>
                <div className="apple-text-small mt-2">
                  מטופלים מרוצים
                </div>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 bg-dental-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-dental-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-dental-primary transition-colors duration-250">
                  98%
                </div>
                <div className="apple-text-small mt-2">
                  שביעות רצון
                </div>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 bg-dental-mint/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-dental-mint" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-dental-mint transition-colors duration-250">
                  24/7
                </div>
                <div className="apple-text-small mt-2">
                  זמינות לכם
                </div>
              </div>
            </div>
          </div>

          {/* Personal image section */}
          <div className={`lg:w-1/2 flex justify-center ${isMobile ? 'mt-12' : ''}`}>
            <div className="relative animate-apple-spring">
              {/* Subtle depth effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl blur-xl transform rotate-1 scale-105 pointer-events-none opacity-20"></div>
              
              <div className="relative apple-card border-0 shadow-card-hover">
                <AspectRatio ratio={4/3} className="overflow-hidden rounded-3xl">
                  <NextGenImage 
                    alt="ד״ר לנה זמבל - רופאת השיניים שלכם" 
                    src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg" 
                    width={600}
                    height={450}
                    priority={true}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </AspectRatio>

                {/* Personal floating testimonial */}
                <div 
                  className={`absolute ${isMobile ? 'left-1/2 -translate-x-1/2 -bottom-8' : isRTL ? '-right-12 bottom-12' : '-left-12 bottom-12'}
                    apple-card backdrop-blur-sm p-8 max-w-[320px] border-0 shadow-card-hover`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <NextGenImage
                        src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
                        alt="מטופלת מרוצה"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex text-dental-gold text-sm">★★★★★</div>
                      <span className="apple-text-small font-semibold text-gray-600">שרה כהן</span>
                    </div>
                  </div>
                  <p className="text-gray-900 font-semibold text-base leading-relaxed mb-3">
                    "ד״ר לנה לא רק רופאה מעולה - היא באמת אכפת לה. 
                    הרגשתי בטוחה ומטופלת לאורך כל הדרך."
                  </p>
                  <div className="apple-text-small font-medium text-gray-600">
                    מטופלת כבר 3 שנים
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

export default HeroSection;
