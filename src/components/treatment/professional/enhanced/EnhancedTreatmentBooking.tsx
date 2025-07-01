
import React from 'react';
import { Phone, MessageCircle, Calendar, Clock, MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const EnhancedTreatmentBooking: React.FC = () => {
  const handleBooking = () => {
    window.location.href = 'tel:03-566-6915';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/972515666915', '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-dental-navy via-dental-navy/95 to-dental-navy/90">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-dental-orange/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Calendar className="h-4 w-4 text-dental-orange" />
              <span className="text-dental-orange font-medium">קביעת תור</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              קבעו תור לייעוץ רפואי מקצועי
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              התחילו את המסע לבריאות הפה עם ייעוץ מקצועי ללא התחייבות
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Options */}
            <Card className="p-6 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold text-dental-navy mb-6">
                  דרכי יצירת קשר
                </h3>

                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-dental-orange hover:bg-dental-orange/90 text-white font-bold justify-start"
                    onClick={handleBooking}
                  >
                    <Phone className="h-5 w-5 mr-3" />
                    התקשרו עכשיו: 03-566-6915
                  </Button>

                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white justify-start"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="h-5 w-5 mr-3" />
                    שלחו הודעה בWhatsApp
                  </Button>
                </div>

                {/* Clinic Info */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-dental-navy/80">
                    <MapPin className="h-5 w-5 text-dental-orange" />
                    <span>רחוב בן צבי 2, צפון יפו</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-dental-navy/80">
                    <Clock className="h-5 w-5 text-dental-orange" />
                    <span>ימים: א׳-ה׳, שעות: 09:00-18:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consultation Details */}
            <Card className="p-6 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold text-dental-navy mb-6">
                  ייעוץ רפואי ראשוני
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-dental-orange mt-1" />
                    <div>
                      <h4 className="font-semibold text-dental-navy">בדיקה מקיפה</h4>
                      <p className="text-dental-navy/70 text-sm">בדיקה קלינית, צילום רנטגן דיגיטלי ותכנון טיפול מותאם אישית</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-dental-orange mt-1" />
                    <div>
                      <h4 className="font-semibold text-dental-navy">ייעוץ מקצועי</h4>
                      <p className="text-dental-navy/70 text-sm">הסבר מפורט על אפשרויות הטיפול והמלצות מקצועיות</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-dental-orange mt-1" />
                    <div>
                      <h4 className="font-semibold text-dental-navy">ללא התחייבות</h4>
                      <p className="text-dental-navy/70 text-sm">קבלת מידע מלא ללא לחץ או התחייבות לטיפול</p>
                    </div>
                  </div>
                </div>

                <div className="bg-dental-orange/10 rounded-lg p-4">
                  <h4 className="font-semibold text-dental-navy mb-2">
                    המחויבות המקצועית שלנו
                  </h4>
                  <p className="text-dental-navy/80 text-sm">
                    אנחנו מתחייבים לספק לכם טיפול רפואי מקצועי ברמה הגבוהה ביותר, 
                    עם התייחסות אישית לכל מטופל וצרכיו הייחודיים.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Notice */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-red-600/90 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <Phone className="h-4 w-4" />
              <span className="font-medium">כאב חריף? מקרה חירום דנטלי? אנחנו זמינים 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTreatmentBooking;
