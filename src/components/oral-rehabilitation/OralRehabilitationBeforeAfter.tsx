
import React from "react";
import { NextGenImage } from "@/components/ui/next-gen-image";
import SectionHeader from "@/components/ui/section-header";

const beforeAfterPairs = [
  {
    before: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg",
    after: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
    label: "החזרת החיוך והפונקציה - תוצאה מידית"
  },
  {
    before: "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg",
    after: "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg",
    label: "שיקום מלא של לסת עליונה"
  }
];

const OralRehabilitationBeforeAfter = () => (
  <section className="py-16 bg-white/80">
    <div className="container mx-auto">
      <SectionHeader
        title="לפני ואחרי - תוצאות אמת"
        subtitle="למעלה מ-250 מטופלים קיבלו שיקום פה וחיוך חדש"
      />
      <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
        {beforeAfterPairs.map((pair, i) => (
          <div
            key={i}
            className="bg-dental-beige/30 rounded-2xl shadow-md p-6 flex flex-col items-center min-w-[220px] max-w-xs mx-auto animate-fade-in"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <div className="flex gap-2 mb-3">
              <div className="flex flex-col items-center">
                <span className="text-xs text-dental-navy bg-white px-1 py-0.5 rounded mb-1">לפני</span>
                <NextGenImage
                  src={pair.before}
                  alt="לפני שיקום"
                  width={98}
                  height={98}
                  objectFit="cover"
                  className="rounded-xl shadow border border-dental-beige"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-white bg-dental-orange px-1 py-0.5 rounded mb-1">אחרי</span>
                <NextGenImage
                  src={pair.after}
                  alt="אחרי שיקום"
                  width={104}
                  height={104}
                  objectFit="cover"
                  className="rounded-xl shadow-lg border border-dental-orange scale-105"
                />
              </div>
            </div>
            <div className="text-dental-navy text-sm">{pair.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default OralRehabilitationBeforeAfter;
