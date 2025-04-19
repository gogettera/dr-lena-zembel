
import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant="orange"
      size="icon"
      className={cn(
        'fixed bottom-8 left-8 z-50 rounded-full shadow-lg transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      )}
      onClick={scrollToTop}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};

export default BackToTop;
