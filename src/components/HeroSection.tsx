
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="practice" className="bg-dental-pink pt-24 pb-12 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:order-1 order-2 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dental-navy mb-6 leading-tight">
              אנחנו מרפאה דנטלית מקומית שמתייחסת למטופלים שלנו כמו למשפחה.
            </h1>
            <p className="text-xl md:text-2xl font-bold text-dental-orange mb-10 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
              וגם – אנחנו אוהבים חוט דנטלי!
            </p>
            <Button 
              variant="orange" 
              size="lg" 
              className="rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg opacity-0 animate-[fade-in_0.5s_ease-out_0.6s_forwards]"
            >
              לתיאום ביקור
            </Button>
          </div>
          <div className="md:w-1/2 md:order-2 order-1 mb-8 md:mb-0 opacity-0 animate-[slide-in_0.8s_ease-out_forwards]">
            <img 
              alt="רופאת שיניים עם מטופלת" 
              src="/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg" 
              className="w-full h-auto rounded-2xl shadow-lg object-contain hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
