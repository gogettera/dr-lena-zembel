
import React from "react";
import { Smile, HeartHandshake, Award } from "lucide-react";
import { NextGenImage } from "@/components/ui/next-gen-image";

// Named export for explicit import when needed as a hero override
export const ChildrenDentistryHero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative py-10 md:py-24 px-4 bg-[#FFDEE2] overflow-hidden scroll-mt-24"
    >
      {/* Decorative background shape */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-dental-orange/10 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-[#D3E4FD]/40 pointer-events-none" />

      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20 relative z-10">
        {/* Hero left: IMAGE with animated pictogram instead of copy */}
        <div className="md:w-1/2 flex justify-center mb-5 md:mb-0">
          <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" style={{width: '340px', height: '340px'}}>
            <NextGenImage
              src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
              alt="ילדה מחייכת על כיסא טיפולים"
              className="rounded-3xl shadow-lg object-cover border-4 border-white"
              width={340}
              height={340}
              priority={true}
            />
            {/* Replace copy with an animated pictogram */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <HeartHandshake 
                className="h-24 w-24 md:h-32 md:w-32 text-dental-orange bg-white bg-opacity-80 rounded-full border-4 border-white shadow-lg p-4
                            animate-pulse transition-transform duration-300"
                aria-label="Care & Trust"
                strokeWidth={2.2}
              />
            </div>
          </div>
        </div>

        {/* Hero right: Text content */}
        <div className="md:w-1/2 text-center md:text-right flex flex-col items-center md:items-end">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-dental-navy font-[Heebo] leading-snug opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            ילדים שמחים – טיפולי שיניים באהבה ובסבלנות
          </h1>
          <p className="text-lg md:text-xl text-dental-navy/80 mb-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            במרפאה של ד"ר לנה זמבל אנחנו לא מטפלים רק בשיניים – אנחנו בונים ביטחון, שקט נפשי וחוויות טובות לילדים ולהורים.
          </p>
        </div>
      </div>
    </section>
  );
};

// Retain the default export in case it's used elsewhere
const Hero = ChildrenDentistryHero;
export default Hero;

