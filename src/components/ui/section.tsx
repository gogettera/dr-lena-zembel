
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClass?: string;
  fullWidth?: boolean;
  background?: 'white' | 'beige' | 'navy' | 'gradient' | 'none';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  animated?: boolean;
  animationDelay?: number;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
  id?: string;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    children, 
    className, 
    containerClass, 
    fullWidth = false, 
    background = 'white',
    spacing = 'md',
    centered = false,
    animated = false,
    animationDelay = 0,
    maxWidth = 'lg',
    id,
    ...props 
  }, ref) => {
    const backgroundClasses = {
      white: 'bg-white',
      beige: 'bg-dental-beige/20',
      navy: 'bg-dental-navy text-white',
      gradient: 'bg-gradient-to-br from-dental-beige/20 via-white to-dental-pink/10',
      none: ''
    };

    const spacingClasses = {
      none: '',
      xs: 'py-4 md:py-6',
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-16 md:py-24',
      xl: 'py-20 md:py-32'
    };

    const maxWidthClasses = {
      xs: 'max-w-md',
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[90rem]',
      full: 'w-full',
      none: ''
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          'px-4',
          backgroundClasses[background],
          spacingClasses[spacing],
          animated && 'opacity-0 animate-fade-in',
          className
        )}
        style={animated && animationDelay > 0 ? { animationDelay: `${animationDelay}ms` } : {}}
        {...props}
      >
        <div 
          className={cn(
            fullWidth ? 'w-full' : 'mx-auto',
            maxWidth !== 'none' && maxWidthClasses[maxWidth],
            centered && 'text-center flex flex-col items-center',
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
