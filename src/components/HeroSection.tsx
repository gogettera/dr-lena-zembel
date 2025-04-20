import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import OptimizedImage from '@/components/ui/optimized-image';

const HeroSection = () => {
  return (
    <section id="practice" className="relative bg-gradient-to-br from-dental-beige via-dental-pink to-dental-beige pt-32 pb-20 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:order-1 order-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dental-navy mb-6 leading-tight opacity-0 animate-[fade-in_0.8s_ease-out_forwards]">
              רפואת שיניים <span className="text-dental-orange">באהבה</span> וברמה <span className="text-dental-orange">גבוהה</span>
            </h1>
            <p className="text-xl md:text-2xl text-dental-navy mb-10 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards] max-w-2xl">
              אנחנו מרפאה דנטלית מקומית שמתייחסת למטופלים שלנו כמו למשפחה.
              איכות הטיפול והחוויה שלך חשובים לנו מעל הכל.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse md:flex md:items-center opacity-0 animate-[fade-in_0.5s_ease-out_0.6s_forwards]">
              <Button 
                variant="orange" 
                size="lg" 
                className="rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg w-full md:w-auto"
              >
                <Calendar className="mr-2 h-5 w-5" />
                לתיאום ביקור
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full text-lg border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white transition-colors duration-300 w-full md:w-auto"
              >
                לפרטים נוספים
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:order-2 order-1 mb-8 md:mb-0 opacity-0 animate-[slide-in_0.8s_ease-out_forwards]">
            <div className="relative aspect-[4/3] w-full">
              <div className="absolute inset-0 bg-dental-orange rounded-2xl blur-2xl opacity-20 transform -rotate-6"></div>
              <OptimizedImage 
                src="/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg"
                alt="רופאת שיניים עם מטופלת"
                className="relative w-full h-full rounded-2xl shadow-xl object-cover hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-dental-navy font-bold">שביעות רצון מלאה</p>
                <div className="flex text-dental-orange mt-1">
                  ★★★★★
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
