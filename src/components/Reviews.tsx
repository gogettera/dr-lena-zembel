
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type Review = {
  id: string;
  author_name: string;
  rating: number;
  text: string | null;
  profile_photo_url: string | null;
  relative_time_description: string | null;
};

const Reviews = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';

  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['reviews'],
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
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
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
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  if (error) {
    console.error('Error loading reviews:', error);
    return null;
  }

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {reviews?.map((review, index) => (
            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 p-2">
              <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-dental-orange rounded-full blur opacity-20"></div>
                      <img
                        src={review.profile_photo_url || '/placeholder.svg'}
                        alt={`תמונת פרופיל של ${review.author_name}`}
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
                  <div className="bg-dental-beige/20 p-4 rounded-lg mb-4">
                    <p className="text-dental-navy mb-0 line-clamp-4 relative">
                      <span className="text-4xl text-dental-orange/20 absolute -top-3 right-0">"</span>
                      {review.text}
                      <span className="text-4xl text-dental-orange/20 absolute -bottom-6 left-0">"</span>
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 text-center mt-4">{review.relative_time_description}</div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full bg-white shadow-md hover:bg-dental-beige hover:scale-110 transition-all border-dental-navy/20"
            asChild
          >
            <CarouselPrevious className="static transform-none">
              {isRTL ? <ChevronRight className="h-5 w-5 text-dental-navy" /> : <ChevronLeft className="h-5 w-5 text-dental-navy" />}
            </CarouselPrevious>
          </Button>
        </div>
        <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full bg-white shadow-md hover:bg-dental-beige hover:scale-110 transition-all border-dental-navy/20"
            asChild
          >
            <CarouselNext className="static transform-none">
              {isRTL ? <ChevronLeft className="h-5 w-5 text-dental-navy" /> : <ChevronRight className="h-5 w-5 text-dental-navy" />}
            </CarouselNext>
          </Button>
        </div>
      </Carousel>
    </div>
  );
};

export default Reviews;
