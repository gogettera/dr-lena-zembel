
import React from "react";

const faq = [
  {
    q: "באיזה גיל כדאי להתחיל טיפולי שיניים?",
    a: "בדרך כלל מומלץ סביב גיל שנתיים וחצי – או לאחר בקיעת השיניים הראשונות.",
  },
  {
    q: "מה אם הילד לא משתף פעולה?",
    a: "זה בסדר גמור – יש לנו שיטות רכות, מבוססות גישה פסיכולוגית לילדים.",
  },
  {
    q: "האם אפשר להגיע רק להתייעצות?",
    a: "בוודאי. אין התחייבות להמשך טיפול.",
  },
];

const FAQ = () => (
  <section className="py-14 md:py-20 px-4 bg-white">
    <div className="container mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-dental-navy mb-8 text-center">שאלות נפוצות</h2>
      <div className="space-y-6">
        {faq.map((item, i) => (
          <div key={i} className="bg-[#F1F0FB] rounded-xl p-6 mb-2 shadow-sm border border-dental-beige/30">
            <div className="font-bold text-dental-navy mb-1">{item.q}</div>
            <div className="text-dental-navy/80">{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
