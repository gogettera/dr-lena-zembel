
import React from 'react';
import { Link, To } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { isActiveLink } from '@/utils/navigation';

interface NavItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  to?: To;
  as?: 'a' | 'button' | 'div';
  active?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  tabIndex?: number;
  icon?: React.ReactNode;
  showActiveIndicator?: boolean;
  exactMatch?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  as = 'div',
  active: explicitActive,
  onClick,
  className,
  children,
  tabIndex,
  icon,
  showActiveIndicator = true,
  exactMatch = false,
  ...props
}) => {
  const location = useLocation();
  
  // Auto-detect active status based on current path if not explicitly provided
  const active = explicitActive !== undefined 
    ? explicitActive 
    : to && typeof to === 'string' 
      ? isActiveLink(location.pathname, to) 
      : false;

  const baseClasses = cn(
    "relative select-none rounded-md transition-all duration-200 px-4 py-2 text-sm font-medium",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-dental-sky focus-visible:ring-offset-1",
    className
  );
  
  const activeClasses = active
    ? "text-dental-orange font-semibold bg-dental-beige/10"
    : "text-dental-navy hover:text-dental-orange hover:bg-dental-beige/10 transition-colors";
  
  // Active indicator dot
  const activeIndicator = active && showActiveIndicator ? (
    <span className="absolute top-0 left-0 w-1 h-1 bg-dental-orange rounded-full transform translate-x-1 translate-y-1" />
  ) : null;

  if (as === 'a' && to) {
    return (
      <li {...props}>
        <Link
          to={to}
          tabIndex={tabIndex}
          onClick={onClick}
          className={cn(baseClasses, activeClasses)}
          aria-current={active ? 'page' : undefined}
        >
          {activeIndicator}
          {icon && <span className="mr-2 inline-flex">{icon}</span>}
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
          className={cn(baseClasses, activeClasses)}
          tabIndex={tabIndex}
          onClick={onClick}
        >
          {activeIndicator}
          {icon && <span className="mr-2 inline-flex">{icon}</span>}
          {children}
        </button>
      </li>
    );
  }
  
  return (
    <li {...props} className={className}>
      <div className={cn(baseClasses, activeClasses)}>
        {activeIndicator}
        {icon && <span className="mr-2 inline-flex">{icon}</span>}
        {children}
      </div>
    </li>
  );
};

export default NavItem;
