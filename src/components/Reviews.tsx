
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { EnhancedCarousel, CarouselItem } from '@/components/ui/enhanced-carousel';
import { useToast } from "@/hooks/use-toast";
import ReviewCard from './reviews/ReviewCard';
import ReviewsLoading from './reviews/ReviewsLoading';
import ReviewsHeader from './reviews/ReviewsHeader';

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
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await supabase.functions.invoke('fetch-google-reviews');
      
      if (response.error) {
        throw new Error(`Function error: ${response.error.message}`);
      }
      
      toast({
        title: t('reviewsUpdated'),
        description: t('reviewsFetchSuccess'),
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: t('error'),
        description: t('reviewsFetchError'),
        variant: "destructive",
      });
      throw error;
    }
  };

  const { data: reviews, isLoading, error, refetch } = useQuery({
    queryKey: ['google-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('google_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Review[];
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    fetchReviews().catch(console.error);
  }, []);

  const handleManualRefresh = async () => {
    setIsManualRefreshing(true);
    try {
      await fetchReviews();
      refetch();
    } catch (error) {
      console.error('Manual refresh error:', error);
    } finally {
      setIsManualRefreshing(false);
    }
  };

  if (isLoading) {
    return <ReviewsLoading />;
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
      <ReviewsHeader 
        onRefresh={handleManualRefresh}
        isRefreshing={isManualRefreshing}
      />
      
      <EnhancedCarousel autoplay={5000}>
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 p-2">
            <ReviewCard {...review} />
          </CarouselItem>
        ))}
      </EnhancedCarousel>
    </div>
  );
};

export default Reviews;
