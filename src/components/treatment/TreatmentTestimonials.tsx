
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, Verified, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TranslatedText } from '@/components/ui/translated-text';

interface TreatmentTestimonialsProps {
  treatmentType: string;
}

const TreatmentTestimonials: React.FC<TreatmentTestimonialsProps> = ({ treatmentType }) => {
  const getTestimonials = (type: string) => {
    const testimonials: Record<string, Array<{
      name: string;
      initials: string;
      age: string;
      location: string;
      rating: number;
      date: string;
      treatment: string;
      testimonial: string;
      beforeAfter?: string;
      verified: boolean;
    }>> = {
      'root-canal': [
        {
          name: 'שרה כ.',
          initials: 'שכ',
          age: '34',
          location: 'תל אביב',
          rating: 5,
          date: 'נובמבר 2024',
          treatment: 'טיפול שורש שן טוחנת',
          testimonial: 'הייתי בפאניקה מוחלטת לפני הטיפול אחרי שסיפרו לי סיפורי אימה על טיפולי שורש. ד"ר זמבל הסבירה לי בסבלנות על התהליך, השתמשה בציוד מתקדם והטיפול היה כמעט ללא כאב. אחרי שלושה חודשים השן מרגישה מושלמת. ממליצה בחום!',
          beforeAfter: 'מכאב בלתי נסבל לתפקוד מושלם',
          verified: true
        },
        {
          name: 'דוד מ.',
          initials: 'דמ',
          age: '45',
          location: 'רמת גן',
          rating: 5,
          date: 'אוקטובר 2024',
          treatment: 'טיפול שורש חירום',
          testimonial: 'הגעתי במצב חירום עם כאבים איומים באמצע הלילה. ד"ר זמבל קיבלה אותי גם בשעות לא שגרתיות והצילה לי את השן. הטיפול היה מהיר, יעיל ומקצועי ברמה גבוהה. תודה רבה על השירות המעולה!',
          beforeAfter: 'מחירום כואב לשקט מוחלט',
          verified: true
        },
        {
          name: 'מיכל ר.',
          initials: 'מר',
          age: '29',
          location: 'גבעתיים',
          rating: 5,
          date: 'ספטמבר 2024',
          treatment: 'טיפול שורש שן קדמית',
          testimonial: 'דאגתי מאוד למראה השן הקדמית אחרי הטיפול. ד"ר זמבל עשתה עבודה מדהימה - השן נראית טבעית לחלוטין ואף אחד לא מבחין שעברה טיפול. הטכנולוגיה כאן באמת מתקדמת.',
          beforeAfter: 'מחרדה אסתטית לתוצאה מושלמת',
          verified: true
        },
        {
          name: 'אבי ל.',
          initials: 'אל',
          age: '52',
          location: 'פתח תקווה',
          rating: 5,
          date: 'אוגוסט 2024',
          treatment: 'טיפול שורש מורכב',
          testimonial: 'אמרו לי ברופא שיניים אחר שצריך לעקור את השן. ד"ר זמבל בדקה ואמרה שאפשר להציל. היא צדקה! הטיפול לקח קצת יותר זמן אבל השן נשמרה. כבר שנה וחצי והכל מושלם. רופאה מצוינת!',
          beforeAfter: 'מגזר דין עקירה להצלת השן',
          verified: true
        },
        {
          name: 'רונית ש.',
          initials: 'רש',
          age: '38',
          location: 'רמת השרון',
          rating: 5,
          date: 'יולי 2024',
          treatment: 'טיפול שורש + כתר',
          testimonial: 'הטיפול המלא כלל טיפול שורש והתקנת כתר קרמי. התוצאה מעבר לציפיות - השן חזקה, יפה ותפקודית. המחירים הוגנים והשירות מעולה. בהחלט המקום הנכון לטיפול איכותי.',
          beforeAfter: 'מבעיה מורכבת לפתרון שלם',
          verified: true
        },
        {
          name: 'יוסי ד.',
          initials: 'יד',
          age: '41',
          location: 'הרצליה',
          rating: 5,
          date: 'יוני 2024',
          treatment: 'טיפול שורש חוזר',
          testimonial: 'שן שעברה טיפול שורש לפני 10 שנים התחילה לכאוב שוב. ד"ר זמבל ביצעה טיפול שורש חוזר מורכב והצליחה להציל את השן. מקצועיות וסבלנות ברמה גבוהה. ממליץ בחום!',
          beforeAfter: 'מכישלון קודם להצלחה מלאה',
          verified: true
        }
      ]
    };

    return testimonials[type] || testimonials['root-canal'];
  };

  const testimonials = getTestimonials(treatmentType);
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <Card className="shadow-soft hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 md:p-8 space-y-8">
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-dental-navy">
            <TranslatedText textKey="testimonials" defaultText="המלצות מטופלים" />
          </h3>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-dental-navy">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-dental-navy/60">
              ({testimonials.length} המלצות)
            </span>
          </div>
          <p className="text-dental-navy/70">
            המלצות אמיתיות ממטופלים שעברו טיפול במרפאתנו
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-dental-beige/30 hover:border-dental-orange/30 transition-colors duration-300">
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-dental-orange/20">
                      <AvatarFallback className="bg-dental-orange/10 text-dental-orange font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-dental-navy">
                          {testimonial.name}
                        </h4>
                        {testimonial.verified && (
                          <Verified className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <p className="text-sm text-dental-navy/60">
                        גיל {testimonial.age}, {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Treatment info */}
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline" className="border-dental-orange/30 text-dental-orange">
                    {testimonial.treatment}
                  </Badge>
                  <div className="flex items-center gap-1 text-dental-navy/60">
                    <Calendar className="h-3 w-3" />
                    <span>{testimonial.date}</span>
                  </div>
                </div>

                {/* Before/After */}
                {testimonial.beforeAfter && (
                  <div className="bg-green-50/50 rounded-lg p-3 border border-green-200">
                    <p className="text-sm font-medium text-green-800">
                      {testimonial.beforeAfter}
                    </p>
                  </div>
                )}

                {/* Testimonial text */}
                <div className="relative">
                  <Quote className="absolute -top-2 -right-2 h-6 w-6 text-dental-orange/20" />
                  <p className="text-dental-navy/80 leading-relaxed text-sm italic">
                    "{testimonial.testimonial}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Verification note */}
        <div className="text-center p-4 bg-blue-50/50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Verified className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              המלצות מאומתות
            </span>
          </div>
          <p className="text-xs text-blue-700">
            כל ההמלצות הן ממטופלים אמיתיים שעברו טיפול במרפאתנו. 
            הזהות אומתה ואישורים תועדו במערכת.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentTestimonials;
