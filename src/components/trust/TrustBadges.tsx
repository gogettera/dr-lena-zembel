import React from 'react';
import { Shield, Award, Users, Star, Clock, MapPin } from 'lucide-react';
import { TranslatedText } from '@/components/ui/translated-text';

interface TrustBadge {
  icon: any;
  value: string;
  label: string;
  description: string;
  color: string;
}

const TrustBadges: React.FC = () => {
  const badges: TrustBadge[] = [
    {
      icon: Users,
      value: '2000+',
      label: 'מטופלים מרוצים',
      description: 'מטופלים שקיבלו טיפול מעולה',
      color: 'hsl(var(--dental-primary))'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'דירוג מושלם',
      description: 'על פי המלצות מטופלים',
      color: 'hsl(var(--dental-gold))'
    },
    {
      icon: Clock,
      value: '13+',
      label: 'שנות ניסיון',
      description: 'מומחיות מתפתחת ומתעדכנת',
      color: 'hsl(var(--dental-coral))'
    },
    {
      icon: Award,
      value: '98%',
      label: 'שיעור הצלחה',
      description: 'בטיפולים מורכבים',
      color: 'hsl(var(--dental-mint))'
    },
    {
      icon: Shield,
      value: '24/7',
      label: 'זמינות לחירום',
      description: 'תמיד כאן כשאתם צריכים',
      color: 'hsl(var(--dental-navy))'
    },
    {
      icon: MapPin,
      value: 'מרכז ת״א',
      label: 'מיקום נגיש',
      description: 'קל להגעה בתחבורה ציבורית',
      color: 'hsl(var(--dental-primary))'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-dental-cream/30 to-white">
      <div className="premium-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            <TranslatedText textKey="trust.badges.title" defaultText="הנתונים שמוכיחים את האמינות שלנו" />
          </h2>
          <p className="premium-text-large text-dental-navy/70 max-w-2xl mx-auto">
            <TranslatedText 
              textKey="trust.badges.subtitle" 
              defaultText="מספרים שמספרים את הסיפור - מעל לכל ספק, הוכחות מוחשיות לאיכות השירות שלנו"
            />
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className={`premium-card p-6 text-center group hover:scale-105 transition-all duration-300 animate-delay-${(index + 1) * 100}`}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${badge.color}/0.1` }}
              >
                <badge.icon 
                  className="h-6 w-6"
                  style={{ color: badge.color }}
                />
              </div>
              
              <div 
                className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                style={{ color: badge.color }}
              >
                {badge.value}
              </div>
              
              <div className="premium-text-small font-semibold text-dental-navy mb-2">
                {badge.label}
              </div>
              
              <div className="text-xs text-dental-navy/60 leading-tight">
                {badge.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;