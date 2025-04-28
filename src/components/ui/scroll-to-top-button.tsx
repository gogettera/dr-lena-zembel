
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  threshold?: number;
  smooth?: boolean;
  className?: string;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  threshold = 300,
  smooth = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > threshold);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className={`fixed bottom-4 right-4 z-50 rounded-full p-2 shadow-md bg-white border-gray-200 hover:bg-gray-100 transition-opacity ${className}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5 text-dental-navy" />
    </Button>
  );
};
