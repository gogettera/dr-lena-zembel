
import React from "react";

const testimonials = [
  {
    name: "ענת מ.",
    text: "הגעתי בחשש, אך הרופא הסביר כל שלב בסבלנות. עברתי טיפול שורש ללא כאב, ממליץ בחום."
  },
  {
    name: "רוני ש.",
    text: "שירות מעולה, קיבלתי תמיכה מהצוות גם אחרי הטיפול. תודה רבה!"
  }
];

const Testimonials = () => (
  <section className="py-14 md:py-20 px-4 bg-white">
    <div className="container mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-[#6E59A5] mb-8 text-center">
        המלצות מטופלים
      </h2>
      <div className="space-y-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-[#F1F0FB] rounded-xl shadow p-6 flex flex-col items-end border border-dental-beige/30 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="text-[#6E59A5]/80 text-lg mb-2 text-right">
              "{t.text}"
            </div>
            <div className="text-[#6E59A5] font-bold">{t.name}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
