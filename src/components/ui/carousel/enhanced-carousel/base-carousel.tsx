
import * as React from "react";
import {
  Carousel as BaseCarousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { CarouselProgress } from "../carousel-progress";
import { useEnhancedCarousel } from "./use-enhanced-carousel";
import { EnhancedCarouselProps } from "./types";

export function EnhancedCarousel({
  children,
  autoplay = false,
  interval = 5000,
  showProgress = true,
  showArrows = true,
  setApi,
  className,
  opts,
  ...props
}: EnhancedCarouselProps) {
  const [internalApi, setInternalApi] = React.useState<any>();
  const { current, count, isRTL, handlePrevious, handleNext } = useEnhancedCarousel({
    api: internalApi,
    autoplay,
    interval
  });

  const handleApiSet = React.useCallback((api: any) => {
    setInternalApi(api);
    if (setApi) setApi(api);
  }, [setApi]);

  return (
    <div className="relative w-full">
      <BaseCarousel
        setApi={handleApiSet}
        className={cn("w-full", className)}
        dir={isRTL ? 'rtl' : 'ltr'}
        opts={{
          align: "start",
          loop: true,
          direction: isRTL ? 'rtl' : 'ltr',
          ...opts
        }}
        {...props}
      >
        <CarouselContent>
          {children}
        </CarouselContent>

        {showArrows && (
          <>
            <CarouselPrevious onClick={handlePrevious} />
            <CarouselNext onClick={handleNext} />
          </>
        )}
      </BaseCarousel>

      {showProgress && (
        <CarouselProgress
          current={current}
          count={count}
          onSelect={(index) => internalApi?.scrollTo(index)}
        />
      )}
    </div>
  );
}
