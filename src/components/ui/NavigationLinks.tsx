
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavigationLink } from "@/config/navigation";
import { NAVIGATION_ANIMATIONS } from "@/styles/animation";
import { useDirectionalStyles } from "@/utils/direction";
import { isActiveLink } from "@/utils/navigation";
import NavList from "./NavList";
import NavItem from "./NavItem";
import { TranslatedText } from "./translated-text";

interface NavigationLinksProps {
  links: NavigationLink[];
  vertical?: boolean;
  className?: string;
  onNavigate?: () => void;
  submenuOpenKey?: string | null;
  setSubmenuOpenKey?: (key: string | null) => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  links,
  vertical = false,
  className,
  onNavigate,
  submenuOpenKey,
  setSubmenuOpenKey,
}) => {
  const { isRTL } = useLanguage();
  const location = useLocation();
  const styles = useDirectionalStyles();

  // Separate state for desktop submenu hover/focus
  const [_submenu, _setSubmenu] = useState<string | null>(null);
  const desktopSubmenuKey = !vertical ? _submenu : null;

  // Use props for mobile menu (vertical), internal state for desktop
  const realOpenSubmenu = vertical
    ? (setSubmenuOpenKey ? submenuOpenKey : _submenu)
    : desktopSubmenuKey;
  const openHandler = vertical
    ? (setSubmenuOpenKey || _setSubmenu)
    : _setSubmenu;

  return (
    <NavList
      vertical={vertical}
      className={styles.spaceDir + " " + (className || "")}
    >
      {links.map((item) => {
        const hasChildren = !!item.children && item.children.length > 0;
        const isActive = isActiveLink(location.pathname, item.path);

        if (!hasChildren) {
          return (
            <NavItem
              key={item.key}
              to={item.path}
              as="a"
              active={isActive}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
            >
              <TranslatedText textKey={item.labelKey} />
            </NavItem>
          );
        }

        // Desktop: open submenu only on hover or focus
        let submenuTriggers: any = {};
        if (!vertical) {
          submenuTriggers = {
            onMouseEnter: () => _setSubmenu(item.key),
            onMouseLeave: () => _setSubmenu(null),
            onFocus: () => _setSubmenu(item.key),
            onBlur: (e: React.FocusEvent) => {
              // Only close if focus moves outside this menu item
              if (!e.currentTarget.contains(e.relatedTarget)) {
                _setSubmenu(null);
              }
            },
          };
        }

        const isExpanded = realOpenSubmenu === item.key;

        return (
          <NavItem
            key={item.key}
            as={vertical ? "button" : "div"}
            active={isActive}
            aria-haspopup="true"
            aria-expanded={isExpanded}
            onClick={
              vertical
                ? () => openHandler(isExpanded ? null : item.key)
                : undefined
            }
            tabIndex={0}
            className={
              vertical
                ? "flex justify-between items-center"
                : "inline-flex items-center relative"
            }
            {...submenuTriggers}
          >
            <>
              <TranslatedText textKey={item.labelKey} />
              {isExpanded ? (
                <ChevronUp className={styles.icon.chevron + " ml-1 h-4 w-4"} />
              ) : (
                <ChevronDown className={styles.icon.chevron + " ml-1 h-4 w-4"} />
              )}
              {/* Submenu */}
              {(vertical ? isExpanded : isExpanded) && (
                <NavList
                  vertical={true}
                  className={
                    vertical
                      ? NAVIGATION_ANIMATIONS.fadeIn +
                        " mt-1 " +
                        (isRTL ? "mr-4" : "ml-4")
                      : "absolute left-0 top-full z-30 w-[240px] bg-white shadow-lg rounded-md mt-2 p-2"
                  }
                  role="menu"
                  ariaLabel={item.labelKey + " submenu"}
                  style={
                    !vertical
                      ? { minWidth: 200, right: isRTL ? 0 : "auto", left: isRTL ? "auto" : 0 }
                      : undefined
                  }
                >
                  {item.children!.map((child) => {
                    const isChildActive = isActiveLink(location.pathname, child.path);
                    return (
                      <NavItem
                        key={child.key}
                        to={child.path}
                        as="a"
                        active={isChildActive}
                        onClick={onNavigate}
                        aria-current={isChildActive ? "page" : undefined}
                        className="text-base"
                      >
                        <TranslatedText textKey={child.labelKey} />
                      </NavItem>
                    );
                  })}
                </NavList>
              )}
            </>
          </NavItem>
        );
      })}
    </NavList>
  );
};

export default NavigationLinks;
