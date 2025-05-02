
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { createLocalizedNavigationConfig } from '@/config/navigation';
import { useDirectionalStyles } from '@/utils/direction';
import { NAVIGATION_ANIMATIONS } from '@/styles/animation';
import { cn } from '@/lib/utils';
import NavigationLinks from './ui/NavigationLinks';

const MobileNav = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  const navigation = createLocalizedNavigationConfig(language);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const styles = useDirectionalStyles();
  const [sheetOpen, setSheetOpen] = useState(false);

  // Accessibility improvement: Focus trap for sheet
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (sheetOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [sheetOpen]);

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open);
    // Reset submenu when sheet closes
    if (!open) setOpenSubmenu(null);
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden hover:bg-dental-beige/20"
          aria-label={t('common.toggleMenu', 'Toggle menu')}
          ref={firstFocusableRef}
        >
          <Menu className="h-5 w-5 text-dental-navy" />
          <span className="sr-only">{t('common.toggleMenu', 'Toggle menu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side={isRTL ? "right" : "left"}
        className={cn("w-[300px] bg-white", NAVIGATION_ANIMATIONS.slideDown)}
        aria-modal="true"
        role="dialog"
      >
        <nav className="flex flex-col gap-4 mt-8" dir={isRTL ? 'rtl' : 'ltr'} aria-label={t('navigation.mainNavigation', 'Main navigation')}>
          <NavigationLinks
            links={navigation.main}
            vertical
            submenuOpenKey={openSubmenu}
            setSubmenuOpenKey={setOpenSubmenu}
            onNavigate={() => setSheetOpen(false)}
          />
          <div className="my-4"><hr /></div>
          <div className="px-2">
            <LanguageSwitcher />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
