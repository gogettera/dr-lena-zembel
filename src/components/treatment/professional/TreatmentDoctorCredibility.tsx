
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award, Users, MapPin, Phone, MessageCircle } from 'lucide-react';
import OptimizedImage from '@/components/ui/optimized-image';
import { useDoctorPortrait } from '@/hooks/use-doctor-portrait';
import { TranslatedText } from '@/components/ui/translated-text';

const TreatmentDoctorCredibility: React.FC = () => {
  const { getDoctorPortraitPath, getDoctorName, getDoctorTitle } = useDoctorPortrait();

  const doctorCredentials = [
    {
      icon: GraduationCap,
      title: 'השכלה רפואית',
      details: [
        'רופאת שיניים - אוניברסיטת תל אביב',
        'התמחות באנדודונטיה - גרמניה',
        'השתלמויות מתקדמות באירופה'
      ]
    },
    {
      icon: Award,
      title: 'הסמכות מקצועיות',
      details: [
        'חברה באיגוד הישראלי לרפואת שיניים',
        'הסמכה לטיפולי שורש מתקדמים',
        'רישיון משרד הבריאות'
      ]
    },
    {
      icon: Users,
      title: 'ניסיון קליני',
      details: [
        '13+ שנות ניסיון ברפואת שיניים',
        '2000+ טיפולי שורש מוצלחים',
        'מומחיות בטיפולים מורכבים'
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            <TranslatedText textKey="treatments.doctor.title" defaultText="המומחיות שלנו" />
          </h2>
          <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
            <TranslatedText 
              textKey="treatments.doctor.subtitle" 
              defaultText="פגשו את ד״ר לנה זמבל - מומחית רפואת שיניים עם ניסיון בינלאומי"
            />
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Doctor Profile */}
          <div className="text-center lg:text-right">
            <div className="relative inline-block mb-6">
              <OptimizedImage
                src={getDoctorPortraitPath('authority')}
                alt={getDoctorName()}
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-dental-orange text-white rounded-full p-3">
                <Award className="h-6 w-6" />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-dental-navy mb-2">{getDoctorName()}</h3>
              <p className="text-lg text-dental-orange font-semibold mb-4">{getDoctorTitle()}</p>
              
              <div className="flex flex-wrap justify-center lg:justify-end gap-2 mb-6">
                <Badge variant="outline" className="border-dental-navy text-dental-navy">
                  <MapPin className="h-3 w-3 mr-1" />
                  תל אביב
                </Badge>
                <Badge variant="outline" className="border-dental-navy text-dental-navy">
                  <Users className="h-3 w-3 mr-1" />
                  13+ שנות ניסיון
                </Badge>
                <Badge variant="outline" className="border-dental-navy text-dental-navy">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  השכלה גרמנית
                </Badge>
              </div>

              <p className="text-dental-navy/80 leading-relaxed mb-6">
                ד״ר לנה זמבל מביאה יחד מומחיות קלינית מתקדמת, טכנולוגיה חדישה ויחס אישי חם. 
                עם השכלה רפואית מובילה ובניסיון עשיר בטיפולים מורכבים, היא מתמחה בהפיכת 
                טיפולי שורש לחוויה נוחה ומוצלחת.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
                <Button 
                  variant="orange" 
                  size="lg"
                  onClick={() => window.location.href = 'tel:03-566-6915'}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  התקשרו עכשיו
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://wa.me/972515666915', '_blank')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className="space-y-6">
            {doctorCredentials.map((credential, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border-dental-beige/30">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-dental-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <credential.icon className="h-6 w-6 text-dental-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dental-navy mb-3">{credential.title}</h3>
                      <ul className="space-y-2">
                        {credential.details.map((detail, idx) => (
                          <li key={idx} className="text-dental-navy/70 text-sm flex items-start">
                            <span className="inline-block w-2 h-2 bg-dental-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentDoctorCredibility;
