
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { debounce } from '@/utils/direction';

interface ScrollToTopButtonProps {
  threshold?: number;
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
  buttonClassName?: string;
  smooth?: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  threshold = 300,
  position = 'bottom-right',
  className,
  buttonClassName,
  smooth = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsVisible(window.scrollY > threshold);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed z-50 transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        positionClasses[position],
        className
      )}
    >
      <Button
        variant="outline"
        size="icon"
        className={cn(
          'rounded-full bg-white shadow-md border-dental-beige',
          'hover:bg-dental-beige/10 hover:border-dental-orange',
          'focus:outline-none focus:ring-2 focus:ring-dental-orange focus:ring-offset-2',
          'transition-all duration-300',
          buttonClassName
        )}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5 text-dental-navy" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
