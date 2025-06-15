
import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EmergencyBanner: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full bg-gradient-to-l from-dental-orange/90 to-dental-orange/70 text-white py-2 px-4 text-center text-sm font-semibold flex flex-col sm:flex-row items-center justify-center gap-2 z-50">
      <span className="mr-2">
        {t("hero.emergencyBanner.text", "כאב חריף? זמינים לתת מענה אנושי 24/7, באמפתיה ודיסקרטיות")}
        &nbsp;
        <a href="tel:03-566-6915" className="underline font-bold text-white hover:text-dental-azure transition">
          {t("hero.emergencyBanner.phone", "03-566-6915")}
        </a>
      </span>
      <span className="hidden sm:inline-block">|</span>
      <a
        href="https://wa.me/972515666915"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 underline font-bold text-white hover:text-[#64d25a] transition"
      >
        <MessageCircle className="h-5 w-5" />
        {t("hero.whatsappContact", "צרו קשר דיסקרטי ב-WhatsApp")}
      </a>
    </div>
  );
};

export default EmergencyBanner;
