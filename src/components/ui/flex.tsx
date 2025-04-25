
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useDirectionalStyles } from '@/utils/direction';

type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';
type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: FlexDirection;
  justify?: JustifyContent;
  align?: AlignItems;
  wrap?: FlexWrap;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  className?: string;
  rtlFlip?: boolean;
  forceRTL?: boolean;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ 
    children, 
    direction = 'row', 
    justify = 'start', 
    align = 'start', 
    wrap = 'nowrap',
    gap, 
    className,
    rtlFlip = true,
    forceRTL = false,
    ...props 
  }, ref) => {
    const styles = useDirectionalStyles();
    const isRTL = forceRTL || styles.textAlign === 'text-right';
    
    // Handle RTL flipping for row directions if rtlFlip is true
    let finalDirection = direction;
    if (rtlFlip && isRTL) {
      if (direction === 'row') finalDirection = 'row-reverse';
      else if (direction === 'row-reverse') finalDirection = 'row';
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          `flex-${finalDirection}`,
          `justify-${justify}`,
          `items-${align}`,
          `flex-${wrap}`,
          gap !== undefined && `gap-${gap}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

export { Flex };
