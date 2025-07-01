
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Users, Clock, Shield, Star, Microscope } from 'lucide-react';
import { TranslatedText } from '@/components/ui/translated-text';

interface TreatmentWhyChooseUsProps {
  treatmentType: string;
}

const TreatmentWhyChooseUs: React.FC<TreatmentWhyChooseUsProps> = ({ treatmentType }) => {
  const getWhyChooseUsData = (type: string) => {
    const data = {
      'root-canal': {
        stats: [
          { icon: Users, number: '2000+', label: 'טיפולי שורש מוצלחים' },
          { icon: Star, number: '98%', label: 'שיעור הצלחה' },
          { icon: Clock, number: '13+', label: 'שנות ניסיון' },
          { icon: Award, number: '4', label: 'הסמכות מקצועיות' }
        ],
        features: [
          {
            icon: Microscope,
            title: 'טכנולוגיה מתקדמת מגרמניה',
            description: 'מכשור רוטרי מתקדם ומיקרוסקופ דנטלי לדיוק מירבי'
          },
          {
            icon: Shield,
            title: 'הרדמה ללא כאב',
            description: 'טכנולוגיות הרדמה מתקדמות המבטיחות נוחות מלאה'
          },
          {
            icon: Award,
            title: 'מומחיות רפואית מוכחת',
            description: 'הכשרה בגרמניה והשתלמויות מתמידות באירופה'
          },
          {
            icon: Clock,
            title: 'זמינות לחירום',
            description: 'מענה רפואי זמין 24/7 למקרי חירום'
          }
        ]
      }
    };
    
    return data[type] || data['root-canal'];
  };

  const { stats, features } = getWhyChooseUsData(treatmentType);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-dental-beige/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            <TranslatedText textKey="treatments.whyChooseUs.title" defaultText="למה לבחור בנו?" />
          </h2>
          <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
            <TranslatedText 
              textKey="treatments.whyChooseUs.subtitle" 
              defaultText="המומחיות, הטכנולוגיה והניסיון שמבטיחים לכם את הטיפול הטוב ביותר"
            />
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
              <CardContent className="p-0">
                <div className="mb-4">
                  <stat.icon className="h-8 w-8 text-dental-orange mx-auto mb-2" />
                  <div className="text-3xl font-bold text-dental-navy mb-1">{stat.number}</div>
                  <div className="text-sm text-dental-navy/70">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-dental-beige/30 bg-white">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-dental-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-dental-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-dental-navy mb-2">{feature.title}</h3>
                    <p className="text-dental-navy/70 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <Badge variant="outline" className="border-dental-orange text-dental-orange px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              משרד הבריאות
            </Badge>
            <Badge variant="outline" className="border-dental-orange text-dental-orange px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              האיגוד הישראלי לרפואת שיניים
            </Badge>
            <Badge variant="outline" className="border-dental-orange text-dental-orange px-4 py-2">
              <Microscope className="h-4 w-4 mr-2" />
              טכנולוגיה גרמנית
            </Badge>
          </div>
          <p className="text-xs text-dental-navy/60">
            כל הטיפולים מבוצעים בהתאם לתקני משרד הבריאות והנחיות האיגוד המקצועי
          </p>
        </div>
      </div>
    </section>
  );
};

export default TreatmentWhyChooseUs;
