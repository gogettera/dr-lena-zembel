
import React from "react";
import { Star, Quote, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/components/ui/section";

const EnhancedTestimonials: React.FC = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      parent: "מירב, אמא של נועה (5)",
      location: "תל אביב",
      text: "נועה אוהבת להגיע לד״ר לנה! היא אפילו שואלת ללכת לרופא שיניים. מדהים איך הצליחו להפוך חוויה מפחידה לכיפית.",
      rating: 5,
      beforeAfter: "מפחד לחיוך גדול",
      treatmentType: "בדיקות ומניעה"
    },
    {
      parent: "דוד, אבא של תום (8)",
      location: "רמת גן",
      text: "תום פחד מרופאי שיניים, אבל הצוות כאן עבד איתו בסבלנות ועכשיו הוא בא בשמחה לכל ביקור.",
      rating: 5,
      beforeAfter: "מפחד לבטוח ושמח",
      treatmentType: "סתימות וטיפולי שיקום"
    },
    {
      parent: "רונית, אמא של שני ילדים",
      location: "גבעתיים",
      text: "שני הילדים שלי מטופלים כאן ואני רואה כמה הם שמחים ובטוחים. הצוות פשוט מדהים עם ילדים.",
      rating: 5,
      beforeAfter: "מילדים חרדים למטופלים מאושרים",
      treatmentType: "טיפולי מניעה ויישור"
    },
    {
      parent: "יעל, אמא של דניאל (4)",
      location: "פתח תקווה",
      text: "דניאל היה זקוק לטיפול דחוף ואת הדרך שהם טיפלו בו - בעדינות וברגישות - זה היה פשוט מושלם.",
      rating: 5,
      beforeAfter: "מחירום לביטחון",
      treatmentType: "טיפול דחוף וחירום"
    }
  ];

  return (
    <Section
      id="testimonials"
      className="py-16 md:py-20 bg-gradient-to-b from-green-50/10 to-white"
      background="none"
      maxWidth="xl" 
      directionAware={true}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dental-navy mb-6">
          {t('childrenDentistry.testimonials.title')}
        </h2>
        <p className="text-lg md:text-xl text-dental-navy/70 max-w-3xl mx-auto">
          {t('childrenDentistry.testimonials.subtitle')}
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 relative overflow-hidden bg-white">
            <CardContent className="p-6 h-full flex flex-col">
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-green-400/30 mb-4" />

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

              {/* Before/After Highlight */}
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <p className="text-green-700 font-semibold text-sm">
                  ✨ {testimonial.beforeAfter}
                </p>
              </div>

              {/* Parent Info */}
              <div className="border-t border-green-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-dental-navy">{testimonial.parent}</h4>
                    <div className="flex items-center gap-1 text-sm text-dental-navy/60">
                      <MapPin className="h-3 w-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-dental-navy/80 font-medium">{testimonial.treatmentType}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Social Proof Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">
          הצטרפו למאות משפחות מרוצות
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">98%</div>
            <p className="text-white/80 text-sm">מההורים ממליצים עלינו</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">500+</div>
            <p className="text-white/80 text-sm">ילדים מטופלים מדי שנה</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">13+</div>
            <p className="text-white/80 text-sm">שנות ניסיון מוכח</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">24/7</div>
            <p className="text-white/80 text-sm">זמינות לחירום</p>
          </div>
        </div>

        <p className="text-white/90 text-lg">
          רוצים שהילד שלכם יהיה הבא? התקשרו עכשיו לייעוץ חינם ללא התחייבות
        </p>
      </div>
    </Section>
  );
};

export default EnhancedTestimonials;
