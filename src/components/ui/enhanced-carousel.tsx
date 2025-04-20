
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel as BaseCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const { language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
    if (!api || !autoplay) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, interval);

    return () => clearInterval(intervalId);
  }, [api, autoplay, interval]);

  const handlePrevious = () => {
    if (isRTL) {
      api?.scrollNext();
    } else {
      api?.scrollPrev();
    }
  };

  const handleNext = () => {
    if (isRTL) {
      api?.scrollPrev();
    } else {
      api?.scrollNext();
    }
  };

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
          <>
            <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-white shadow-md hover:bg-dental-beige hover:scale-110 transition-all border-dental-navy/20"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-5 w-5 text-dental-navy" />
              </Button>
            </div>
            <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-white shadow-md hover:bg-dental-beige hover:scale-110 transition-all border-dental-navy/20"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5 text-dental-navy" />
              </Button>
            </div>
          </>
        )}
      </BaseCarousel>

      {showProgress && count > 0 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                current === index
                  ? "bg-dental-orange scale-125"
                  : "bg-dental-navy/20 hover:bg-dental-navy/30"
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { CarouselItem };
