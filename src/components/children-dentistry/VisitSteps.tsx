
import React from "react";
import { Clock } from "lucide-react";

const steps = [
  { icon: "🧸", label: "קבלת פנים עם צעצוע" },
  { icon: "💬", label: "הסבר קצר בעמדת הילדים" },
  { icon: "🪥", label: "צחצוח יחד מול מראה" },
  { icon: "📸", label: "סריקה עדינה עם מצלמה קטנה" },
  { icon: "🎁", label: "פרס אישי בסיום" },
];

const VisitSteps = () => (
  <section className="py-14 md:py-20 px-4 bg-[#FFDEE2]/60">
    <div className="container mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-dental-navy mb-8 text-center">מהלך הביקור הראשון</h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3 w-full">
            <div className="text-3xl md:text-4xl">{step.icon}</div>
            <div className="text-dental-navy font-semibold text-center">{step.label}</div>
            {idx < steps.length - 1 && (
              <div className="hidden md:block w-8 h-1 bg-dental-orange/30 my-2" />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <div className="flex items-center text-dental-navy">
          <Clock className="mr-2 text-dental-orange" />
          <span>ממוצע משך ביקור ראשון: 25 דקות</span>
        </div>
        <div className="text-dental-navy/70">אין טיפולים אלא אם יש צורך רפואי מיידי</div>
      </div>
    </div>
  </section>
);

export default VisitSteps;
