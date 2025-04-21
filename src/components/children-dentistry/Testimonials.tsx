
import React from "react";
import { Star, Quote } from "lucide-react";
import { EnhancedCarousel, CarouselItem } from "@/components/ui/enhanced-carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import OptimizedImage from "@/components/ui/optimized-image";

const testimonials = [
  {
    quote: "הילדה שלי פחדה מרופאים, אבל אצל לנה – היא פשוט פרחה. כבר בביקור השני היא רצתה להגיע בעצמה לחדר הטיפולים.",
    author: "רותם א.",
    child: "מאיה, בת 4"
  },
  {
    quote: "זה המקום היחיד שבו אני מרגיש בטוח להשאיר את בני לבד עם הצוות. האכפתיות והמקצועיות ניכרות בכל פרט.",
    author: "תומר ל.",
    child: "עידו, בן 7"
  },
  {
    quote: "שירות יוצא דופן, עם המון אנושיות וחיוך. חששתי מהתגובה של התאומות שלי אבל בזכות הסבלנות והגישה המיוחדת, הן מחכות לביקור הבא.",
    author: "סיון ש.",
    child: "מיה ונויה, בנות 5"
  },
  {
    quote: "הפתעה מתוקה! כשהבן שלי ראה את חדר ההמתנה עם הצעצועים והאווירה הנעימה, הוא מיד הרגיש בנוח. הטיפול היה מהיר ונעים, ללא דמעות בכלל.",
    author: "דנה ק.",
    child: "יובל, בן 6"
  },
];

const Testimonials = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="testimonials" className="py-14 md:py-20 px-4 bg-[#D3E4FD]/50 scroll-mt-24">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-dental-navy mb-10 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          עדויות מהורים
        </h2>
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -top-16 md:-top-12 -right-6 md:-right-12 opacity-20 rotate-6">
            <Quote size={isMobile ? 80 : 120} className="text-dental-orange" />
          </div>
          
          <EnhancedCarousel
            autoplay={true}
            interval={5000}
            showProgress={true}
            showArrows={true}
            className="px-4"
          >
            {testimonials.map((t, idx) => (
              <CarouselItem key={idx}>
                <div className="h-full bg-white/90 rounded-2xl shadow-soft border border-dental-beige/40 p-7 flex flex-col items-center justify-between text-center mx-2 my-6 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center text-dental-orange mb-4 space-x-1 space-x-reverse">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="inline-block h-5 w-5" fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl italic text-dental-navy/90 mb-4 leading-relaxed">"{t.quote}"</blockquote>
                  <div>
                    <div className="font-bold text-dental-navy">{t.author}</div>
                    <div className="text-dental-navy/70 text-sm">{t.child}</div>
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
