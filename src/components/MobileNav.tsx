
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { createLocalizedPath } from '@/utils/languageRoutes';

const MobileNav = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';

  const menuItems = [
    { label: t('home'), path: '/' },
    { label: t('about'), path: '/#about' },
    { label: t('treatments'), path: '/#treatments' },
    { label: t('contact'), path: '/#contact' },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side={isRTL ? "right" : "left"}
        className="w-[300px] bg-white"
      >
        <nav className="flex flex-col gap-4 mt-8" dir={isRTL ? 'rtl' : 'ltr'}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={createLocalizedPath(language, item.path)}
              className="text-lg font-medium text-dental-navy hover:text-dental-orange transition-colors px-2 py-1 rounded-md hover:bg-dental-beige/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
