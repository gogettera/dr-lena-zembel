
import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "הילדה שלי פחדה מרופאים, אבל אצל לנה – היא פשוט פרחה.",
    author: "רותם א."
  },
  {
    quote: "זה המקום היחיד שבו אני מרגיש בטוח להשאיר את בני לבד עם הצוות.",
    author: "תומר ל."
  },
  {
    quote: "שירות יוצא דופן, עם המון אנושיות וחיוך.",
    author: "סיון ש."
  },
];

const Testimonials = () => (
  <section className="py-14 md:py-20 px-4 bg-[#D3E4FD]/50">
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-dental-navy mb-10 text-center">עדויות מהורים</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white/90 rounded-2xl shadow-soft border border-dental-beige/40 p-7 flex flex-col items-center justify-between text-center">
            <div className="flex items-center text-dental-orange mb-4 space-x-1 space-x-reverse">
              {[1,2,3,4,5].map(i => <Star key={i} className="inline-block h-5 w-5" fill="currentColor" />)}
            </div>
            <blockquote className="italic text-dental-navy/90 mb-4">"{t.quote}"</blockquote>
            <div className="font-bold text-dental-navy">{t.author}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
