
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
  const [submenuOpenHref, setSubmenuOpenHref] = useState<string | null>(null);

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const handleSubmenuToggle = (href: string) => {
    setSubmenuOpenHref(submenuOpenHref === href ? null : href);
  };

  const handleNavigation = () => {
    setSubmenuOpenHref(null);
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
      {links.map((link, index) => {
        const hasDropdown = link.dropdown && (
          link.dropdown.general?.length || 
          link.dropdown.specialized?.length || 
          link.dropdown.aesthetic?.length
        );
        const isLinkActive = isActive(link.href);
        const isSubmenuOpen = submenuOpenHref === link.href;
        const linkKey = `${link.href}-${index}`;

        return (
          <div key={linkKey} className="relative">
            {hasDropdown ? (
              <button
                onClick={() => handleSubmenuToggle(link.href)}
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
                to={link.href}
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

            {hasDropdown && isSubmenuOpen && (
              <div className={cn(
                "absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50",
                vertical && "relative top-0 mt-2 ml-4",
                isRTL && !vertical && "right-0"
              )}>
                {link.dropdown?.general?.map((child, childIndex) => (
                  <Link
                    key={`${child.href}-${childIndex}`}
                    to={child.href}
                    onClick={handleNavigation}
                    className={cn(
                      "block px-4 py-2 text-sm text-dental-navy hover:bg-dental-beige hover:text-dental-orange transition-colors",
                      isActive(child.href) && "bg-dental-beige text-dental-orange"
                    )}
                  >
                    <TranslatedText textKey={child.labelKey} />
                  </Link>
                ))}
                {link.dropdown?.specialized?.map((child, childIndex) => (
                  <Link
                    key={`${child.href}-specialized-${childIndex}`}
                    to={child.href}
                    onClick={handleNavigation}
                    className={cn(
                      "block px-4 py-2 text-sm text-dental-navy hover:bg-dental-beige hover:text-dental-orange transition-colors",
                      isActive(child.href) && "bg-dental-beige text-dental-orange"
                    )}
                  >
                    <TranslatedText textKey={child.labelKey} />
                  </Link>
                ))}
                {link.dropdown?.aesthetic?.map((child, childIndex) => (
                  <Link
                    key={`${child.href}-aesthetic-${childIndex}`}
                    to={child.href}
                    onClick={handleNavigation}
                    className={cn(
                      "block px-4 py-2 text-sm text-dental-navy hover:bg-dental-beige hover:text-dental-orange transition-colors",
                      isActive(child.href) && "bg-dental-beige text-dental-orange"
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
