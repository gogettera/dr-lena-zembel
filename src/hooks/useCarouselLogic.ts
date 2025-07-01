
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface UseCarouselLogicProps {
  api: any;
  autoplay?: number | false;
  slideCount?: number;
}

export function useCarouselLogic({ api, autoplay, slideCount = 0 }: UseCarouselLogicProps) {
  const { isRTL } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveSlide(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", onSelect);
    onSelect(); // Initialize

    return () => api.off("select", onSelect);
  }, [api]);

  useEffect(() => {
    if (!api || !autoplay || typeof autoplay !== "number") return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, autoplay);

    return () => clearInterval(interval);
  }, [api, autoplay]);

  const scrollPrev = () => {
    if (api) api.scrollPrev();
  };

  const scrollNext = () => {
    if (api) api.scrollNext();
  };

  const scrollTo = (index: number) => {
    if (api) api.scrollTo(index);
  };

  return {
    activeSlide,
    canScrollNext,
    canScrollPrev,
    isRTL,
    scrollPrev,
    scrollNext,
    scrollTo
  };
}
