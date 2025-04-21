
import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current viewport is mobile-sized
 * @param breakpoint The width in pixels at which to consider the viewport mobile (default: 768)
 * @returns Boolean indicating if the viewport is mobile-sized
 */
export const useIsMobile = (breakpoint: number = 768): boolean => {
  // Default to desktop during SSR or when window is not available
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial value
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Check immediately
    checkIfMobile();
    
    // Add resize event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [breakpoint]);

  return isMobile;
};
