
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { createLocalizedNavigationConfig } from '@/config/navigationConfig';
import { useDirectionalStyles } from '@/utils/direction';
import { NAVIGATION_ANIMATIONS } from '@/styles/animation';
import { cn } from '@/lib/utils';
import NavigationLinks from './ui/NavigationLinks';

const MobileNav = () => {
  const { t } = useLanguage();  
  const isRTL = true; // Hebrew is RTL
  const navigation = createLocalizedNavigationConfig();
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
        <nav className="flex flex-col gap-4 mt-8" dir="rtl" aria-label={t('navigation.mainNavigation', 'Main navigation')}>
          <NavigationLinks
            links={navigation.mainMenu}
            vertical
            onNavigate={() => setSheetOpen(false)}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
