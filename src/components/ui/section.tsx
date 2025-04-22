
import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { getGradient } from '@/styles/gradients';
import { useLanguage } from '@/contexts/LanguageContext';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClass?: string;
  fullWidth?: boolean;
  background?: 'white' | 'beige' | 'navy' | 'gradient' | 'none' | string;
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  animated?: boolean;
  animationDelay?: number;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
  id?: string;
  divider?: 'none' | 'top' | 'bottom' | 'both';
  directionAware?: boolean;
  rounded?: boolean;
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
    divider = 'none',
    directionAware = true,
    rounded = false,
    ...props 
  }, ref) => {
    const { isRTL } = useLanguage();

    // Determine background class
    let backgroundClass = '';
    if (background === 'white') backgroundClass = 'bg-white';
    else if (background === 'beige') backgroundClass = 'bg-dental-beige/20';
    else if (background === 'navy') backgroundClass = 'bg-dental-navy text-white';
    else if (background === 'gradient') backgroundClass = 'bg-gradient-to-br from-dental-beige/20 via-white to-dental-pink/10';
    else if (background === 'none') backgroundClass = '';
    else if (background.includes('.')) backgroundClass = getGradient(background);

    // More mobile-friendly spacing classes
    const spacingClasses = {
      none: '',
      xs: 'py-3 md:py-4 lg:py-6',
      sm: 'py-6 md:py-8 lg:py-12',
      md: 'py-8 md:py-12 lg:py-16',
      lg: 'py-12 md:py-16 lg:py-24',
      xl: 'py-16 md:py-20 lg:py-32'
    };

    const dividerClasses = {
      none: '',
      top: 'border-t border-dental-beige/30',
      bottom: 'border-b border-dental-beige/30',
      both: 'border-t border-b border-dental-beige/30'
    };

    return (
      <section
        ref={ref}
        id={id}
        dir={directionAware && isRTL ? 'rtl' : 'ltr'}
        className={cn(
          'px-4 relative',
          backgroundClass,
          spacingClasses[spacing],
          dividerClasses[divider],
          rounded && 'rounded-2xl md:rounded-3xl lg:rounded-[3rem]',
          animated && 'opacity-0 animate-fade-in',
          className
        )}
        style={animated && animationDelay > 0 ? { animationDelay: `${animationDelay}ms` } : {}}
        {...props}
      >
        {fullWidth ? (
          <div 
            className={cn(
              'w-full',
              centered && 'text-center flex flex-col items-center',
              containerClass
            )}
          >
            {children}
          </div>
        ) : (
          <Container 
            size={maxWidth === 'none' ? 'full' : maxWidth}
            className={cn(
              centered && 'text-center flex flex-col items-center',
              containerClass
            )}
          >
            {children}
          </Container>
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
