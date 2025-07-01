
import React from 'react';
import { Shield, Award, Clock, Users } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Shield,
      text: 'רישיון משרד הבריאות',
      subtext: 'מוסמך ומפוקח'
    },
    {
      icon: Award,
      text: 'חבר באיגוד רופאי השיניים',
      subtext: 'סטנדרטים מקצועיים'
    },
    {
      icon: Clock,
      text: '13+ שנות ניסיון',
      subtext: 'מומחיות מוכחת'
    },
    {
      icon: Users,
      text: '2000+ מטופלים מרוצים',
      subtext: 'אמון והמלצות'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 opacity-80">
      {badges.map((badge, index) => {
        const IconComponent = badge.icon;
        return (
          <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <IconComponent className="h-6 w-6 text-dental-orange flex-shrink-0" />
            <div className="text-white text-sm">
              <div className="font-medium">{badge.text}</div>
              <div className="text-white/70 text-xs">{badge.subtext}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrustBadges;
