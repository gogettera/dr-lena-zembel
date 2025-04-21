
import React from 'react';
import { cn } from '@/lib/utils';

export interface NavListProps extends React.HTMLAttributes<HTMLUListElement> {
  vertical?: boolean;
  className?: string;
  children: React.ReactNode;
  role?: string;
  ariaLabel?: string;
}

const NavList: React.FC<NavListProps> = ({
  vertical = false,
  className,
  children,
  role = 'menu',
  ariaLabel,
  ...props
}) => (
  <ul
    className={cn(vertical ? "flex flex-col gap-2" : "flex items-center gap-1", className)}
    role={role}
    aria-label={ariaLabel}
    {...props}
  >
    {children}
  </ul>
);

export default NavList;
