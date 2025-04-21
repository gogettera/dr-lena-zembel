
import React from "react";
import { BookCheck, BookHeart, BookOpen, BookUser } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
  {
    icon: <BookCheck className="text-[#9b87f5]" size={30} />,
    title: "תכנון מדויק ומתקדם",
    desc: "הטיפול נעשה באמצעות טכנולוגיות המתקדמות ביותר בהתאמה אישית מלאה.",
  },
  {
    icon: <BookHeart className="text-[#9b87f5]" size={30} />,
    title: "ליווי צמוד",
    desc: "הצוות מלווה אתכם לאורך כל הדרך – מהבדיקה ועד לסיום הטיפול.",
  },
  {
    icon: <BookOpen className="text-[#9b87f5]" size={30} />,
    title: "שקיפות מלאה",
    desc: "כל שלב מוסבר, כל שאלה נענית – אצלנו אין הפתעות.",
  },
  {
    icon: <BookUser className="text-[#9b87f5]" size={30} />,
    title: "גישה אנושית",
    desc: "הרגשה ביתית ותמיכה רגשית לנערים, ילדים ומבוגרים.",
  },
];

const WhyUs = () => {
  const isMobile = useIsMobile();
  return (
    <section id="why-us" className="py-14 md:py-20 bg-[#FDF4F0]/60 scroll-mt-24">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#6E59A5] mb-10 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          למה לבחור בנו ליישור שיניים?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
          {items.map((item, i) => (
            <div 
              key={i}
              className="bg-white/80 rounded-2xl shadow-soft border border-dental-beige/40 p-6 text-center flex flex-col items-center group hover:shadow-lg transition-all duration-300 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-4 bg-[#D6BCFA]/40 rounded-full p-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="font-bold text-[#6E59A5] text-lg mb-3">{item.title}</div>
              <div className="text-[#6E59A5]/80 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-2xl mx-auto bg-[#E5DEFF]/20 rounded-2xl p-6 border border-dental-beige/30 opacity-0 animate-[fade-in_0.5s_ease-out_0.4s_forwards]">
          <div className="flex items-center mb-3">
            <BookHeart className="text-[#9b87f5] ml-3" size={24} />
            <h3 className="font-bold text-[#6E59A5] text-lg">מומחים ביצירת חיוכים</h3>
          </div>
          <p className="text-[#6E59A5]/80 text-sm md:text-base">
            בשיטות המובילות בעולם – לרבות קשתיות שקופות, סמכים בלתי נראים, וטיפול בהתאמה לצרכי המטופל.
          </p>
        </div>
      </div>
    </section>
  );
};
export default WhyUs;
