
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { Separator } from './ui/separator';
import LanguageSwitcher from './LanguageSwitcher';
import { createLocalizedNavigationConfig, isActiveLink } from '@/config/navigation';
import { useDirectionalStyles } from '@/utils/direction';
import { NAVIGATION_ANIMATIONS } from '@/styles/animation';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  const location = useLocation();
  const navigation = createLocalizedNavigationConfig(language);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const styles = useDirectionalStyles();

  const toggleSubmenu = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden hover:bg-dental-beige/20"
          aria-label={t('toggleMenu', 'Toggle menu')}
        >
          <Menu className="h-5 w-5 text-dental-navy" />
          <span className="sr-only">{t('toggleMenu', 'Toggle menu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side={isRTL ? "right" : "left"}
        className="w-[300px] bg-white"
      >
        <nav className="flex flex-col gap-4 mt-8" dir={isRTL ? 'rtl' : 'ltr'}>
          {navigation.main.map((item) => (
            <div key={item.key} className="flex flex-col">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.key)}
                    className={cn(
                      "flex justify-between items-center text-lg font-medium px-2 py-1 rounded-md",
                      NAVIGATION_ANIMATIONS.backgroundTransition,
                      isActiveLink(location.pathname, item.path)
                        ? 'text-dental-orange bg-dental-beige/10'
                        : 'text-dental-navy hover:text-dental-orange hover:bg-dental-beige/10'
                    )}
                  >
                    {t(item.labelKey)}
                    {openSubmenu === item.key ? (
                      <ChevronUp className={cn("h-4 w-4", styles.icon.chevron)} />
                    ) : (
                      <ChevronDown className={cn("h-4 w-4", styles.icon.chevron)} />
                    )}
                  </button>
                  {openSubmenu === item.key && (
                    <div className={cn(
                      "mt-1 flex flex-col space-y-1",
                      isRTL ? "mr-4" : "ml-4",
                      NAVIGATION_ANIMATIONS.fadeIn
                    )}>
                      {item.children.map((child) => (
                        <Link
                          key={child.key}
                          to={child.path}
                          className={cn(
                            "text-base px-2 py-1 rounded-md",
                            NAVIGATION_ANIMATIONS.backgroundTransition,
                            isActiveLink(location.pathname, child.path)
                              ? 'text-dental-orange bg-dental-beige/10'
                              : 'text-dental-navy hover:text-dental-orange hover:bg-dental-beige/10'
                          )}
                        >
                          {t(child.labelKey)}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "text-lg font-medium px-2 py-1 rounded-md",
                    NAVIGATION_ANIMATIONS.backgroundTransition,
                    isActiveLink(location.pathname, item.path)
                      ? 'text-dental-orange bg-dental-beige/10'
                      : 'text-dental-navy hover:text-dental-orange hover:bg-dental-beige/10'
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              )}
            </div>
          ))}
          <Separator className="my-4" />
          <div className="px-2">
            <LanguageSwitcher />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
