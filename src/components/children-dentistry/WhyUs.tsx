
import React from "react";
import { Baby, Headphones, HandHeart } from "lucide-react";

const items = [
  {
    icon: <span className="text-3xl leading-none">🎈</span>,
    title: "ללא לחץ",
    desc: "הביקור הראשון תמיד מתחיל בשיחה, לא בטיפול.",
  },
  {
    icon: <Baby className="text-dental-orange" size={30} />,
    title: "גישה מותאמת גיל",
    desc: "הסברים בגובה העיניים, בלי מילים מלחיצות.",
  },
  {
    icon: <Headphones className="text-dental-orange" size={30} />,
    title: "הסחות דעת חיוביות",
    desc: "מסך עם סרטונים אהובים, צעצועים, מדבקות.",
  },
  {
    icon: <HandHeart className="text-dental-orange" size={30} />,
    title: "הורים שותפים",
    desc: "הורה אחד תמיד נשאר ליד הילד – ואפילו משתתף אם רוצים.",
  },
];

const WhyUs = () => (
  <section className="py-14 md:py-20 bg-[#D3E4FD]/50">
    <div className="container mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-10 text-center">למה ילדים (והורים) אוהבים להגיע אלינו?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className="bg-white/80 rounded-2xl shadow-soft border border-dental-beige/40 p-6 text-center flex flex-col items-center">
            <div className="mb-3">{item.icon}</div>
            <div className="font-bold text-dental-navy text-lg mb-2">{item.title}</div>
            <div className="text-dental-navy/80 text-sm">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
