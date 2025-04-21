
import React from "react";
import { Award, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const insuranceLogos = [
  "כללית מושלם",
  "מכבי זהב",
  "לאומית זהב",
  "מאוחדת שיא"
];

const Plans = () => (
  <section className="py-14 md:py-20 px-4 bg-[#FFDEE2]/60">
    <div className="container mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-dental-navy mb-12 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
        עלויות, ביטוחים ותוכניות
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white/90 rounded-2xl p-8 shadow-soft border border-dental-beige/30 text-center opacity-0 animate-[fade-in_0.5s_ease-out_0.2s_forwards]">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-full bg-[#F1F0FB] flex items-center justify-center mx-auto mb-4">
              <Award className="text-dental-orange" size={28} />
            </div>
            <h3 className="text-xl font-bold text-dental-navy mb-2">ביטוחי שיניים</h3>
          </div>
          
          <div className="text-lg text-dental-navy mb-6">
            אנחנו מכבדים ביטוחי שיניים מובילים
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {insuranceLogos.map((logo, idx) => (
              <div key={idx} className="bg-[#F1F0FB]/70 text-dental-navy px-4 py-2 rounded-full text-sm border border-dental-beige/20">
                {logo}
              </div>
            ))}
          </div>
          
          <div className="text-dental-navy/80 text-sm mt-4">
            צוות המשרד שלנו ישמח לעזור לכם בהבנת הכיסוי הביטוחי שלכם
          </div>
        </div>
        
        <div className="bg-white/90 rounded-2xl p-8 shadow-soft border border-dental-beige/30 text-center opacity-0 animate-[fade-in_0.5s_ease-out_0.4s_forwards]">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-full bg-[#F1F0FB] flex items-center justify-center mx-auto mb-4">
              <FileText className="text-dental-orange" size={28} />
            </div>
            <h3 className="text-xl font-bold text-dental-navy mb-2">תוכנית מנוי משפחתית</h3>
          </div>
          
          <div className="text-lg text-dental-navy mb-4">
            ללא ביטוח? יש לנו פתרון מצוין
          </div>
          
          <ul className="text-right space-y-3 mb-6">
            {["בדיקות תקופתיות ללא עלות", "ניקוי אבנית פעמיים בשנה", "צילומים במחיר מוזל", "10% הנחה על כל הטיפולים"].map((item, idx) => (
            <li key={idx} className="flex items-center text-dental-navy/90">
              <CheckCircle className="ml-2 text-dental-orange flex-shrink-0" size={18} />
              <span>{item}</span>
            </li>
            ))}
          </ul>
          
          <Button 
            variant="outline" 
            className="rounded-full border-dental-orange text-dental-orange hover:bg-dental-orange hover:text-white transition-all"
          >
            לפרטים נוספים
          </Button>
        </div>
      </div>
      
      <div className="bg-dental-navy/5 rounded-xl p-6 text-center max-w-2xl mx-auto opacity-0 animate-[fade-in_0.5s_ease-out_0.6s_forwards]">
        <p className="text-dental-navy/90">
          אנו מציעים מגוון אפשרויות תשלום ותוכניות מימון נוחות. שאלו אותנו כיצד אנו יכולים להתאים לתקציב שלכם.
        </p>
      </div>
    </div>
  </section>
);

export default Plans;
