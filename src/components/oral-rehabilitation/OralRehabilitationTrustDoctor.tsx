
import React from "react";
import { NextGenImage } from "@/components/ui/next-gen-image";
import { Star } from "lucide-react";

const OralRehabilitationTrustDoctor = () => (
  <section className="py-14 bg-dental-beige/20">
    <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
      <div className="md:w-1/3 flex justify-center">
        <NextGenImage
          src="/lovable-uploads/23038120-1edf-4bff-9e78-5a73c0f15161.png"
          alt="ד״ר לנה זמבל"
          width={208}
          height={260}
          className="rounded-2xl border-2 border-dental-orange shadow"
        />
      </div>
      <div className="md:w-2/3 space-y-5 text-center md:text-right">
        <div className="inline-flex items-center gap-2 bg-dental-orange/10 text-dental-orange px-4 py-1 rounded-full text-sm mb-2">
          <Star className="h-5 w-5" /> צוות מומחים בעל ניסיון של 13 שנה
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-dental-navy mb-3">בהובלת ד״ר לנה זמבל</h3>
        <p className="text-lg text-dental-navy/80 mb-2">
          ד״ר זמבל וצוות המרפאה מתמחים בשיקום פה והחזרת החיוך - תוך יחס אישי, אמפתיה והבנה של כל מטופל.
          השילוב של חדשנות טכנולוגית, מיומנות ותקשורת חמה מבטיחים לכם תוצאה שמחזיקה שנים.
        </p>
        <div className="text-sm text-dental-navy/70">עברית, גרמנית, אנגלית ורוסית</div>
      </div>
    </div>
  </section>
);

export default OralRehabilitationTrustDoctor;
