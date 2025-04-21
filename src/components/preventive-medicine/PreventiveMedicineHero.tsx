
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TreatmentType } from "@/data/treatmentTypes";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface PreventiveMedicineHeroProps {
  treatment: TreatmentType;
  treatmentNameKey: string;
  treatmentDescKey: string;
}

const PreventiveMedicineHero: React.FC<PreventiveMedicineHeroProps> = ({
  treatment,
  treatmentNameKey,
  treatmentDescKey,
}) => {
  const { t } = useLanguage();

  // Example Unsplash image for healthy vibes:
  // https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80
  const topImage =
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80";

  // The user provided image url for the new image between h1 and h2
  const middleImage = "/lovable-uploads/73010fad-f7db-4f4e-ac26-5de0dd04eea8.png";

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
        <div className="w-full sm:w-64 md:w-96 max-w-xs mb-5 mx-auto rounded-2xl overflow-hidden shadow-lg border border-white/80">
          <img
            src={topImage}
            alt={t(treatmentNameKey)}
            className="aspect-[16/9] object-cover w-full h-auto bg-dental-beige"
            style={{ display: "block" }}
          />
        </div>
        <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-dental-navy text-center leading-tight mb-3">
          {t(treatmentNameKey)}
        </h1>

        {/* New image inserted between h1 and h2 */}
        <div className="w-full max-w-xs mb-6 mx-auto rounded-lg overflow-hidden shadow-md border border-white/60">
          <img
            src={middleImage}
            alt="Decorative preventive medicine visual"
            className="w-full object-contain"
            loading="lazy"
          />
        </div>

        <p className="text-base xs:text-lg md:text-xl text-dental-navy/80 text-center mb-6 max-w-xl mx-auto">
          {t(treatmentDescKey)}
        </p>
        <Button
          variant="orange"
          size="lg"
          className="rounded-full text-base md:text-lg px-8 w-full xs:w-auto max-w-xs mb-6"
        >
          {t("bookVisit")}
        </Button>
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

