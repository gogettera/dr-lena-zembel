
import * as React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface UseEnhancedCarouselProps {
  api: any;
  autoplay?: boolean;
  interval?: number;
}

export function useEnhancedCarousel({ api, autoplay = true, interval = 5000 }: UseEnhancedCarouselProps) {
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

  return {
    current,
    count,
    isRTL,
    handlePrevious,
    handleNext
  };
}
