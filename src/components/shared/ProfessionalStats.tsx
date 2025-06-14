
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Star, Clock, Globe, Heart } from 'lucide-react';

interface ProfessionalStatsProps {
  variant?: 'default' | 'minimal' | 'detailed';
  animated?: boolean;
  className?: string;
}

const ProfessionalStats: React.FC<ProfessionalStatsProps> = ({
  variant = 'default',
  animated = true,
  className = ''
}) => {
  const { isRTL } = useLanguage();

  const stats = [
    {
      icon: Award,
      value: '13+',
      label: 'שנות ניסיון',
      color: 'text-dental-orange',
      bgColor: 'bg-dental-orange/10'
    },
    {
      icon: Users,
      value: '5000+',
      label: 'מטופלים מרוצים',
      color: 'text-dental-navy',
      bgColor: 'bg-dental-navy/10'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'דירוג מטופלים',
      color: 'text-dental-accent',
      bgColor: 'bg-dental-accent/10'
    },
    {
      icon: Globe,
      value: '4',
      label: 'שפות',
      color: 'text-dental-pink',
      bgColor: 'bg-dental-pink/20'
    }
  ];

  const detailedStats = [
    ...stats,
    {
      icon: Clock,
      value: '24/7',
      label: 'זמינות לחירום',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Heart,
      value: '100%',
      label: 'שביעות רצון',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  const displayStats = variant === 'detailed' ? detailedStats : stats;

  if (variant === 'minimal') {
    return (
      <div className={`flex justify-center gap-8 ${className}`}>
        {stats.slice(0, 3).map((stat, index) => (
          <div 
            key={index} 
            className={`text-center ${animated ? 'opacity-0 animate-[fade-in_0.5s_ease-out_forwards]' : ''}`}
            style={animated ? { animationDelay: `${index * 0.2}s` } : {}}
          >
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-dental-navy/60">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {displayStats.map((stat, index) => (
        <Card 
          key={index}
          className={`text-center border-none shadow-md hover:shadow-lg transition-all duration-300 ${animated ? 'opacity-0 animate-[fade-in_0.5s_ease-out_forwards]' : ''}`}
          style={animated ? { animationDelay: `${index * 0.1}s` } : {}}
        >
          <CardContent className="p-6">
            <div className={`${stat.bgColor} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-sm text-dental-navy/70">
              {stat.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfessionalStats;
