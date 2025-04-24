
import * as React from "react";
import {
  Carousel as BaseCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { CarouselNavigation } from "../carousel-navigation";
import { CarouselProgress } from "../carousel-progress";
import { useEnhancedCarousel } from "./use-enhanced-carousel";

interface BaseCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  autoplay?: boolean;
  interval?: number;
  showProgress?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function EnhancedCarousel({
  children,
  autoplay = true,
  interval = 5000,
  showProgress = true,
  showArrows = true,
  className,
  ...props
}: BaseCarouselProps) {
  const [api, setApi] = React.useState<any>();
  const { current, count, isRTL, handlePrevious, handleNext } = useEnhancedCarousel({
    api,
    autoplay,
    interval
  });

  return (
    <div className="relative w-full">
      <BaseCarousel
        setApi={setApi}
        className={cn("w-full", className)}
        dir={isRTL ? 'rtl' : 'ltr'}
        opts={{
          align: "start",
          loop: true,
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        {...props}
      >
        <CarouselContent>
          {children}
        </CarouselContent>

        {showArrows && (
          <CarouselNavigation 
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </BaseCarousel>

      {showProgress && (
        <CarouselProgress
          current={current}
          count={count}
          onSelect={(index) => api?.scrollTo(index)}
        />
      )}
    </div>
  );
}

