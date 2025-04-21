
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TreatmentType } from "@/data/treatmentTypes";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Props: add treatmentSubtitleKey for the "subtitle"/second headline row
interface PreventiveMedicineHeroProps {
  treatment: TreatmentType;
  treatmentNameKey: string; // main heading
  treatmentSubtitleKey?: string; // new prop for subtitle
  treatmentDescKey: string;
}

const PreventiveMedicineHero: React.FC<PreventiveMedicineHeroProps> = ({
  treatment,
  treatmentNameKey,
  treatmentSubtitleKey = "preventiveMedicine.headline2", // fallback translation key
  treatmentDescKey,
}) => {
  const { t } = useLanguage();

  // User's uploaded image for under the heading
  const mainImage = "/lovable-uploads/4a7a5648-9bbd-4a37-9d06-04531fc920b3.png";

  return (
    <section
      className="w-full bg-[#FFDEE2] relative pb-2 md:pb-8 pt-16 sm:pt-20"
      style={{
        minHeight: 360,
        borderBottomLeftRadius: "2.5rem",
        borderBottomRightRadius: "2.5rem",
      }}
    >
      <div className="container mx-auto px-3 md:px-6 relative z-10 flex flex-col items-center">
        {/* Main Heading */}
        <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-dental-navy text-center leading-tight mb-1 md:mb-2">
          {t(treatmentNameKey)}
        </h1>
        {/* Image placed exactly between h1 and h2 */}
        <div className="w-full sm:w-64 md:w-96 max-w-xs mb-2 mx-auto rounded-2xl overflow-hidden shadow-lg border border-white/80 bg-white animate-fade-in">
          <img
            src={mainImage}
            alt={t(treatmentNameKey)}
            className="aspect-[16/10] object-cover w-full"
            style={{ display: "block" }}
            loading="eager"
          />
        </div>
        {/* Subtitle */}
        <h2 className="text-xl xs:text-2xl md:text-3xl font-heading font-semibold text-dental-navy text-center leading-snug mb-4 md:mb-5">
          {t(treatmentSubtitleKey)}
        </h2>
        {/* Description paragraph */}
        <p className="text-base xs:text-lg md:text-xl text-dental-navy/80 text-center mb-6 max-w-xl mx-auto">
          {t(treatmentDescKey)}
        </p>
        {/* Book Visit Button */}
        <Button
          variant="orange"
          size="lg"
          className="rounded-full text-base md:text-lg px-8 w-full xs:w-auto max-w-xs mb-6"
        >
          {t("bookVisit")}
        </Button>
        {/* Down icon with scroll hint */}
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center justify-center animate-bounce mb-1">
            <ChevronDown className="h-7 w-7 text-dental-orange/70" />
          </div>
          <span className="text-xs text-dental-ocean/60">
            {t("scrollForMore")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default PreventiveMedicineHero;
