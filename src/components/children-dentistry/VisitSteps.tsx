
import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
  { icon: "🧸", label: "קבלת פנים עם צעצוע", desc: "נתחיל בפגישה בחדר המשחקים" },
  { icon: "💬", label: "הסבר קצר בעמדת הילדים", desc: "נראה ציוד וצעצועים דנטליים" },
  { icon: "🪥", label: "צחצוח יחד מול מראה", desc: "נלמד טכניקת צחצוח נכונה" },
  { icon: "📸", label: "סריקה עדינה עם מצלמה קטנה", desc: "נספור שיניים בעזרת מצלמה" },
  { icon: "🎁", label: "פרס אישי בסיום", desc: "בחירת מדבקה או הפתעה קטנה" },
];

const VisitSteps = () => {
  const isMobile = useIsMobile();

  return (
    <section id="visit-steps" className="py-14 md:py-20 px-4 bg-[#FFDEE2]/60 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-dental-navy mb-12 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          מהלך הביקור הראשון
        </h2>
        
        <div className="relative">
          {!isMobile && (
            <div className="absolute top-[43px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-dental-orange/10 via-dental-orange/40 to-dental-orange/10 rounded-full" />
          )}
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center gap-3 w-full relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-soft border border-dental-beige/30 p-1 z-10 transition-transform hover:scale-110 duration-300">
                  {step.icon}
                </div>
                
                <div className="text-center space-y-1">
                  <div className="font-bold text-dental-navy">{step.label}</div>
                  <div className="text-dental-navy/70 text-sm hidden md:block">{step.desc}</div>
                </div>
                
                {idx < steps.length - 1 && isMobile && (
                  <div className="flex justify-center w-full my-2">
                    <ArrowRight className="transform rotate-90 text-dental-orange/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4 bg-white/80 rounded-xl p-4 shadow-sm border border-dental-beige/30">
          <div className="flex items-center text-dental-navy">
            <Clock className="ml-2 text-dental-orange" />
            <span>ממוצע משך ביקור ראשון: 25-30 דקות</span>
          </div>
          <div className="text-dental-navy/70 text-sm md:text-base">אין טיפולים בביקור ראשון אלא אם יש צורך רפואי מיידי</div>
        </div>
      </div>
    </section>
  );
};

export default VisitSteps;
