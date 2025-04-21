
import React from "react";
import { BookCheck, BookOpen, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
  { icon: "📋", label: "אבחון ותכנון אישי", desc: "בדיקת מצב הפה, צילום ובניית תוכנית טיפול ממוחשבת." },
  { icon: "🦷", label: "התקנת מכשירים", desc: "קיבוע סמכים/קשתיות בלתי נראות בהתאם לתוכנית." },
  { icon: "🔁", label: "ביקורות ומעקב", desc: "הדרכה למעקב צמוד וביקורת חודשית לקידום התהליך." },
  { icon: "✨", label: "חשיפת החיוך החדש", desc: "הסרת המכשירים, הדרכה לשמירה על התוצאה." },
];

const VisitSteps = () => {
  const isMobile = useIsMobile();

  return (
    <section id="visit-steps" className="py-14 md:py-20 px-4 bg-[#E5DEFF]/40 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-[#6E59A5] mb-12 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          מהלך התהליך ליישור שיניים
        </h2>
        <div className="relative">
          {!isMobile && (
            <div className="absolute top-[43px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-[#9b87f5]/20 via-[#9b87f5]/50 to-[#9b87f5]/20 rounded-full" />
          )}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-3 w-full relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-soft border border-[#E5DEFF]/50 p-1 z-10 transition-transform hover:scale-110 duration-300">
                  {step.icon}
                </div>
                <div className="text-center space-y-1">
                  <div className="font-bold text-[#6E59A5]">{step.label}</div>
                  <div className="text-[#6E59A5]/70 text-sm hidden md:block">{step.desc}</div>
                </div>
                {idx < steps.length - 1 && isMobile && (
                  <div className="flex justify-center w-full my-2">
                    <ChevronDown className="text-[#9b87f5]/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4 bg-white/80 rounded-xl p-4 shadow-sm border border-dental-beige/30">
          <div className="flex items-center text-[#6E59A5]">
            <BookOpen className="ml-2 text-[#9b87f5]" />
            <span>פרק זמן ממוצע: 12-24 חודשים</span>
          </div>
          <div className="text-[#6E59A5]/70 text-sm md:text-base">התוכנית מותאמת לכל מטופל/ת ומשתנה לפי הצורך</div>
        </div>
      </div>
    </section>
  );
};
export default VisitSteps;
