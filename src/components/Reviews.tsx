import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { EnhancedCarousel, CarouselItem } from '@/components/ui/enhanced-carousel';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

type Review = {
  id: string;
  author_name: string;
  rating: number;
  text: string | null;
  profile_photo_url: string | null;
  relative_time_description: string | null;
  review_link: string | null;
};

const Reviews = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const isRTL = language === 'he' || language === 'ar';
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const fetchReviews = async () => {
    try {
      await supabase.functions.invoke('fetch-google-reviews');
      toast({
        title: t('reviewsUpdated'),
        description: t('reviewsFetchSuccess'),
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: t('error'),
        description: t('reviewsFetchError'),
        variant: "destructive",
      });
    }
  };

  const handleManualRefresh = async () => {
    setIsManualRefreshing(true);
    try {
      await fetchReviews();
      refetch(); // Refetch the reviews from the database
    } catch (error) {
      console.error('Manual refresh error:', error);
    } finally {
      setIsManualRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const { data: reviews, isLoading, error, refetch } = useQuery({
    queryKey: ['google-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('google_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Review[];
    }
  });

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-dental-orange fill-dental-orange' : 'text-gray-300'}`} 
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="relative">
        <EnhancedCarousel autoplay={false}>
          {[1, 2, 3].map((index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="bg-white rounded-xl shadow-md mx-2 animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-4 w-32 mt-4" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </EnhancedCarousel>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-dental-navy mb-4">{t('errorLoadingReviews')}</p>
        <Button onClick={() => fetchReviews()} variant="outline">
          {t('tryAgain')}
        </Button>
      </div>
    );
  }

  if (!reviews?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-dental-navy mb-4">{t('noReviewsYet')}</p>
        <Button onClick={() => fetchReviews()} variant="outline">
          {t('fetchReviews')}
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-dental-navy">
          {t('patientExperiences')}
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleManualRefresh} 
          disabled={isManualRefreshing}
        >
          {isManualRefreshing ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          {t('refreshReviews')}
        </Button>
      </div>
      
      <EnhancedCarousel autoplay={true}>
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 p-2">
            <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-dental-orange rounded-full blur opacity-20"></div>
                    <img
                      src={review.profile_photo_url || '/placeholder.svg'}
                      alt={`${review.author_name} profile`}
                      className="relative w-12 h-12 rounded-full object-cover ring-2 ring-dental-pink"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-dental-navy">{review.author_name}</h4>
                    <div className="flex mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <div className="bg-dental-beige/20 p-4 rounded-lg mb-4 flex-grow">
                  <p className="text-dental-navy mb-0 line-clamp-4 relative">
                    <span className="text-4xl text-dental-orange/20 absolute -top-3 right-0">"</span>
                    {review.text}
                    <span className="text-4xl text-dental-orange/20 absolute -bottom-6 left-0">"</span>
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <div className="text-sm text-gray-500">{review.relative_time_description}</div>
                  {review.review_link && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-dental-orange hover:text-dental-orange/80"
                      asChild
                    >
                      <a href={review.review_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t('readFullReview')}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </EnhancedCarousel>
    </div>
  );
};

export default Reviews;
