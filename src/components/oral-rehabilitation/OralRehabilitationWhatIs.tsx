
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CircleDot, Calendar, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const OralRehabilitationWhatIs = () => {
  const { t } = useLanguage();

  return (
    <section className="py-14 bg-dental-beige/60">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-dental-navy mb-6 animate-fade-in">
          מה זה שיקום פה? קיצור הדרך לחיוך מלא, ביום אחד.
        </h2>
        <p className="text-lg md:text-xl text-dental-navy/80 mb-5 animate-fade-in">
          שיקום פה מקיף זו הדרך לעבור ממראה שחוק ובעיות תפקודיות לחיוך מושלם—בפגישת ייעוץ אחת, אבחון דיגיטלי, וטיפול ממוקד שנותן תוצאה מידית ותחושת ביטחון אמיתית.
          <span className="block mt-2 font-semibold text-dental-navy"> התהליך משנה חיים – ומאפשר לאכול, לדבר ולחייך טבעי שוב, ללא מבוכה.</span>
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 animate-fade-in">
          <div className="flex-1 rounded-xl bg-white p-6 shadow-soft hover:shadow-glow transition-shadow items-center flex flex-col gap-2">
            <CircleDot className="h-8 w-8 text-dental-orange mb-2" />
            <span className="text-dental-navy font-semibold mb-1">טיפול אישי בטכנולוגיה מתקדמת</span>
            <span className="text-dental-navy/70 text-sm">
              הדמיות דיגיטליות, סריקות מדויקות, וליווי צמוד ישירות ע"י ד"ר לנה זמבל וצוות מומחים.
            </span>
          </div>
          <div className="flex-1 rounded-xl bg-white p-6 shadow-soft hover:shadow-glow transition-shadow items-center flex flex-col gap-2">
            <Calendar className="h-8 w-8 text-dental-orange mb-2" />
            <span className="text-dental-navy font-semibold mb-1">בלי לחכות חודשים</span>
            <span className="text-dental-navy/70 text-sm">
              ברוב המקרים—חיוך קבוע ותפקוד חדש, כבר ביום אחד בלבד. <br /> תכנית מותאמת אישית בזמן שיא.
            </span>
          </div>
          <div className="flex-1 rounded-xl bg-white p-6 shadow-soft hover:shadow-glow transition-shadow items-center flex flex-col gap-2">
            <Check className="h-8 w-8 text-dental-orange mb-2" />
            <span className="text-dental-navy font-semibold mb-1">חיוך שמחזיק שנים</span>
            <span className="text-dental-navy/70 text-sm">
              פתרון איכותי וללא פשרות שנותן לכם וליקיריכם שקט, בריאות, וביטחון עצמי אמיתי.
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 items-center animate-fade-in">
          <Button
            variant="orange"
            size="lg"
            className="rounded-full px-8 py-3 text-lg font-semibold shadow-md hover:scale-105 transition-all duration-300"
          >
            <Phone className="h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0" /> {t("bookVisit", "קבעו ייעוץ ראשוני")}
          </Button>
          <a
            href="https://wa.me/97235666915"
            className="inline-flex items-center gap-2 text-dental-orange hover:text-dental-navy font-bold transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="inline-block rounded-full bg-dental-orange/10 px-3 py-2">
              WhatsApp
            </span>
            <span className="text-base">שיחה בוואטסאפ</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default OralRehabilitationWhatIs;
