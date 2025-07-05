
import React from "react";
import { Check, Bandage, Syringe, Shield, Heart, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyUs = () => {
  const { t, language } = useLanguage();

  const reasons = [
    {
      icon: Syringe,
      title: t("rootCanal.whyUs.reason1.title", language === "he" 
        ? "ציוד מתקדם וטכנולוגיות עכשוויות" 
        : "Advanced Equipment & Modern Technology"),
      desc: t("rootCanal.whyUs.reason1.desc", language === "he"
        ? "הטיפול נעשה בעזרת המכשור המתקדם ביותר – להפחתת כאב והבטחת הצלחת התהליך."
        : "Treatments performed using the most advanced equipment – reducing pain and ensuring treatment success."),
      color: 'hsl(var(--dental-primary))' 
    },
    {
      icon: Heart,
      title: t("rootCanal.whyUs.reason2.title", language === "he" 
        ? "יחס אישי וליווי צמוד" 
        : "Personalized Care & Close Support"),
      desc: t("rootCanal.whyUs.reason2.desc", language === "he"
        ? "אנחנו כאן בשבילך לכל שאלה ודאגה, מהרגע הראשון עד לסיום מלא של ההחלמה."
        : "We are here for you with any concern or question, from the first moment until your full recovery."),
      color: 'hsl(var(--dental-coral))'
    },
    {
      icon: Award,
      title: t("rootCanal.whyUs.reason3.title", language === "he" 
        ? "ניסיון רב ומוניטין גבוה" 
        : "Extensive Experience & Great Reputation"),
      desc: t("rootCanal.whyUs.reason3.desc", language === "he"
        ? "מאות מטופלים עברו אצלנו טיפולי שורש – בהצלחה ובאווירה בטוחה."
        : "Hundreds of patients have had successful root canal treatments here – in a safe and relaxed environment."),
      color: 'hsl(var(--dental-gold))'
    },
  ];

  return (
    <section className="premium-section bg-gradient-to-b from-white to-dental-cream/20">
      <div className="premium-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dental-navy mb-6">
            {t("rootCanal.whyUsTitle", language === "he" ? "למה לטפל אצלנו?" : "Why Choose Us?")}
          </h2>
          <p className="premium-text-large text-dental-navy/80 max-w-3xl mx-auto">
            המומחיות והטכנולוגיה הגרמנית של ד״ר לנה זמבל - הסיבות שמטופלים בוחרים בנו פעם אחר פעם
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className={`premium-card hover:shadow-floating group transition-all duration-500 animate-delay-${(index + 1) * 200}`}
            >
              <CardContent className="p-8 text-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${reason.color}/0.1` }}
                >
                  <reason.icon 
                    className="h-8 w-8"
                    style={{ color: reason.color }}
                  />
                </div>
                
                <h3 
                  className="text-xl font-bold mb-4 group-hover:text-dental-primary transition-colors duration-300"
                  style={{ color: reason.color }}
                >
                  {reason.title}
                </h3>
                
                <p className="premium-text-body text-dental-navy/70 leading-relaxed">
                  {reason.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics section */}
        <div className="mt-20">
          <div className="premium-card bg-gradient-to-r from-dental-primary/5 to-dental-coral/5 p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-dental-primary mb-2">98%</div>
                <div className="premium-text-small text-dental-navy/70">שיעור הצלחה</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-dental-coral mb-2">500+</div>
                <div className="premium-text-small text-dental-navy/70">טיפולי שורש</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-dental-mint mb-2">13+</div>
                <div className="premium-text-small text-dental-navy/70">שנות ניסיון</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-dental-gold mb-2">24/7</div>
                <div className="premium-text-small text-dental-navy/70">זמינות לחירום</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
