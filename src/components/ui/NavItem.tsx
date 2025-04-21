
import React from 'react';
import { Link, To } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  to?: To;
  as?: 'a' | 'button' | 'div';
  active?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  tabIndex?: number;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  as = 'div',
  active = false,
  onClick,
  className,
  children,
  tabIndex,
  ...props
}) => {
  const base =
    "select-none rounded-md transition-colors duration-200 px-4 py-2 text-sm font-medium";
  const activeStyles = active
    ? "text-dental-orange bg-dental-beige/10 font-semibold"
    : "text-dental-navy hover:text-dental-orange hover:bg-dental-beige/10";

  if (as === 'a' && to) {
    return (
      <li {...props}>
        <Link
          to={to}
          tabIndex={tabIndex}
          onClick={onClick}
          className={cn(base, activeStyles, className)}
          aria-current={active ? 'page' : undefined}
        >
          {children}
        </Link>
      </li>
    );
  }
  if (as === 'button') {
    return (
      <li {...props}>
        <button
          type="button"
          className={cn(base, activeStyles, className)}
          tabIndex={tabIndex}
          onClick={onClick}
        >
          {children}
        </button>
      </li>
    );
  }
  return (
    <li {...props} className={className}>
      <div className={cn(base, activeStyles)}>{children}</div>
    </li>
  );
};

export default NavItem;
