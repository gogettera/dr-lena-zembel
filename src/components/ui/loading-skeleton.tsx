
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'image' | 'button';
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = 'text',
  lines = 1
}) => {
  const baseClasses = "animate-pulse bg-dental-beige/50 rounded";
  
  const variants = {
    text: "h-4 w-full",
    card: "h-32 w-full",
    image: "h-48 w-full",
    button: "h-10 w-24"
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variants[variant],
              index === lines - 1 && "w-3/4", // Last line shorter
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variants[variant], className)}
      aria-label="טוען..."
      role="status"
    />
  );
};
