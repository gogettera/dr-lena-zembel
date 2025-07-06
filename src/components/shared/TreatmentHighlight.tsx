
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';


interface TreatmentHighlightProps {
  treatment: {
    slug: string;
    icon: React.ComponentType<any>;
    titleKey: string;
    descKey: string;
    benefits: string[];
    featured?: boolean;
  };
  index?: number;
  className?: string;
}

const TreatmentHighlight: React.FC<TreatmentHighlightProps> = ({
  treatment,
  index = 0,
  className = ''
}) => {
  const { language, isRTL } = useLanguage();
  const Icon = treatment.icon;

  return (
    <Card 
      className={`group hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white to-dental-beige/20 border-dental-orange/20 overflow-hidden ${className}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-8 relative">
        {/* Featured Badge */}
        {treatment.featured && (
          <Badge className="absolute top-4 right-4 bg-dental-orange text-white">
            מומלץ
          </Badge>
        )}

        {/* Icon */}
        <div className="bg-dental-orange/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-8 w-8 text-dental-orange" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-dental-navy mb-4 text-center">
          <TranslatedText textKey={treatment.titleKey} />
        </h3>

        {/* Description */}
        <p className="text-dental-navy/70 text-center mb-6 leading-relaxed">
          <TranslatedText textKey={treatment.descKey} />
        </p>

        {/* Benefits */}
        <div className="space-y-2 mb-6">
          {treatment.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-dental-navy/70">
              <div className="w-1.5 h-1.5 bg-dental-orange rounded-full" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Link to={`/treatments/${treatment.slug}`}>
          <Button 
            variant="outline" 
            className="w-full rounded-full border-dental-orange text-dental-orange hover:bg-dental-orange hover:text-white transition-all duration-300 group-hover:scale-105"
          >
            <TranslatedText textKey="common.learnMore" defaultText="למידע נוסף" />
            {isRTL ? <ArrowLeft className="h-4 w-4 ml-2" /> : <ArrowRight className="h-4 w-4 mr-2" />}
          </Button>
        </Link>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-dental-orange/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-dental-pink/20 rounded-full blur-xl" />
      </CardContent>
    </Card>
  );
};

export default TreatmentHighlight;
