
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface DeferredContentProps {
  children: React.ReactNode;
  loading?: boolean;
  priority?: 'low' | 'medium' | 'high';
  placeholder?: React.ReactNode;
  height?: string | number;
  width?: string | number;
}

/**
 * DeferredContent component that delays rendering non-critical content
 * to improve initial page load performance
 */
const DeferredContent: React.FC<DeferredContentProps> = ({ 
  children, 
  loading = false,
  priority = 'medium',
  placeholder,
  height = '16rem',
  width = '100%',
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // For high priority content, render almost immediately
    if (priority === 'high') {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, 200);
      return () => clearTimeout(timer);
    }

    // For medium/low priority content, use requestIdleCallback if available
    if ('requestIdleCallback' in window) {
      const idleCallback = (window as any).requestIdleCallback(
        () => {
          setShouldRender(true);
        },
        { 
          timeout: priority === 'medium' ? 2000 : 4000 
        }
      );
      
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as any).cancelIdleCallback(idleCallback);
        }
      };
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      const delay = priority === 'medium' ? 2000 : 4000;
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [priority]);

  if (loading || !shouldRender) {
    if (placeholder) {
      return <>{placeholder}</>;
    }
    
    return (
      <div 
        className="w-full overflow-hidden rounded-lg bg-gray-100"
        style={{ 
          height: typeof height === 'number' ? `${height}px` : height,
          width: typeof width === 'number' ? `${width}px` : width,
        }}
      >
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    );
  }

  return <>{children}</>;
};

export default DeferredContent;
