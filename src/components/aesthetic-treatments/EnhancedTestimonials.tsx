
import React from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/components/ui/section";

const EnhancedTestimonials: React.FC = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: "שרה כהן",
      age: "32",
      treatment: "ציפויי חרסינה",
      rating: 5,
      text: "אחרי שנים שהסתרתי את החיוך שלי, סוף סוף יש לי חיוך שאני גאה בו. ד״ר זמבל עבדה בסבלנות ובמקצועיות עד שהגענו לתוצאה המושלמת. המחיר היה הוגן והתהליך היה נוח בהרבה ממה שחשבתי.",
      result: "מחיוך מסתור לחיוך גאה ובטוח",
      image: "/lovable-uploads/testimonial-1.jpg"
    },
    {
      name: "דוד לוי", 
      age: "45",
      treatment: "עיצוב חיוך מלא",
      rating: 5,
      text: "עבדתי עם לקוחות כל החיים והחיוך שלי היה חשוב לעסק. ד״ר זמבל הבינה בדיוק מה אני צריך ויצרה לי חיוך שמשדר ביטחון ומקצועיות. העסק שלי צמח בעקבות השינוי!",
      result: "חיוך שמשדר ביטחון ומקצועיות",
      image: "/lovable-uploads/testimonial-2.jpg"
    },
    {
      name: "מיכל ברק",
      age: "28",
      treatment: "הלבנת שיניים + בילדינג",
      rating: 5,
      text: "הכי חשוב לי היה שהטיפול יהיה טבעי ולא מוגזם. ד״ר זמבל הקשיבה למה שחשוב לי ויצרה תוצאה מושלמת שנראית טבעית לגמרי. כולם שואלים אותי מה עשיתי!",
      result: "תוצאה טבעית ומושלמת שכולם שמים לב אליה",
      image: "/lovable-uploads/testimonial-3.jpg"
    }
  ];

  return (
    <Section
      id="testimonials"
      className="py-16 md:py-20 bg-gradient-to-b from-dental-beige/10 to-white"
      background="none"
      maxWidth="xl" 
      directionAware={true}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dental-navy mb-6">
          {t('aestheticTreatments.testimonials.title')}
        </h2>
        <p className="text-lg md:text-xl text-dental-navy/70 max-w-3xl mx-auto">
          {t('aestheticTreatments.testimonials.subtitle')}
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-dental-orange/20 relative overflow-hidden bg-white">
            <CardContent className="p-6 h-full flex flex-col">
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-dental-orange/30 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-dental-navy/80 leading-relaxed mb-6 flex-grow italic">
                "{testimonial.text}"
              </p>

              {/* Result Highlight */}
              <div className="bg-dental-orange/10 rounded-lg p-3 mb-4">
                <p className="text-dental-orange font-semibold text-sm">
                  ✨ {testimonial.result}
                </p>
              </div>

              {/* Patient Info */}
              <div className="border-t border-dental-beige/30 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-dental-navy">{testimonial.name}</h4>
                    <p className="text-sm text-dental-navy/60">גיל {testimonial.age}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-dental-navy/80 font-medium">{testimonial.treatment}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Social Proof Section */}
      <div className="bg-gradient-to-r from-dental-navy to-dental-navy/90 rounded-2xl p-8 md:p-12 text-center text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">
          הצטרפו למאות מטופלים מרוצים
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-dental-orange mb-2">98%</div>
            <p className="text-white/80 text-sm">מהמטופלים ממליצים עלינו</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-dental-orange mb-2">1,500+</div>
            <p className="text-white/80 text-sm">טיפולים הושלמו בהצלחה</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-dental-orange mb-2">13+</div>
            <p className="text-white/80 text-sm">שנות ניסיון מוכח</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-dental-orange mb-2">24/7</div>
            <p className="text-white/80 text-sm">זמינות לחירום</p>
          </div>
        </div>

        <p className="text-white/90 text-lg">
          רוצים להיות הבאים? התקשרו עכשיו לייעוץ חינם ללא התחייבות
        </p>
      </div>
    </Section>
  );
};

export default EnhancedTestimonials;
