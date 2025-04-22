
import React from "react";
import { MapPin, Clock, ChevronsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getResponsiveClasses, getDirectionalClasses } from "@/utils/responsiveUtils";
import { Section } from "@/components/ui/section";

const BookVisitAnchor: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const responsive = getResponsiveClasses();
  const directional = getDirectionalClasses(isRTL);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Section spacing="lg" background="gradient" maxWidth="xl" directionAware={true}>
      <div className={`flex flex-col items-center text-center gap-6 sm:gap-8 opacity-0 animate-[fade-in_0.5s_ease-out_forwards] ${directional.textAlign}`}>
        <h2 className={`${responsive.responsiveText.h2} text-dental-navy mb-2 sm:mb-4`}>
          {t('aestheticTreatments.bookNowCTA') || "מוכנים לשדרג את החיוך שלכם? בואו נתחיל בפגישת ייעוץ"}
        </h2>
        <div className={`${responsive.responsiveText.body} text-dental-navy/80 mb-2 sm:mb-4 max-w-2xl mx-auto`}>
          {t('aestheticTreatments.bookNowSubtitle') || "צוות המרפאה שלנו כאן כדי להעניק לכם את הטיפול האסתטי המתקדם והמותאם אישית ביותר."}
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-4">
          <div className="flex items-center gap-2 bg-white/80 px-3 sm:px-4 py-2 rounded-full shadow-sm border border-dental-beige/30">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-dental-orange" />
            <span className="text-sm sm:text-base">{t('clinicInfo.address') || "דרך בן-צבי 2, תל אביב-יפו"}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-3 sm:px-4 py-2 rounded-full shadow-sm border border-dental-beige/30">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-dental-orange" />
            <span className="text-sm sm:text-base">{t('clinicInfo.hours.weekdays') || "ראשון עד חמישי: 09:00-19:00 | שישי: 09:00-13:00"}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="orange" 
            size="lg"
            className="rounded-full text-lg py-3 px-7 shadow-soft hover:bg-dental-orange/90 transition-all w-full sm:w-auto"
          >
            {t('bookVisit') || "לקביעת ביקור"}
          </Button>
          
          <Button
            variant="outline"
            className="rounded-full border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white transition-all font-bold"
            onClick={scrollToTop}
          >
            {t('backToTop') || "חזרה למעלה"}
            <ChevronsUp className={`${isRTL ? 'mr-1' : 'ml-1'}`} size={18} />
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default BookVisitAnchor;
