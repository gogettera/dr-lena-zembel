
import React from "react";
import { Baby, Headphones, HandHeart, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
  {
    icon: <span className="text-3xl leading-none">🎈</span>,
    title: "ללא לחץ",
    desc: "הביקור הראשון תמיד מתחיל בשיחה, לא בטיפול. יוצרים חווית ביקור נעימה ורגועה.",
  },
  {
    icon: <Baby className="text-dental-orange" size={30} />,
    title: "גישה מותאמת גיל",
    desc: "הסברים בגובה העיניים, בלי מילים מלחיצות. שימוש בשפה התפתחותית מותאמת.",
  },
  {
    icon: <Headphones className="text-dental-orange" size={30} />,
    title: "הסחות דעת חיוביות",
    desc: "מסך עם סרטונים אהובים, צעצועים, מדבקות וגם אפשרות להביא צעצוע מהבית.",
  },
  {
    icon: <HandHeart className="text-dental-orange" size={30} />,
    title: "הורים שותפים",
    desc: "הורה אחד תמיד נשאר ליד הילד – ואפילו משתתף אם רוצים. הורים הם חלק חשוב מהתהליך.",
  },
];

const WhyUs = () => {
  const isMobile = useIsMobile();

  return (
    <section id="why-us" className="py-14 md:py-20 bg-[#D3E4FD]/50 scroll-mt-24">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-10 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          למה ילדים (והורים) אוהבים להגיע אלינו?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="bg-white/80 rounded-2xl shadow-soft border border-dental-beige/40 p-6 text-center flex flex-col items-center group hover:shadow-lg transition-all duration-300 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-4 bg-[#F1F0FB]/70 rounded-full p-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="font-bold text-dental-navy text-lg mb-3">{item.title}</div>
              <div className="text-dental-navy/80 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 max-w-2xl mx-auto bg-dental-navy/5 rounded-2xl p-6 border border-dental-beige/30 opacity-0 animate-[fade-in_0.5s_ease-out_0.4s_forwards]">
          <div className="flex items-center mb-3">
            <Award className="text-dental-orange ml-3" size={24} />
            <h3 className="font-bold text-dental-navy text-lg">מומחיות בטיפול בילדים</h3>
          </div>
          <p className="text-dental-navy/80 text-sm md:text-base">
            צוות המרפאה שלנו עובר הכשרות מיוחדות בטיפול בילדים ונמצא בקשר רציף עם מומחים מובילים בתחום רפואת השיניים לילדים. אנחנו מאמינים שהחוויה הראשונה של ילדכם עם רופא שיניים יכולה להשפיע על יחסם לבריאות הפה והשיניים לכל החיים.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
