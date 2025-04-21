
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { EnhancedCarousel, CarouselItem } from "@/components/ui/enhanced-carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const Testimonials: React.FC = () => {
  const isMobile = useIsMobile();

  const testimonials = [
    {
      name: "רונית לוי",
      rating: 5,
      text: "עשיתי ציפויי חרסינה אצל ד\"ר לנה ואני מאושרת מהתוצאות! החיוך שלי נראה טבעי ויפהפה, והתהליך היה הרבה פחות מפחיד ממה שחשבתי. כל הצוות היה מקצועי ותומך לאורך כל הדרך.",
    },
    {
      name: "דן כהן",
      rating: 5,
      text: "אחרי שנים שהתביישתי בחיוך שלי, החלטתי לעשות הלבנת שיניים במרפאה. ההבדל פשוט מדהים, והביטחון העצמי שלי עלה פלאים. ממליץ בחום על הטיפולים האסתטיים כאן.",
    },
    {
      name: "מיכל אברהם",
      rating: 5,
      text: "השלמתי טיפול של שתלים וכתרים אצל ד\"ר לנה, והתוצאה עולה על כל הציפיות. החיוך שלי נראה טבעי לגמרי, ואף אחד לא מאמין שאלו לא השיניים המקוריות שלי. הטיפול היה מקצועי ובלי כאבים.",
    },
    {
      name: "יוסי לוינסון",
      rating: 5,
      text: "עברתי טיפול של יישור שיניים שקוף במרפאה, ואני שמח שבחרתי בד\"ר לנה. התהליך היה נוח, השירות מעולה, והתוצאות פשוט מדהימות. קיבלתי חיוך חדש ואסתטי בדיוק כפי שרציתי.",
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-dental-orange fill-dental-orange" : "text-gray-300"
          }`}
        />
      ));
  };

  const renderTestimonialCard = (testimonial: typeof testimonials[0], index: number) => (
    <Card 
      className="h-full border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm"
    >
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-dental-pink/20 flex items-center justify-center text-lg font-bold text-dental-navy mr-3">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-dental-navy">{testimonial.name}</h4>
            <div className="flex">{renderStars(testimonial.rating)}</div>
          </div>
        </div>
        <p className="text-dental-navy/70 flex-grow">{testimonial.text}</p>
      </CardContent>
    </Card>
  );

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 bg-gradient-to-br from-white via-dental-pink/5 to-white">
      <div className="container mx-auto">
        <SectionHeader
          title="המלצות ממטופלים"
          subtitle="מה אומרים המטופלים שלנו על הטיפולים האסתטיים"
        />

        {isMobile ? (
          <div className="w-full relative pb-14">
            <EnhancedCarousel className="w-full">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 basis-4/5 sm:basis-1/2 md:basis-1/2">
                  {renderTestimonialCard(testimonial, index)}
                </CarouselItem>
              ))}
            </EnhancedCarousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                {renderTestimonialCard(testimonial, index)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
