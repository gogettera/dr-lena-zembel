
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface ReviewCardProps {
  author_name: string;
  rating: number;
  text: string | null;
  profile_photo_url: string | null;
  relative_time_description: string | null;
  review_link: string | null;
}

const ReviewCard = ({
  author_name,
  rating,
  text,
  profile_photo_url,
  relative_time_description,
  review_link
}: ReviewCardProps) => {
  const { t } = useLanguage();

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i}
        data-testid="star-icon"
        className={`h-4 w-4 ${i < rating ? 'text-dental-orange fill-dental-orange' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-dental-orange rounded-full blur opacity-20"></div>
            <img
              src={profile_photo_url || '/placeholder.svg'}
              alt={`${author_name} profile`}
              className="relative w-12 h-12 rounded-full object-cover ring-2 ring-dental-pink"
            />
          </div>
          <div>
            <h4 className="font-bold text-dental-navy">{author_name}</h4>
            <div className="flex mt-1">
              {renderStars(rating)}
            </div>
          </div>
        </div>
        {text && (
          <div className="bg-dental-beige/20 p-4 rounded-lg mb-4 flex-grow">
            <p data-testid="review-text" className="text-dental-navy mb-0 line-clamp-4 relative">
              <span className="text-4xl text-dental-orange/20 absolute -top-3 right-0">"</span>
              {text}
              <span className="text-4xl text-dental-orange/20 absolute -bottom-6 left-0">"</span>
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mt-auto">
          {relative_time_description && (
            <div className="text-sm text-gray-500">{relative_time_description}</div>
          )}
          {review_link && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-dental-orange hover:text-dental-orange/80"
              asChild
            >
              <a href={review_link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('readFullReview')}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
