
import React from "react";
import { Star } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getResponsiveClasses, getDirectionalClasses } from "@/utils/responsiveUtils";
import { Section } from "@/components/ui/section";

const Hero: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const responsive = getResponsiveClasses();
  const directional = getDirectionalClasses(isRTL);
  
  return (
    <Section
      id="hero"
      className="relative py-12 md:py-16 lg:py-24 px-4 bg-[#E5DEFF] overflow-hidden scroll-mt-24"
      background="none"
      maxWidth="xl"
      directionAware={true}
    >
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-dental-orange/10 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#D3E4FD]/40 pointer-events-none" />

      <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-20 relative z-10 ${directional.textAlign}`}>
        {/* Hero left: IMAGE */}
        <div className={`w-full md:w-1/2 flex justify-center mb-8 md:mb-0 ${isRTL ? 'md:order-last' : ''}`}>
          <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            <OptimizedImage
              src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
              alt={t('aestheticTreatments.headline1') || "טיפול אסתטי - חיוך מושלם"}
              className="rounded-3xl shadow-lg w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] h-auto object-cover border-4 border-white"
            />
            <Star className={`absolute -top-6 ${isRTL ? '-right-6' : '-left-6'} h-12 w-12 md:h-14 md:w-14 text-dental-orange bg-white rounded-full border shadow-lg p-2 animate-pulse`} />
          </div>
        </div>

        {/* Hero right: Text content */}
        <div className={`w-full md:w-1/2 text-center ${directional.textAlign} flex flex-col ${isRTL ? 'md:items-end' : 'md:items-start'} items-center`}>
          <h1 className={`${responsive.responsiveText.h1} text-dental-navy font-[Heebo] leading-snug mb-4 md:mb-6 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]`}>
            {t('aestheticTreatments.headline1') || "טיפולים אסתטיים לחיוך מושלם"}
          </h1>
          <p className={`${responsive.responsiveText.body} text-dental-navy/80 mb-6 md:mb-8 max-w-xl opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]`}>
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
    </Section>
  );
};

export default Hero;
