
import React from "react";
import { Check, Bandage, Syringe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyUs = () => {
  const { t, language } = useLanguage();

  const reasons = [
    {
      icon: <Syringe className="h-6 w-6 text-[#9b87f5]" />,
      title: t("rootCanal.whyUs.reason1.title", language === "he" 
        ? "ציוד מתקדם וטכנולוגיות עכשוויות" 
        : "Advanced Equipment & Modern Technology"),
      desc: t("rootCanal.whyUs.reason1.desc", language === "he"
        ? "הטיפול נעשה בעזרת המכשור המתקדם ביותר – להפחתת כאב והבטחת הצלחת התהליך."
        : "Treatments performed using the most advanced equipment – reducing pain and ensuring treatment success."),
    },
    {
      icon: <Bandage className="h-6 w-6 text-[#9b87f5]" />,
      title: t("rootCanal.whyUs.reason2.title", language === "he" 
        ? "יחס אישי וליווי צמוד" 
        : "Personalized Care & Close Support"),
      desc: t("rootCanal.whyUs.reason2.desc", language === "he"
        ? "אנחנו כאן בשבילך לכל שאלה ודאגה, מהרגע הראשון עד לסיום מלא של ההחלמה."
        : "We are here for you with any concern or question, from the first moment until your full recovery."),
    },
    {
      icon: <Check className="h-6 w-6 text-[#9b87f5]" />,
      title: t("rootCanal.whyUs.reason3.title", language === "he" 
        ? "ניסיון רב ומוניטין גבוה" 
        : "Extensive Experience & Great Reputation"),
      desc: t("rootCanal.whyUs.reason3.desc", language === "he"
        ? "מאות מטופלים עברו אצלנו טיפולי שורש – בהצלחה ובאווירה בטוחה."
        : "Hundreds of patients have had successful root canal treatments here – in a safe and relaxed environment."),
    },
  ];

  return (
    <section className="py-14 md:py-20 px-4 bg-[#F1F0FB]">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-[#6E59A5] mb-10 text-center">
          {t("rootCanal.whyUsTitle", language === "he" ? "למה לטפל אצלנו?" : "Why Choose Us?")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-soft flex flex-col items-center text-center border border-dental-beige/40 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <span className="mb-4">{r.icon}</span>
              <h3 className="text-xl font-bold text-[#6E59A5] mb-2">{r.title}</h3>
              <p className="text-[#6E59A5]/80 text-base">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
