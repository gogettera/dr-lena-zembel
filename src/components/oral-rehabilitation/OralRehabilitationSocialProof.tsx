
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { EnhancedCarousel, CarouselItem } from "@/components/ui/enhanced-carousel";
import { NextGenImage } from "@/components/ui/next-gen-image";

const patientTestimonials = [
  {
    name: "נועה",
    img: "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg",
    quote: "הצוות המדהים החזיר לי את הביטחון! השיקום היה מהיר, מקצועי והתוצאה פשוט מרגשת.",
    rating: 5
  },
  {
    name: "דניאל",
    img: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
    quote: "שערך החיים שלי השתפרו ביום אחד, מרפאה עם יחס אישי ואכפתי.",
    rating: 5
  }
];

const OralRehabilitationSocialProof = () => (
  <section className="py-16 bg-gradient-to-br from-white via-dental-beige/50 to-dental-pink/10">
    <div className="container mx-auto">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-dental-navy mb-8">
        מטופלים אמיתיים. שינוי אמיתי.
      </h2>
      <EnhancedCarousel interval={9000}>
        {patientTestimonials.map((t, i) => (
          <CarouselItem key={i} className="px-2 basis-4/5 sm:basis-1/2 md:basis-1/3">
            <Card className="rounded-xl shadow-lg p-8 flex flex-col items-center bg-white/95 animate-fade-in">
              <NextGenImage
                src={t.img}
                alt={`${t.name} המלצה`}
                width={76}
                height={76}
                className="rounded-full border-2 border-dental-orange mb-4 shadow aspect-square object-cover"
              />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={20} className={s < t.rating ? "text-dental-orange" : "text-gray-200"} />
                ))}
              </div>
              <div className="text-dental-navy text-md mb-2 text-center">&quot;{t.quote}&quot;</div>
              <div className="text-xs text-dental-navy/60">{t.name}</div>
            </Card>
          </CarouselItem>
        ))}
      </EnhancedCarousel>
    </div>
  </section>
);

export default OralRehabilitationSocialProof;
