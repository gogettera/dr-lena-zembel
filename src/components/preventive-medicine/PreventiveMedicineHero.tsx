
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TreatmentType } from "@/data/treatmentTypes";
import { Button } from "@/components/ui/button";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import OptimizedImage from "@/components/ui/optimized-image";
import MobilePreventiveHero from './MobilePreventiveHero';
import { TranslatedText } from "@/components/ui/translated-text";

interface PreventiveMedicineHeroProps {
  treatment: TreatmentType;
  treatmentNameKey: string;
  treatmentSubtitleKey?: string;
  treatmentDescKey: string;
}

const PreventiveMedicineHero: React.FC<PreventiveMedicineHeroProps> = ({
  treatment,
  treatmentNameKey,
  treatmentSubtitleKey = "treatments.preventiveMedicine.headline2",
  treatmentDescKey,
}) => {
  const { language, isRTL } = useLanguage();
  const isMobile = useIsMobile();
  const mainImage = "/lovable-uploads/4a7a5648-9bbd-4a37-9d06-04531fc920b3.png";
  const phoneNumber = "03-566-6915";
  const whatsappNumber = "051-566-6915";

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
      className="w-full bg-gradient-to-b from-[#FFDEE2] via-[#FDF4F0] to-white relative pb-14 pt-20"
      style={{
        minHeight: 450,
        borderBottomLeftRadius: "2.5rem",
        borderBottomRightRadius: "2.5rem",
      }}
    >
      {/* High-contrast brand color blob */}
      <div className="absolute top-32 left-1/4 h-32 w-32 rounded-full bg-dental-azure/20 opacity-50 blur-md"></div>
      <div className="absolute bottom-20 right-1/4 h-24 w-24 rounded-full bg-dental-orange/10 opacity-70 blur-sm"></div>

      {/* NEW headline + cta row */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className={`${isRTL ? 'items-end' : 'items-start'} flex flex-col text-${isRTL ? "right" : "left"}`}>
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-dental-navy mb-3 leading-tight">
              {/* headline - חדש */}
              רפואה מונעת חדשה – הבחירה עם הלב
            </h1>
            <h2 className="text-2xl font-heading font-semibold text-dental-orange mb-4">
              {/* מסר אמפתי חדש */}
              יחס אישי, מעקב מקצועי והגנה על כל חיוך – איתך לאורך כל הדרך.
            </h2>
            <p className="text-lg text-dental-navy/80 mb-6 max-w-md">
              {/* תיאור חדש, מסביר ערך מוסף */}
              אנחנו מאמינים שמניעה זה חיסכון בכאב, בעלויות ובזמן. כאן תמצאו בדיקות מדויקות, ליווי מקצועי וצוות שיהפוך את הבריאות הדנטלית להרגל נעים ונגיש.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <Button
                variant="orange"
                size="lg"
                className="rounded-full text-base md:text-lg px-8 shadow-md hover:scale-105 transition-all duration-300 font-semibold"
              >
                {/* CTA בולט ונעים */}
                אני רוצה להתחיל טיפול מונע
              </Button>
              {/* משולב: טלפון ו-וואטסאפ */}
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center border border-dental-orange bg-white rounded-full px-5 py-2 text-dental-orange font-medium ml-0 md:ml-2 shadow transition hover:bg-dental-orange/10"
                style={{ direction: "ltr" }}
              >
                <Phone className="h-5 w-5 ml-2" />
                {phoneNumber}
              </a>
              <a
                href={`https://wa.me/972515666915`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border border-dental-azure bg-white rounded-full px-5 py-2 text-dental-navy font-medium ml-0 md:ml-2 shadow transition hover:bg-dental-azure/10"
                style={{ direction: "ltr" }}
              >
                <MessageCircle className="h-5 w-5 ml-2" />
                WhatsApp
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl transform -rotate-3 scale-95"></div>
              <OptimizedImage
                src={mainImage}
                alt={treatmentNameKey}
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
            גללו מטה וחייכו לבריאות :)
          </span>
        </div>
      </div>
    </section>
  );
};

export default PreventiveMedicineHero;

