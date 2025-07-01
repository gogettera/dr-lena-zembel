
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Clock, Shield, Award, AlertTriangle } from 'lucide-react';
import { TranslatedText } from '@/components/ui/translated-text';

const TreatmentProfessionalBooking: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-dental-orange/5 to-dental-pink/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Emergency Banner */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-red-800 mb-1">
                  <TranslatedText textKey="treatments.emergency.title" defaultText="כאב חריף? מקרה חירום?" />
                </p>
                <p className="text-sm text-red-700">
                  <TranslatedText 
                    textKey="treatments.emergency.subtitle" 
                    defaultText="אנחנו זמינים 24/7 למקרי חירום רפואיים. התקשרו עכשיו למענה מיידי."
                  />
                </p>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => window.location.href = 'tel:03-566-6915'}
                className="flex-shrink-0"
              >
                <Phone className="h-4 w-4 mr-2" />
                חירום
              </Button>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
              <TranslatedText textKey="treatments.booking.title" defaultText="קבעו תור היום" />
            </h2>
            <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
              <TranslatedText 
                textKey="treatments.booking.subtitle" 
                defaultText="התחילו את המסע לחיוך בריא עם ייעוץ רפואי מקצועי ללא התחייבות"
              />
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Main Booking Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-dental-orange/30 bg-white">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-dental-navy mb-2">
                    <TranslatedText textKey="treatments.booking.consultation" defaultText="ייעוץ רפואי ראשוני" />
                  </h3>
                  <p className="text-dental-navy/70 text-sm">
                    <TranslatedText 
                      textKey="treatments.booking.consultationDesc" 
                      defaultText="בדיקה מקיפה, צילום רנטגן ותכנון טיפול מותאם אישית"
                    />
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-dental-beige/20 rounded-lg">
                    <span className="text-sm text-dental-navy">משך הביקור</span>
                    <Badge variant="outline" className="border-dental-orange text-dental-orange">
                      <Clock className="h-3 w-3 mr-1" />
                      45-60 דקות
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dental-beige/20 rounded-lg">
                    <span className="text-sm text-dental-navy">עלות ייעוץ</span>
                    <Badge variant="outline" className="border-green-600 text-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      ללא התחייבות
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="orange" 
                    size="lg" 
                    className="w-full"
                    onClick={() => window.location.href = 'tel:03-566-6915'}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    התקשרו לקביעת תור - 03-566-6915
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full border-dental-azure text-dental-azure hover:bg-dental-azure hover:text-white"
                    onClick={() => window.open('https://wa.me/972515666915', '_blank')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp - תיאום נוח ודיסקרטי
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trust & Guarantees Card */}
            <Card className="p-6 bg-gradient-to-br from-dental-beige/10 to-white border-dental-beige/30">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <Award className="h-12 w-12 text-dental-orange mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-dental-navy mb-2">
                    <TranslatedText textKey="treatments.booking.guarantee" defaultText="האחריות שלנו" />
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-dental-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-dental-navy text-sm">ייעוץ מקצועי ללא לחץ</p>
                      <p className="text-xs text-dental-navy/70">אנחנו מאמינים בשקיפות מלאה ובקבלת החלטות מושכלות</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-dental-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-dental-navy text-sm">זמינות למעקב</p>
                      <p className="text-xs text-dental-navy/70">מעקב רפואי מקצועי לאחר הטיפול</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-dental-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-dental-navy text-sm">איכות מובטחת</p>
                      <p className="text-xs text-dental-navy/70">טיפול בהתאם לתקני משרד הבריאות</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-dental-beige/30">
                  <p className="text-xs text-dental-navy/60 text-center">
                    <TranslatedText 
                      textKey="treatments.medical.disclaimer" 
                      defaultText="המידע באתר זה מיועד למטרות הסברה רפואית בלבד ואינו מהווה תחליף לייעוץ רפואי מקצועי"
                    />
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentProfessionalBooking;
