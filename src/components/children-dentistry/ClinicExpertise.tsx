
import React from "react";
import { Award, Smile, Star } from "lucide-react";
import { NextGenImage } from "@/components/ui/next-gen-image";

const ClinicExpertise = () => (
  <section className="py-12 md:py-20 px-2 flex flex-col md:flex-row items-center gap-10 max-w-3xl mx-auto">
    <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
      <NextGenImage
        src="/lovable-uploads/23038120-1edf-4bff-9e78-5a73c0f15161.png"
        alt="דר לנה זמבל וצוות המרפאה - מקצועיות לילדים"
        width={180}
        height={220}
        className="rounded-xl border-2 border-dental-orange shadow"
      />
    </div>
    <div className="md:w-2/3 space-y-5 text-center md:text-right">
      <div className="inline-flex items-center gap-2 bg-dental-orange/10 text-dental-orange px-4 py-1 rounded-full text-sm mb-2">
        <Award className="h-5 w-5" /> מעל 13 שנה של ניסיון
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-dental-navy mb-3 flex items-center justify-center md:justify-start gap-2">
        <Smile className="text-dental-orange w-7 h-7" />
        מרפאה מובילה לילדים
      </h3>
      <p className="text-lg text-dental-navy/80 mb-2">
        ד"ר לנה זמבל, רופאה מומחית בבוגרת אוניברסיטת קלן, וצוות המרפאה מתמחים בטיפולי שיניים עדינים, מלאי סבלנות והתאמה אישית לכל גיל. מקצועיות שמעניקה ביטחון ושקט נפשי להורים ולילדים.
      </p>
      <div className="flex flex-wrap gap-2 text-sm text-dental-navy/70 justify-center md:justify-start">
        <div className="flex items-center gap-1"><Star className="h-4 w-4 text-dental-orange" /> רופאה מומחית מטעם משרד הבריאות</div>
        <div className="flex items-center gap-1"><Star className="h-4 w-4 text-dental-orange" /> סבלנות, יחס אישי והסבר מותאם לילד</div>
        <div className="flex items-center gap-1"><Star className="h-4 w-4 text-dental-orange" /> צוות דובר עברית, אנגלית, רוסית וגרמנית</div>
      </div>
    </div>
  </section>
);

export default ClinicExpertise;
