
import { useState, useEffect, RefObject } from 'react';

interface UseIntersectionObserverProps {
  target: RefObject<Element>;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

/**
 * Custom hook for detecting when an element enters the viewport
 */
export const useIntersectionObserver = ({
  target,
  rootMargin = '0px',
  threshold = 0,
  once = true
}: UseIntersectionObserverProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = target?.current;
    
    // Early return if element doesn't exist or if already intersected with once=true
    if (!element || (isIntersecting && once)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          
          // Disconnect observer if once is true
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [target, rootMargin, threshold, once, isIntersecting]);

  return isIntersecting;
};
