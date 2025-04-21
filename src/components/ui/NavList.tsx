
import React from 'react';
import { cn } from '@/lib/utils';
import { useDirectionalStyles } from '@/utils/direction';

export interface NavListProps extends React.HTMLAttributes<HTMLUListElement> {
  vertical?: boolean;
  className?: string;
  children: React.ReactNode;
  role?: string;
  ariaLabel?: string;
  compact?: boolean;
  dividers?: boolean;
  centered?: boolean;
  animated?: boolean;
}

const NavList: React.FC<NavListProps> = ({
  vertical = false,
  className,
  children,
  role = 'menu',
  ariaLabel,
  compact = false,
  dividers = false,
  centered = false,
  animated = false,
  ...props
}) => {
  const styles = useDirectionalStyles();

  return (
    <ul
      className={cn(
        vertical 
          ? "flex flex-col gap-1" 
          : cn("flex items-center", compact ? "gap-0.5" : "gap-1", styles.spaceDir),
        dividers && "divide-y divide-dental-beige/30",
        centered && "justify-center",
        animated && "opacity-0 animate-fade-in",
        className
      )}
      role={role}
      aria-label={ariaLabel}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child as React.ReactElement<any>, {
          style: animated ? { 
            animationDelay: `${index * 50}ms`,
            opacity: 0,
            animation: 'fade-in 0.3s ease-out forwards',
            animationFillMode: 'forwards'
          } : undefined
        });
      })}
    </ul>
  );
};

export default NavList;
