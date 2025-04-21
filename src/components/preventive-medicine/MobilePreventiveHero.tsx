
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";
import { TreatmentType } from "@/data/treatmentTypes";

interface MobilePreventiveHeroProps {
  treatment: TreatmentType;
  treatmentNameKey: string;
  treatmentSubtitleKey: string;
  treatmentDescKey: string;
}

const mainImage = "/lovable-uploads/4a7a5648-9bbd-4a37-9d06-04531fc920b3.png";

const MobilePreventiveHero: React.FC<MobilePreventiveHeroProps> = ({
  treatment,
  treatmentNameKey,
  treatmentSubtitleKey,
  treatmentDescKey,
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFDEE2] via-[#FDF4F0] to-[#FFE8EB] pb-8 pt-10">
      {/* Animated SVG wavy top */}
      <div className="absolute left-0 top-0 w-full" style={{ zIndex: 1 }}>
        <svg viewBox="0 0 375 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-14">
          <path d="M0 40C60 20 170 70 375 10V65H0V40Z" fill="#FFF1F2" />
        </svg>
      </div>

      {/* Floating blobs */}
      <div className="absolute -top-8 right-0 h-24 w-24 rounded-full bg-dental-orange/10 animate-fade-in z-0"></div>
      <div className="absolute bottom-12 -left-10 h-24 w-24 rounded-full bg-dental-azure/40 blur-xl"></div>

      <div className="container px-4 mx-auto z-10 relative">
        {/* Card with shadow and glass effect */}
        <div className="relative bg-white/90 glass-effect rounded-3xl shadow-2xl p-5 border border-white/80 animate-fade-in">
          {/* Main heading */}
          <h1 className="text-3xl font-bold text-dental-navy text-center mb-2 leading-tight font-heading">
            {t(treatmentNameKey)}
          </h1>

          {/* Subheading / tagline */}
          <h2 className="text-lg sm:text-xl font-semibold text-dental-orange text-center mb-3 px-2 leading-tight">
            {t(treatmentSubtitleKey)}
          </h2>

          {/* Main image with decorative border and floating animation */}
          <div className="relative mx-auto mb-4 w-[90%] max-w-xs">
            <div className="absolute -top-3 -right-3 h-7 w-7 rounded-full bg-dental-azure/30 z-10 animate-pulse" />
            <OptimizedImage
              src={mainImage}
              alt={t(treatmentNameKey)}
              className="w-full object-cover rounded-2xl border-2 border-white/80 shadow-lg"
              priority={true}
            />
            <div className="absolute -bottom-2 left-2 h-7 w-7 rounded-full bg-dental-orange/20 z-10 blur-[2px]" />
          </div>

          {/* Core message/factoid */}
          <div className="bg-gradient-to-r from-dental-orange/20 to-dental-azure/10 rounded-xl px-4 py-3 mb-4 animate-fade-in">
            <span className="block text-base font-medium text-dental-navy/90 text-center">
              {t("preventiveMedicine.mobileFactoid") || "הבריאות של ילדך מתחילה בשגרה נכונה ובדיקה בזמן."}
            </span>
          </div>

          {/* Description */}
          <p className="text-base text-dental-navy/80 text-center mb-5 px-1 leading-relaxed font-sans">
            {t(treatmentDescKey)}
          </p>

          {/* CTA with pulse + bounce animation */}
          <Button
            variant="orange"
            size="lg"
            className="w-full rounded-full text-base font-medium shadow-md animate-pulse"
          >
            {t("bookVisit")}
          </Button>
        </div>

        {/* Fun accent: playful family tip box */}
        <div className="max-w-xs mx-auto mt-5 mb-0 bg-dental-sky/10 border border-dental-sky/40 rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm animate-fade-in">
          <span role="img" aria-label="Star" className="text-dental-sky text-lg">🌟</span>
          <span className="text-sm text-dental-navy font-medium">
            {t("preventiveMedicine.mobileTip") || "התחילו לצחצח יחד – הילדים לומדים מההורים!"}
          </span>
        </div>
      </div>

      {/* Bouncy scroll cue pill */}
      <div className="w-full flex flex-col items-center mt-4 z-10 relative">
        <div className="flex items-center justify-center animate-bounce mb-1">
          <ChevronDown className="h-7 w-7 text-dental-navy/70" />
        </div>
        <span className="bg-white/80 text-dental-navy/80 text-xs font-semibold rounded-full px-3 py-1 shadow pulse">
          {t("scrollForMore")}
        </span>
      </div>
    </section>
  );
};

export default MobilePreventiveHero;
