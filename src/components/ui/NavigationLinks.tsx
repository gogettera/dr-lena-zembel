
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavigationLink } from "@/config/navigation";
import { NAVIGATION_ANIMATIONS } from "@/styles/animation";
import { useDirectionalStyles } from "@/utils/direction";

/**
 * Props for NavigationLinks
 * @param links The navigation link objects
 * @param vertical If true, renders as a vertical stack (for mobile)
 * @param className Extra classes
 * @param onNavigate Optional callback after navigation (e.g. to close mobile drawer)
 */
interface NavigationLinksProps {
  links: NavigationLink[];
  vertical?: boolean;
  className?: string;
  onNavigate?: () => void;
  activePath?: string; // optional override of Location path
  submenuOpenKey?: string | null;
  setSubmenuOpenKey?: (key: string | null) => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  links,
  vertical = false,
  className = "",
  onNavigate,
  activePath,
  submenuOpenKey,
  setSubmenuOpenKey,
}) => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const styles = useDirectionalStyles();
  const path = activePath || location.pathname;

  // Use controlled submenu (for mobile), or local state (for desktop)
  const [_submenu, _setSubmenu] = useState<string | null>(null);
  const realOpenSubmenu = setSubmenuOpenKey ? submenuOpenKey : _submenu;
  const handleToggleSubmenu = (key: string) => {
    if (setSubmenuOpenKey) {
      setSubmenuOpenKey(submenuOpenKey === key ? null : key);
    } else {
      _setSubmenu(_submenu === key ? null : key);
    }
  };

  return (
    <ul className={cn(vertical ? "flex flex-col gap-2" : "flex items-center space-x-1", styles.spaceDir, className)}>
      {links.map((item) => {
        const hasChildren = !!item.children && item.children.length > 0;
        const isActive = path === item.path || path.startsWith(item.path + "/") || (item.path.includes("#") && (path === item.path.split("#")[0] || path === item.path.split("#")[0] + "/"));
        return (
          <li key={item.key} className={vertical ? "" : "relative"}>
            {!hasChildren ? (
              <Link 
                to={item.path}
                className={cn(
                  vertical
                    ? "text-lg font-medium px-2 py-1 rounded-md"
                    : "block select-none rounded-md px-4 py-2 text-sm font-medium",
                  NAVIGATION_ANIMATIONS.backgroundTransition,
                  isActive
                    ? (vertical ? "text-dental-orange bg-dental-beige/10" : "text-dental-orange")
                    : (vertical
                      ? "text-dental-navy hover:text-dental-orange hover:bg-dental-beige/10"
                      : "text-dental-navy hover:text-dental-orange"),
                )}
                onClick={onNavigate}
              >
                {t(item.labelKey)}
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleToggleSubmenu(item.key)}
                  className={cn(
                    vertical
                      ? "flex justify-between items-center text-lg font-medium px-2 py-1 rounded-md"
                      : "inline-flex items-center rounded-md px-4 py-2 text-sm font-medium",
                    NAVIGATION_ANIMATIONS.backgroundTransition,
                    isActive
                      ? "text-dental-orange bg-dental-beige/10"
                      : "text-dental-navy hover:text-dental-orange hover:bg-dental-beige/10",
                  )}
                >
                  {t(item.labelKey)}
                  {realOpenSubmenu === item.key ? (
                    <ChevronUp className={cn("ml-1 h-4 w-4", styles.icon.chevron)} />
                  ) : (
                    <ChevronDown className={cn("ml-1 h-4 w-4", styles.icon.chevron)} />
                  )}
                </button>
                {/* Desktop: submenu on hover. Mobile: submenu on click */}
                {(vertical ? realOpenSubmenu === item.key : true) && (
                  <ul
                    className={cn(
                      vertical
                        ? cn(
                            NAVIGATION_ANIMATIONS.fadeIn,
                            "mt-1 flex flex-col space-y-1",
                            isRTL ? "mr-4" : "ml-4"
                          )
                        : "absolute left-0 top-full z-30 w-[240px] bg-white shadow-lg rounded-md mt-2 p-2",
                    )}
                    style={!vertical ? { minWidth: 200, right: isRTL ? 0 : "auto", left: isRTL ? "auto" : 0 } : {}}
                  >
                    {item.children!.map((child) => {
                      const isChildActive = path === child.path || path.startsWith(child.path + "/");
                      return (
                        <li key={child.key}>
                          <Link
                            to={child.path}
                            className={cn(
                              vertical
                                ? "text-base px-2 py-1 rounded-md"
                                : "block rounded-md px-3 py-2",
                              NAVIGATION_ANIMATIONS.backgroundTransition,
                              isChildActive
                                ? "text-dental-orange bg-dental-beige/10"
                                : "text-dental-navy hover:text-dental-orange hover:bg-dental-beige/10"
                            )}
                            onClick={onNavigate}
                          >
                            {t(child.labelKey)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationLinks;

