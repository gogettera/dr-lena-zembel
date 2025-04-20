
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Add useLocation to the import
import Logo from './Logo';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { createLocalizedPath } from '@/utils/languageRoutes';
import MobileNav from './MobileNav';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation(); // Use useLocation hook
  const isRTL = language === 'he' || language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "py-4 px-4 md:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled 
        ? "bg-white/80 shadow-lg backdrop-blur-md" 
        : "bg-transparent"
    )} role="navigation" aria-label="Main navigation">
      <div className={cn(
        "max-w-7xl mx-auto grid items-center",
        "grid-cols-3 md:grid-cols-3",
      )}>
        <div className="flex items-center justify-start space-x-2">
          <MobileNav />
          <LanguageSwitcher />
        </div>

        <div className="flex justify-center">
          <Link 
            to={createLocalizedPath(language, '/')} 
            className="transition-transform duration-300 hover:scale-105"
            aria-label={t('home')}
          >
            <Logo />
          </Link>
        </div>

        <div className="flex items-center justify-end">
          <Button 
            variant="orange" 
            size="sm" 
            className="rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
            asChild
          >
            <a href={`tel:${t('phoneNumber')}`} dir={isRTL ? 'rtl' : 'ltr'} aria-label={t('phoneNumber')}>
              <Phone className="h-4 w-4" />
              <span>{t('phoneNumber')}</span>
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
