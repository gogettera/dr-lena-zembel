
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EnhancedCarousel, CarouselItem } from "@/components/ui/enhanced-carousel";

const ReviewsLoading = () => {
  return (
    <div className="relative">
      <EnhancedCarousel autoplay={false}>
        {[1, 2, 3].map((index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card role="article" className="bg-white rounded-xl shadow-md mx-2 animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton data-testid="avatar-skeleton" className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton data-testid="name-skeleton" className="h-4 w-24" />
                    <Skeleton data-testid="date-skeleton" className="h-4 w-16" />
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
};

export default ReviewsLoading;
