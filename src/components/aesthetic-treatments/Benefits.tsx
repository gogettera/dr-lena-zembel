
import React from "react";
import { Check } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";
import { getResponsiveClasses, getDirectionalClasses } from "@/utils/responsiveUtils";
import { Section } from "@/components/ui/section";

const Benefits: React.FC = () => {
  const { isRTL } = useLanguage();
  const responsive = getResponsiveClasses();
  const directional = getDirectionalClasses(isRTL);
  
  const benefits = [
    "תוצאות טבעיות ומותאמות אישית לפנים ולאישיות שלך",
    "שיפור משמעותי בביטחון העצמי והדימוי העצמי",
    "טכנולוגיות מתקדמות להשגת תוצאות מיטביות",
    "תהליך טיפולי נוח ומהיר עם זמני החלמה קצרים",
    "אבחון מקיף ותכנון דיגיטלי לדיוק מרבי בתוצאות",
    "פתרונות ארוכי טווח עם תחזוקה פשוטה"
  ];

  return (
    <Section id="benefits" spacing="lg" background="beige" maxWidth="xl" directionAware={true}>
      <SectionHeader
        title="יתרונות הטיפולים האסתטיים שלנו"
        subtitle="מדוע לבחור בטיפולים האסתטיים במרפאה שלנו"
      />

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${directional.textAlign}`}>
        <div className={`${isRTL ? 'lg:order-1' : 'lg:order-0'}`}>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`flex items-start ${isRTL ? 'space-x-reverse' : ''} gap-3 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="bg-dental-pink/20 p-1 rounded-full mt-1 shrink-0">
                  <Check className="h-5 w-5 text-dental-orange" />
                </div>
                <p className="text-dental-navy/80 text-sm sm:text-base md:text-lg">{benefit}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 sm:p-6 bg-dental-beige/20 border border-dental-beige/30 rounded-xl shadow-sm opacity-0 animate-[fade-in_0.5s_ease-out_0.8s_forwards]">
            <h4 className="text-lg sm:text-xl font-bold text-dental-navy mb-3">מתאים במיוחד למי ש:</h4>
            <ul className="list-disc list-inside space-y-2 text-dental-navy/80 text-sm sm:text-base">
              <li>מעוניין לשפר את מראה השיניים והחיוך</li>
              <li>סובל משיניים שבורות, סדוקות או פגומות</li>
              <li>מחפש פתרון לשיניים מוכתמות או דהויות</li>
              <li>רוצה לתקן רווחים בין השיניים או חוסר סימטריה</li>
            </ul>
          </div>
        </div>
        
        <div className={`${isRTL ? 'lg:order-0' : 'lg:order-1'} flex justify-center`}>
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl transform -rotate-3 scale-95"></div>
            <OptimizedImage
              src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
              alt="תוצאות טיפולים אסתטיים"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-lg border-2 border-white/80 transform rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
