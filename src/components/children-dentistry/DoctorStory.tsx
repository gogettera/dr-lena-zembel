
import React from "react";
import { Award } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";
import { useIsMobile } from "@/hooks/use-mobile";

const DoctorStory = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-14 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:col-span-1 order-2 md:order-1">
            <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
              <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-4 border-dental-beige/40 shadow-lg">
                <OptimizedImage
                  src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
                  alt="ד״ר לנה זמבל - רופאת שיניים לילדים"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                <Award className="text-dental-orange h-6 w-6" />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="bg-[#F1F0FB] rounded-2xl p-8 shadow-soft border border-dental-beige/40 text-right opacity-0 animate-[fade-in_0.5s_ease-out_0.2s_forwards]">
              <h2 className="text-2xl font-bold text-dental-navy mb-4">המומחיות שלנו</h2>
              <p className="text-dental-navy/80 text-lg leading-relaxed mb-3">
                במהלך שנות ההתמחות, ד״ר לנה זמבל פיתחה גישה ייחודית המשלבת מקצועיות, הבנה עמוקה של צרכי המטופל ויצירת סביבת טיפול בטוחה ונעימה במיוחד לילדים.
              </p>
              <p className="text-dental-navy/80 text-lg leading-relaxed mb-3">
                במרפאה, כל מטופל זוכה לתשומת לב מלאה וטיפול מותאם אישית. היא מבינה את החששות של הילדים ומעניקה מענה מקצועי ומקיף לכל מטופל.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="bg-dental-navy/5 px-3 py-1 rounded text-sm text-dental-navy">
                  13 שנות ניסיון
                </div>
                <div className="bg-dental-navy/5 px-3 py-1 rounded text-sm text-dental-navy">
                  התמחות ברפואת שיניים
                </div>
                <div className="bg-dental-navy/5 px-3 py-1 rounded text-sm text-dental-navy">
                  גישה ייחודית לילדים
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorStory;
