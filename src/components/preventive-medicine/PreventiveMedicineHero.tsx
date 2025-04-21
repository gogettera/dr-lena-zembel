import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TreatmentType } from "@/data/treatmentTypes";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import OptimizedImage from "@/components/ui/optimized-image";
import MobilePreventiveHero from './MobilePreventiveHero';

interface PreventiveMedicineHeroProps {
  treatment: TreatmentType;
  treatmentNameKey: string;
  treatmentSubtitleKey?: string;
  treatmentDescKey: string;
}

const PreventiveMedicineHero: React.FC<PreventiveMedicineHeroProps> = ({
  treatment,
  treatmentNameKey,
  treatmentSubtitleKey = "preventiveMedicine.headline2",
  treatmentDescKey,
}) => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const isRTL = language === "he" || language === "ar";
  const mainImage = "/lovable-uploads/4a7a5648-9bbd-4a37-9d06-04531fc920b3.png";

  if (isMobile) {
    return (
      <MobilePreventiveHero
        treatment={treatment}
        treatmentNameKey={treatmentNameKey}
        treatmentSubtitleKey={treatmentSubtitleKey}
        treatmentDescKey={treatmentDescKey}
      />
    );
  }

  return (
    <section
      className="w-full bg-[#FFDEE2] relative pb-10 pt-20"
      style={{
        minHeight: 420,
        borderBottomLeftRadius: "2.5rem",
        borderBottomRightRadius: "2.5rem",
      }}
    >
      <div className="absolute top-32 left-1/4 h-32 w-32 rounded-full bg-dental-azure/20 opacity-50 blur-md"></div>
      <div className="absolute bottom-20 right-1/4 h-24 w-24 rounded-full bg-dental-orange/10 opacity-70 blur-sm"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'} text-${isRTL ? 'right' : 'left'}`}>
            <h1 className="text-4xl font-bold text-dental-navy leading-tight mb-3">
              {t(treatmentNameKey)}
            </h1>
            <h2 className="text-2xl font-heading font-semibold text-dental-orange mb-4">
              {t(treatmentSubtitleKey)}
            </h2>
            <p className="text-lg text-dental-navy/80 mb-6 max-w-md">
              {t(treatmentDescKey)}
            </p>
            <Button
              variant="orange"
              size="lg"
              className="rounded-full text-base md:text-lg px-8 shadow-md hover:scale-105 transition-all duration-300"
            >
              {t("bookVisit")}
            </Button>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl transform -rotate-3 scale-95"></div>
              <OptimizedImage
                src={mainImage}
                alt={t(treatmentNameKey)}
                className="w-full max-w-md rounded-2xl shadow-lg border-2 border-white/80 transform rotate-1 hover:rotate-0 transition-transform duration-500"
                priority={true}
              />
            </div>
          </div>
        </div>
        
        <div className="w-full flex flex-col items-center mt-10">
          <div className="flex items-center justify-center animate-bounce mb-1">
            <ChevronDown className="h-7 w-7 text-dental-navy/60" />
          </div>
          <span className="text-xs font-medium text-dental-navy/60">
            {t("scrollForMore")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default PreventiveMedicineHero;
