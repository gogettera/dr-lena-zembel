
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel as BaseCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCarousel } from "@/hooks/use-carousel";
import { CarouselNavigation } from "./carousel/carousel-navigation";
import { CarouselProgress } from "./carousel/carousel-progress";

interface EnhancedCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
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
}: EnhancedCarouselProps) {
  const [api, setApi] = React.useState<any>();
  const { current, count, isRTL, handlePrevious, handleNext } = useCarousel({
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

export { CarouselItem };
