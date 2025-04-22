
import React from "react";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";
import { getDirectionalClasses } from "@/utils/responsiveUtils";
import { Section } from "@/components/ui/section";

const Process: React.FC = () => {
  const { isRTL } = useLanguage();
  const directional = getDirectionalClasses(isRTL);
  
  const steps = [
    {
      number: "01",
      title: "תכנון דיגיטלי של החיוך",
      description: "באמצעות טכנולוגיה מתקדמת, נבצע תכנון דיגיטלי מדויק של התוצאה הסופית, כך שתוכל/י לראות את התוצאות הצפויות עוד לפני תחילת הטיפול.",
    },
    {
      number: "02",
      title: "הכנת השיניים והטיפול",
      description: "בהתאם לסוג הטיפול שנבחר, נבצע את ההכנות הנדרשות ואת הטיפול עצמו, תוך הקפדה על נוחות מרבית ושימוש בחומרים איכותיים ביותר.",
    },
    {
      number: "03",
      title: "ביקורת והתאמות סופיות",
      description: "לאחר השלמת הטיפול, נבצע ביקורת סופית לוודא שהתוצאות עומדות בציפיות ובסטנדרטים הגבוהים שלנו ונבצע התאמות אם יש צורך.",
    },
    {
      number: "04",
      title: "מעקב ותחזוקה",
      description: "נספק הנחיות מפורטות לשמירה על התוצאות ונקבע תוכנית מעקב אישית כדי להבטיח את אריכות ימי הטיפול והשמירה על בריאות הפה.",
    }
  ];

  return (
    <Section id="process" spacing="lg" background="gradient" maxWidth="xl" directionAware={true}>
      <SectionHeader
        title="תהליך הטיפול האסתטי"
        subtitle="הצעדים להשגת החיוך המושלם"
      />

      <div className={`max-w-4xl mx-auto ${directional.textAlign}`}>
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`relative flex opacity-0 animate-[fade-in_0.5s_ease-out_forwards] ${!isRTL ? 'flex-row' : 'flex-row-reverse'}`}
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            {/* Timeline connector */}
            {index !== steps.length - 1 && (
              <div className={`absolute top-16 bottom-0 ${isRTL ? 'right-8' : 'left-8'} w-0.5 bg-dental-orange/20 z-0`}></div>
            )}
            
            {/* Step number */}
            <div className={`bg-dental-orange/10 text-dental-orange font-bold text-lg sm:text-xl w-16 h-16 rounded-full flex items-center justify-center ${isRTL ? 'ml-6' : 'mr-6'} z-10 shrink-0`}>
              {step.number}
            </div>
            
            {/* Step content */}
            <div className="pb-10 sm:pb-12">
              <h3 className="text-xl font-bold text-dental-navy mb-2">{step.title}</h3>
              <p className="text-sm sm:text-base text-dental-navy/70 max-w-lg">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Process;
