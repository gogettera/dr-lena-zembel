
import React from "react";
import { Star, Quote } from "lucide-react";
import { EnhancedCarousel, CarouselItem } from "@/components/ui/enhanced-carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonials = [
  {
    quote: "עשיתי יישור שיניים בגיל מבוגר - וזאת הייתה אחת ההחלטות הכי טובות שעשיתי. קיבלתי תמיכה ליווי ותוצאה מושלמת ומתחשבת.",
    author: "נועה ב.",
    detail: "מטופלת, בת 34"
  },
  {
    quote: "צוות נפלא, טכנולוגיה מתקדמת והכל מוסבר באדיבות וסבלנות. הבת שלי חיכתה לכל ביקורת!",
    author: "דני ש.",
    detail: "הורה למתבגרת"
  },
  {
    quote: "קיבלתי חיוך חדש, אבל גם תחושת ביטחון. תודה מכל הלב לד״ר יעל והצוות.",
    author: "גרגורי ל.",
    detail: "מטופל, בן 17"
  },
];

const Testimonials = () => {
  const isMobile = useIsMobile();
  return (
    <section id="testimonials" className="py-14 md:py-20 px-4 bg-[#FDF4F0]/70 scroll-mt-24">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-[#6E59A5] mb-10 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          עדויות מטופלים
        </h2>
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -top-16 md:-top-12 -right-6 md:-right-12 opacity-20 rotate-6">
            <Quote size={isMobile ? 80 : 120} className="text-[#9b87f5]" />
          </div>
          <EnhancedCarousel
            autoplay={true}
            interval={7000}
            showProgress={true}
            showArrows={true}
            className="px-4"
          >
            {testimonials.map((t, idx) => (
              <CarouselItem key={idx}>
                <div className="h-full bg-white/90 rounded-2xl shadow-soft border border-[#E5DEFF] p-7 flex flex-col items-center justify-between text-center mx-2 my-6 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center text-[#9b87f5] mb-4 space-x-1 space-x-reverse">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="inline-block h-5 w-5" fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl italic text-[#6E59A5]/90 mb-4 leading-relaxed">"{t.quote}"</blockquote>
                  <div>
                    <div className="font-bold text-[#6E59A5]">{t.author}</div>
                    <div className="text-[#6E59A5]/70 text-sm">{t.detail}</div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </EnhancedCarousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
