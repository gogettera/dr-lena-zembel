
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import { TranslatedText } from '@/components/ui/translated-text';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

interface TreatmentCardProps {
  slug: string;
  nameKey: string;
  descKey: string;
  imageUrl?: string;
  isLoading?: boolean;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({
  slug,
  nameKey,
  descKey,
  imageUrl,
  isLoading = false
}) => {
  const { language, isRTL } = useLanguage();

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <LoadingSkeleton variant="image" className="mb-4" />
          <LoadingSkeleton variant="text" className="mb-2" />
          <LoadingSkeleton variant="text" lines={2} className="mb-4" />
          <LoadingSkeleton variant="button" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6">
        {imageUrl && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img 
              src={imageUrl} 
              alt=""
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        
        <h3 className="text-xl font-bold text-dental-navy mb-3">
          <TranslatedText textKey={nameKey} defaultText="טיפול" />
        </h3>
        
        <p className="text-dental-navy/70 mb-4 line-clamp-2">
          <TranslatedText textKey={descKey} defaultText="תיאור הטיפול" />
        </p>
        
        <Button 
          asChild 
          variant="outline" 
          size="sm"
          className="group-hover:bg-dental-orange group-hover:text-white group-hover:border-dental-orange transition-all duration-300"
        >
          <Link to={`/treatments/${slug}`}>
            <TranslatedText textKey="learnMore" defaultText="למידע נוסף" />
            {isRTL ? 
              <ArrowLeft className="h-4 w-4 mr-2" /> : 
              <ArrowRight className="h-4 w-4 ml-2" />
            }
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
