
import React from "react";
import { Star } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section
      id="hero"
      className="relative py-10 md:py-24 px-4 bg-[#E5DEFF] overflow-hidden scroll-mt-24"
    >
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-dental-orange/10 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-[#D3E4FD]/40 pointer-events-none" />

      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20 relative z-10">
        {/* Hero left: IMAGE */}
        <div className="md:w-1/2 flex justify-center mb-5 md:mb-0">
          <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            <OptimizedImage
              src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
              alt={t('aestheticTreatments.headline1') || "טיפול אסתטי - חיוך מושלם"}
              className="rounded-3xl shadow-lg w-[340px] md:w-[420px] h-auto object-cover border-4 border-white"
            />
            <Star className="absolute -top-8 rtl:-right-8 left-1/2 -translate-x-1/2 h-14 w-14 text-dental-orange bg-white rounded-full border shadow-lg p-2 animate-pulse" />
          </div>
        </div>

        {/* Hero right: Text content */}
        <div className="md:w-1/2 text-center md:text-right flex flex-col items-center md:items-end">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-dental-navy font-[Heebo] leading-snug opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            {t('aestheticTreatments.headline1') || "טיפולים אסתטיים לחיוך מושלם"}
          </h1>
          <p className="text-lg md:text-xl text-dental-navy/80 mb-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            {t('aestheticTreatments.subheading') || "במרפאה של ד\"ר לנה זמבל אנו משלבים טכנולוגיה מתקדמת ומומחיות קלינית כדי להעניק לכם את החיוך המושלם שתמיד חלמתם עליו."}
          </p>
          <Button 
            size="lg" 
            variant="orange" 
            className="rounded-full text-lg shadow-soft hover:scale-105 transition-all duration-300 opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]"
          >
            {t('bookVisit') || "לקביעת ביקור"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
