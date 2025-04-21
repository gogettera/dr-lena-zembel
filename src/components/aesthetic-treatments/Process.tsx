
import React from "react";
import SectionHeader from "@/components/ui/section-header";

const Process: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "פגישת ייעוץ ואבחון ראשוני",
      description: "בפגישה הראשונית נבצע הערכה מקיפה של מצב השיניים והחניכיים, נשוחח על המטרות האסתטיות שלך ונדון באפשרויות הטיפול המתאימות ביותר.",
    },
    {
      number: "02",
      title: "תכנון דיגיטלי של החיוך",
      description: "באמצעות טכנולוגיה מתקדמת, נבצע תכנון דיגיטלי מדויק של התוצאה הסופית, כך שתוכל/י לראות את התוצאות הצפויות עוד לפני תחילת הטיפול.",
    },
    {
      number: "03",
      title: "הכנת השיניים והטיפול",
      description: "בהתאם לסוג הטיפול שנבחר, נבצע את ההכנות הנדרשות ואת הטיפול עצמו, תוך הקפדה על נוחות מרבית ושימוש בחומרים איכותיים ביותר.",
    },
    {
      number: "04",
      title: "ביקורת והתאמות סופיות",
      description: "לאחר השלמת הטיפול, נבצע ביקורת סופית לוודא שהתוצאות עומדות בציפיות ובסטנדרטים הגבוהים שלנו ונבצע התאמות אם יש צורך.",
    },
    {
      number: "05",
      title: "מעקב ותחזוקה",
      description: "נספק הנחיות מפורטות לשמירה על התוצאות ונקבע תוכנית מעקב אישית כדי להבטיח את אריכות ימי הטיפול והשמירה על בריאות הפה.",
    }
  ];

  return (
    <section id="process" className="py-16 md:py-24 px-4 bg-gradient-to-br from-dental-beige/20 via-white to-dental-pink/10">
      <div className="container mx-auto">
        <SectionHeader
          title="תהליך הטיפול האסתטי"
          subtitle="הצעדים להשגת החיוך המושלם"
        />

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative flex opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Left timeline connector */}
              {index !== steps.length - 1 && (
                <div className="absolute top-16 bottom-0 left-8 w-0.5 bg-dental-orange/20 z-0"></div>
              )}
              
              {/* Step number */}
              <div className="bg-dental-orange/10 text-dental-orange font-bold text-xl w-16 h-16 rounded-full flex items-center justify-center mr-6 z-10 shrink-0">
                {step.number}
              </div>
              
              {/* Step content */}
              <div className="pb-12">
                <h3 className="text-xl font-bold text-dental-navy mb-2">{step.title}</h3>
                <p className="text-dental-navy/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
