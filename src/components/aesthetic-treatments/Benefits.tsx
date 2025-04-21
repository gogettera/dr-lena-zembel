
import React from "react";
import { Check } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";
import SectionHeader from "@/components/ui/section-header";

const Benefits: React.FC = () => {
  const benefits = [
    "תוצאות טבעיות ומותאמות אישית לפנים ולאישיות שלך",
    "שיפור משמעותי בביטחון העצמי והדימוי העצמי",
    "טכנולוגיות מתקדמות להשגת תוצאות מיטביות",
    "תהליך טיפולי נוח ומהיר עם זמני החלמה קצרים",
    "אבחון מקיף ותכנון דיגיטלי לדיוק מרבי בתוצאות",
    "פתרונות ארוכי טווח עם תחזוקה פשוטה"
  ];

  return (
    <section id="benefits" className="py-16 md:py-24 px-4 bg-gradient-to-br from-white via-dental-beige/10 to-white">
      <div className="container mx-auto">
        <SectionHeader
          title="יתרונות הטיפולים האסתטיים שלנו"
          subtitle="מדוע לבחור בטיפולים האסתטיים במרפאה שלנו"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 rtl:space-x-reverse opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="bg-dental-pink/20 p-1 rounded-full mt-1">
                    <Check className="h-5 w-5 text-dental-orange" />
                  </div>
                  <p className="text-dental-navy/80 text-lg">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-dental-beige/20 border border-dental-beige/30 rounded-xl shadow-sm opacity-0 animate-[fade-in_0.5s_ease-out_0.8s_forwards]">
              <h4 className="text-xl font-bold text-dental-navy mb-3">מתאים במיוחד למי ש:</h4>
              <ul className="list-disc list-inside space-y-2 text-dental-navy/80">
                <li>מעוניין לשפר את מראה השיניים והחיוך</li>
                <li>סובל משיניים שבורות, סדוקות או פגומות</li>
                <li>מחפש פתרון לשיניים מוכתמות או דהויות</li>
                <li>רוצה לתקן רווחים בין השיניים או חוסר סימטריה</li>
              </ul>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl transform -rotate-3 scale-95"></div>
              <OptimizedImage
                src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
                alt="תוצאות טיפולים אסתטיים"
                className="w-full max-w-md rounded-2xl shadow-lg border-2 border-white/80 transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
