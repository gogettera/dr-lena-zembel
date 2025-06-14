
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { NavigationLink } from '@/types/navigation';
import { TranslatedText } from './translated-text';

interface NavigationLinksProps {
  links: NavigationLink[];
  vertical?: boolean;
  onNavigate?: () => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  links,
  vertical = false,
  onNavigate
}) => {
  const { isRTL } = useLanguage();
  const location = useLocation();
  const [submenuOpenKey, setSubmenuOpenKey] = useState<string | null>(null);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleSubmenuToggle = (key: string) => {
    setSubmenuOpenKey(submenuOpenKey === key ? null : key);
  };

  const handleNavigation = () => {
    setSubmenuOpenKey(null);
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <nav className={cn(
      "flex",
      vertical ? "flex-col space-y-2" : "flex-row space-x-6",
      isRTL && !vertical && "space-x-reverse"
    )}>
      {links.map((link) => {
        const hasChildren = link.children && link.children.length > 0;
        const isLinkActive = isActive(link.path);
        const isSubmenuOpen = submenuOpenKey === link.key;

        return (
          <div key={link.key} className="relative">
            {hasChildren ? (
              <button
                onClick={() => handleSubmenuToggle(link.key)}
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors",
                  "hover:text-dental-orange focus:outline-none focus:ring-2 focus:ring-dental-orange/20",
                  isLinkActive ? "text-dental-orange" : "text-dental-navy",
                  isRTL && "space-x-reverse"
                )}
                aria-expanded={isSubmenuOpen}
                aria-haspopup="true"
              >
                <TranslatedText textKey={link.labelKey} />
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isSubmenuOpen && "rotate-180",
                    isRTL && "rotate-180"
                  )}
                />
              </button>
            ) : (
              <Link
                to={link.path}
                onClick={handleNavigation}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium transition-colors",
                  "hover:text-dental-orange focus:outline-none focus:ring-2 focus:ring-dental-orange/20",
                  isLinkActive ? "text-dental-orange" : "text-dental-navy"
                )}
              >
                <TranslatedText textKey={link.labelKey} />
              </Link>
            )}

            {hasChildren && isSubmenuOpen && (
              <div className={cn(
                "absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50",
                vertical && "relative top-0 mt-2 ml-4",
                isRTL && !vertical && "right-0"
              )}>
                {link.children?.map((child) => (
                  <Link
                    key={child.key}
                    to={child.path}
                    onClick={handleNavigation}
                    className={cn(
                      "block px-4 py-2 text-sm text-dental-navy hover:bg-dental-beige hover:text-dental-orange transition-colors",
                      isActive(child.path) && "bg-dental-beige text-dental-orange"
                    )}
                  >
                    <TranslatedText textKey={child.labelKey} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default NavigationLinks;
