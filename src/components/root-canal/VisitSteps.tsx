
import React from "react";
import { Syringe, Plus, Bandage } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const VisitSteps = () => {
  const { t, language } = useLanguage();
  
  const steps = [
    {
      icon: <Syringe className="h-5 w-5 text-[#9b87f5]" />,
      title: t("rootCanal.steps.step1.title", language === "he" ? "בדיקת אבחון" : "Diagnostic Exam"),
      desc: t("rootCanal.steps.step1.desc", language === "he" 
        ? "בדיקה יסודית של השן ובדיקת צילום – קבלת תמונה מלאה לפני תחילת טיפול."
        : "Thorough examination of the tooth and X-ray – ensuring a complete picture before treatment."),
    },
    {
      icon: <Plus className="h-5 w-5 text-[#9b87f5]" />,
      title: t("rootCanal.steps.step2.title", language === "he" ? "טיפול שורש" : "Root Canal Treatment"),
      desc: t("rootCanal.steps.step2.desc", language === "he"
        ? "בהרדמה מקומית, ניקוי תעלות השורש, חיטוי ומילוי למניעת זיהומים עתידיים."
        : "Local anesthesia, cleaning the root canals, sterilization, and filling to prevent future infections."),
    },
    {
      icon: <Bandage className="h-5 w-5 text-[#9b87f5]" />,
      title: t("rootCanal.steps.step3.title", language === "he" ? "שיקום וסגירת השן" : "Restoration & Sealing"),
      desc: t("rootCanal.steps.step3.desc", language === "he"
        ? "שחזור השן ואיטום – להבטחת אטימות ומניעת כאבים חוזרים."
        : "Restoring and sealing the tooth – for long-term comfort and pain prevention."),
    },
  ];

  return (
    <section className="py-14 md:py-20 px-4 bg-[#E5DEFF]/20">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-[#6E59A5] mb-10 text-center">
          {t("rootCanal.stepsTitle", language === "he" ? "שלבי הטיפול" : "Treatment Steps")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-soft flex flex-col items-center text-center border border-dental-beige/40 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="mb-4">{step.icon}</span>
              <h3 className="text-lg font-bold text-[#6E59A5] mb-2">
                {step.title}
              </h3>
              <p className="text-[#6E59A5]/80 text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisitSteps;
