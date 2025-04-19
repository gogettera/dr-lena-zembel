
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="practice" className="bg-dental-pink pt-24 pb-12 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:order-1 order-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dental-navy mb-4 leading-tight">
              אנחנו מרפאה דנטלית מקומית שמתייחסת למטופלים שלנו כמו למשפחה.
            </h1>
            <p className="text-xl md:text-2xl font-bold text-dental-orange mb-8">
              וגם – אנחנו אוהבים חוט דנטלי!
            </p>
            <Button variant="orange" size="lg" className="rounded-full text-lg">
              לתיאום ביקור
            </Button>
          </div>
          <div className="md:w-1/2 md:order-2 order-1 mb-8 md:mb-0">
            <img 
              src="/lovable-uploads/11fa7c9b-39fc-4d60-b09b-13f0578ebffe.png" 
              alt="רופאת שיניים עם מטופלת" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
