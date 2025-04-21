
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
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const styles = useDirectionalStyles();
  const [_submenu, _setSubmenu] = useState<string | null>(null);
  const realOpenSubmenu = setSubmenuOpenKey ? submenuOpenKey : _submenu;
  const openHandler = setSubmenuOpenKey ?? _setSubmenu;

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
              {t(item.labelKey)}
            </NavItem>
          );
        }

        const isExpanded = realOpenSubmenu === item.key;
        return (
          <NavItem
            key={item.key}
            as="button"
            active={isActive}
            aria-haspopup="true"
            aria-expanded={isExpanded}
            onClick={() => openHandler(isExpanded ? null : item.key)}
            tabIndex={0}
            className={vertical ? "flex justify-between items-center" : "inline-flex items-center"}
          >
            <>
              <span>{t(item.labelKey)}</span>
              {isExpanded ? (
                <ChevronUp className={styles.icon.chevron + " ml-1 h-4 w-4"} />
              ) : (
                <ChevronDown className={styles.icon.chevron + " ml-1 h-4 w-4"} />
              )}
              {/* Submenu */}
              {(vertical ? isExpanded : true) && (
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
                  ariaLabel={t(item.labelKey) + " submenu"}
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
                        {t(child.labelKey)}
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
