
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClass?: string;
  fullWidth?: boolean;
  background?: 'white' | 'beige' | 'gradient' | 'none';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    children, 
    className, 
    containerClass, 
    fullWidth = false, 
    background = 'white',
    spacing = 'md',
    ...props 
  }, ref) => {
    const backgroundClasses = {
      white: 'bg-white',
      beige: 'bg-dental-beige/20',
      gradient: 'bg-gradient-to-br from-dental-beige/20 via-white to-dental-pink/10',
      none: ''
    };

    const spacingClasses = {
      none: '',
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-16 md:py-24'
    };

    return (
      <section
        ref={ref}
        className={cn(
          'px-4',
          backgroundClasses[background],
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        <div 
          className={cn(
            fullWidth ? 'w-full' : 'container mx-auto',
            containerClass
          )}
        >
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
