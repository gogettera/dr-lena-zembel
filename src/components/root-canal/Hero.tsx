
import React from "react";
import { Syringe } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";
import { useLanguage } from "@/contexts/LanguageContext";

const RootCanalHero: React.FC = () => {
  const { t, language } = useLanguage();

  // Use translation keys instead of hardcoded text
  const headline = t("rootCanal.headline", language === "he" 
    ? "טיפולי שורש בטכניקה מתקדמת, עם דגש על נוחות ותמיכה"
    : "Advanced Root Canal Treatment Focused On Comfort and Support");
  
  const subtext = t("rootCanal.subtext", language === "he"
    ? "מענה מקצועי ומרגיע – כך שתוכלו לשמור על השן ולחזור לחייך ללא חשש."
    : "Professional and reassuring care – so you can preserve your tooth and smile again with confidence.");

  return (
    <section id="hero" className="relative py-10 md:py-24 px-4 bg-[#E5DEFF] overflow-hidden scroll-mt-24">
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#8B5CF6]/10 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-[#0EA5E9]/10 pointer-events-none" />
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20 relative z-10">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center mb-5 md:mb-0">
          <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            <OptimizedImage
              src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
              alt={t("rootCanal.heroImageAlt", "Root Canal Treatment at our clinic")}
              className="rounded-3xl shadow-lg w-[340px] md:w-[420px] h-auto object-cover border-4 border-white"
            />
            <Syringe className="absolute -top-8 rtl:-right-8 left-1/2 -translate-x-1/2 h-14 w-14 text-[#9b87f5] bg-white rounded-full border shadow-lg p-2 animate-pulse" />
          </div>
        </div>
        {/* Hero Text */}
        <div className="md:w-1/2 text-center md:text-right flex flex-col items-center md:items-end">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#6E59A5] font-[Heebo] leading-snug opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-[#6E59A5]/80 mb-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            {subtext}
          </p>
        </div>
      </div>
    </section>
  );
};

export default RootCanalHero;
