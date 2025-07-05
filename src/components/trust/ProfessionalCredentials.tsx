import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, GraduationCap, Users, Globe, Clock } from 'lucide-react';
import { TranslatedText } from '@/components/ui/translated-text';

interface Credential {
  icon: any;
  title: string;
  description: string;
  details: string[];
  color: string;
}

const ProfessionalCredentials: React.FC = () => {
  const credentials: Credential[] = [
    {
      icon: GraduationCap,
      title: 'השכלה מקצועית מובילה',
      description: 'בוגרת אוניברסיטת קלן, גרמניה',
      details: [
        'תואר ברפואת שיניים מאוניברסיטת קלן המובילה',
        'התמחות מתקדמת בטיפולי שורש ואנדודונטיה', 
        'השתלמויות רציפות בטכנולוגיות חדשניות'
      ],
      color: 'hsl(var(--dental-primary))'
    },
    {
      icon: Shield,
      title: 'הסמכות מקצועיות',
      description: 'רישיון משרד הבריאות וחברות מקצועיות',
      details: [
        'רישיון מלא ומעודכן ממשרד הבריאות',
        'חברה באיגוד הישראלי לרפואת שיניים',
        'הסמכה מיוחדת לטיפולי שורש מורכבים'
      ],
      color: 'hsl(var(--dental-coral))'
    },
    {
      icon: Globe,
      title: 'ניסיון בינלאומי',
      description: 'מומחיות גרמנית-ישראלית',
      details: [
        'ניסיון קליני בגרמניה וישראל',
        'הכשרה על הסטנדרטים הגבוהים באירופה',
        'שילוב של דיוק גרמני ויחס ישראלי חם'
      ],
      color: 'hsl(var(--dental-mint))'
    },
    {
      icon: Clock,
      title: '13 שנות מצוינות מוכחת',
      description: 'מסלול קריירה רציף של הצלחות',
      details: [
        'יותר מ-2000 טיפולי שורש מוצלחים',
        'שיעור הצלחה של 98% בטיפולים מורכבים',
        'מטופלים חוזרים ומפנים חברים - הוכחה לאמון'
      ],
      color: 'hsl(var(--dental-gold))'
    }
  ];

  return (
    <section className="premium-section bg-white">
      <div className="premium-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dental-navy mb-6">
            <TranslatedText textKey="trust.credentials.title" defaultText="המומחיות והאמינות שלנו" />
          </h2>
          <p className="premium-text-large max-w-3xl mx-auto text-dental-navy/80">
            <TranslatedText 
              textKey="trust.credentials.subtitle" 
              defaultText="13 שנות ניסיון, השכלה בינלאומית מובילה והכשרה רציפה - כל זה כדי להעניק לכם את הטיפול הטוב והבטוח ביותר שיש"
            />
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {credentials.map((credential, index) => (
            <Card 
              key={index} 
              className={`premium-card hover:shadow-premium group transition-all duration-500 animate-delay-${(index + 1) * 100}`}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${credential.color}/0.1` }}
                  >
                    <credential.icon 
                      className="h-8 w-8 transition-colors duration-300"
                      style={{ color: credential.color }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-bold mb-2 group-hover:text-dental-primary transition-colors duration-300"
                      style={{ color: credential.color }}
                    >
                      {credential.title}
                    </h3>
                    <p className="premium-text-body mb-4 font-medium text-dental-navy">
                      {credential.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {credential.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 premium-text-small text-dental-navy/70">
                          <div 
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: credential.color }}
                          />
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
    </section>
  );
};

export default ProfessionalCredentials;