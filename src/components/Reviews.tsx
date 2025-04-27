
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { EnhancedCarousel, CarouselItem } from '@/components/ui/enhanced-carousel';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
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
  const [fetchTries, setFetchTries] = useState(0);
  const maxTries = 3;

  const fetchReviews = async () => {
    try {
      console.log('Fetching reviews from edge function');
      const response = await supabase.functions.invoke('fetch-google-reviews');
      
      if (response.error) {
        console.error('Function error:', response.error);
        throw new Error(`Function error: ${response.error.message}`);
      }
      
      console.log('Edge function response:', response);
      
      toast({
        title: t('reviewsUpdated'),
        description: t('reviewsFetchSuccess'),
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: t('error'),
        description: `${t('reviewsFetchError')}: ${error instanceof Error ? error.message : 'Unknown error'}`,
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

      if (error) {
        console.error('Error fetching reviews from database:', error);
        throw error;
      }
      console.log('Reviews from database:', data);
      return data as Review[];
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const initialFetch = async () => {
      try {
        await fetchReviews();
        // Refetch reviews from database after fetching from Google
        setTimeout(() => refetch(), 1000);
      } catch (error) {
        console.error('Initial fetch error:', error);
        // Try again if we haven't exceeded max tries
        if (fetchTries < maxTries - 1) {
          setTimeout(() => {
            setFetchTries(prev => prev + 1);
          }, Math.pow(2, fetchTries) * 1000); // Exponential backoff
        }
      }
    };

    initialFetch();
  }, [fetchTries]);

  const handleManualRefresh = async () => {
    setIsManualRefreshing(true);
    try {
      await fetchReviews();
      // Wait a bit before refetching to allow the edge function to complete
      setTimeout(() => refetch(), 1000);
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
        <pre className="text-xs text-red-500 mb-4 max-w-lg mx-auto overflow-auto">
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
        <Button onClick={() => refetch()} variant="outline">
          {t('tryAgain')}
        </Button>
      </div>
    );
  }

  // Check if we have reviews
  if (!reviews?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-dental-navy mb-4">{t('noReviewsYet')}</p>
        <p className="text-sm text-gray-500 mb-4">
          {fetchTries > 0 ? `${t('tryingToFetchReviews')} (${fetchTries}/${maxTries})` : ''}
        </p>
        <Button 
          onClick={handleManualRefresh} 
          variant="outline"
          disabled={isManualRefreshing}
        >
          {isManualRefreshing ? t('fetching') : t('fetchReviews')}
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
