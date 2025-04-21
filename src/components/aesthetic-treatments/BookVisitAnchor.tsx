
import React from "react";
import { MapPin, Clock, ChevronsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const BookVisitAnchor: React.FC = () => {
  const { t } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section className="py-14 md:py-20 px-4 bg-[#E5DEFF]/40">
      <div className="container mx-auto max-w-3xl flex flex-col items-center text-center gap-8 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
        <h2 className="text-2xl font-bold text-dental-navy mb-4">
          {t('aestheticTreatments.bookNowCTA') || "מוכנים לשדרג את החיוך שלכם? בואו נתחיל בפגישת ייעוץ"}
        </h2>
        <div className="text-dental-navy/80 text-lg mb-4">
          {t('aestheticTreatments.bookNowSubtitle') || "צוות המרפאה שלנו כאן כדי להעניק לכם את הטיפול האסתטי המתקדם והמותאם אישית ביותר."}
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-dental-beige/30">
            <MapPin className="h-5 w-5 text-dental-orange" />
            <span>{t('clinicInfo.address') || "דרך בן-צבי 2, תל אביב-יפו"}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-dental-beige/30">
            <Clock className="h-5 w-5 text-dental-orange" />
            <span>{t('clinicInfo.hours.weekdays') || "ראשון עד חמישי: 09:00-19:00 | שישי: 09:00-13:00"}</span>
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
            <ChevronsUp className="mr-1" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookVisitAnchor;
