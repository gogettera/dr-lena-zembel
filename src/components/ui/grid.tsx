
import * as React from 'react';
import { cn } from '@/lib/utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  mdCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lgCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  rowGap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  colGap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  className?: string;
  responsive?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    children, 
    cols = 1,
    mdCols, 
    lgCols, 
    gap = 4, 
    rowGap, 
    colGap,
    className,
    responsive = true,
    ...props 
  }, ref) => {
    const gapClass = gap !== undefined ? `gap-${gap}` : '';
    const rowGapClass = rowGap !== undefined ? `row-gap-${rowGap}` : '';
    const colGapClass = colGap !== undefined ? `col-gap-${colGap}` : '';
    
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          `grid-cols-${cols}`,
          responsive && mdCols && `md:grid-cols-${mdCols}`,
          responsive && lgCols && `lg:grid-cols-${lgCols}`,
          gapClass,
          rowGapClass,
          colGapClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export { Grid };
