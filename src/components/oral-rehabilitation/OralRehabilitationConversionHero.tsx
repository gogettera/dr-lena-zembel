
import React from "react";
import { Button } from "@/components/ui/button";
import { NextGenImage } from "@/components/ui/next-gen-image";

const OralRehabilitationConversionHero = () => (
  <section className="relative bg-gradient-to-bl from-dental-beige via-white to-dental-orange/10 py-12 md:py-24 px-4 overflow-hidden text-center">
    <div className="container mx-auto relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      {/* Text */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
        <h1 className="text-4xl md:text-6xl font-bold text-dental-navy mb-6 leading-tight font-[Assistant] animate-fade-in">
          קבלו חיוך חדש - שיקום פה ביום אחד!
        </h1>
        <p className="text-xl md:text-2xl text-dental-navy/80 font-[Assistant] mb-7 max-w-md animate-fade-in">
          שיניים קבועות ומתפקדות, נראות טבעית וחיוך מלא ביטחון – עם טכנולוגיה חדישה, טיפול אישי ותוצאה שמרגישה כמו נס.
        </p>
        <Button
          variant="orange"
          size="lg"
          className="rounded-full px-8 py-4 text-lg font-semibold shadow-soft hover:scale-105 transition-all duration-300 animate-fade-in"
        >
          התחילו את השינוי עוד היום
        </Button>
      </div>
      {/* Before/After side-by-side */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start animate-fade-in">
        <div className="flex gap-4 md:gap-8 items-end max-w-[440px] mx-auto mb-4">
          <div className="flex flex-col items-center">
            <div className="text-xs text-dental-navy bg-dental-beige/70 rounded-full px-2 py-1 mb-2">לפני</div>
            <NextGenImage
              src="/lovable-uploads/photo-1498050108023-c5249f4df085.jpg"
              alt="חיוך לפני שיקום"
              width={155}
              height={155}
              className="rounded-2xl shadow-md border-4 border-dental-beige object-cover aspect-square"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xs text-white bg-dental-orange rounded-full px-2 py-1 mb-2">אחרי</div>
            <NextGenImage
              src="/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg"
              alt="חיוך אחרי שיקום"
              width={188}
              height={188}
              className="rounded-2xl shadow-lg border-4 border-dental-orange object-cover aspect-square scale-105"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="text-dental-navy text-sm font-medium">
          תוצאה טבעית שבונה מחדש את הביטחון והאיכות החיים
        </div>
      </div>
    </div>
    <div className="absolute w-[150px] h-[150px] right-12 top-8 rounded-full bg-dental-orange/5 blur-3xl pointer-events-none" />
    <div className="absolute w-[180px] h-[110px] left-4 bottom-10 rounded-full bg-dental-accent/10 blur-2xl pointer-events-none" />
  </section>
);

export default OralRehabilitationConversionHero;
