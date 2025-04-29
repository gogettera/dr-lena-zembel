
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import MobileNav from './MobileNav';
import LanguageSwitcher from './LanguageSwitcher';
import { getMainNavigationItems } from '@/config/routes';
import { useDirectionalStyles } from '@/utils/direction';
import { debounce } from '@/utils/direction';
import { NAVIGATION_ANIMATIONS } from '@/styles/animation';
import NavigationLinks from './ui/NavigationLinks';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, isRTL } = useLanguage();
  const navigationItems = getMainNavigationItems(language);
  const styles = useDirectionalStyles();

  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 10);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "py-3 px-4 md:px-6 fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-white/80 shadow-lg backdrop-blur-md" : "bg-transparent"
      )}
      role="navigation"
      aria-label={t('mainNavigation', 'Main navigation')}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* First section - Phone + Language (right in RTL, left in LTR) */}
        <div className={cn(
          "flex items-center gap-2",
          isRTL ? "order-3" : "order-1"
        )}>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-dental-beige/20 hidden md:flex"
            asChild
          >
            <a 
              href={`tel:${t('clinicInfo.phone')}`}
              aria-label={t('call', 'Call')}
            >
              <Phone className="h-5 w-5 text-dental-navy" />
            </a>
          </Button>
          <LanguageSwitcher />
          <MobileNav />
        </div>

        {/* Center section - Logo */}
        <div className={cn(
          "flex justify-center flex-1",
          isRTL ? "order-2" : "order-2"
        )}>
          <Link 
            to={`/${language}`}
            className={cn(
              "transition-transform duration-300 hover:scale-105",
              NAVIGATION_ANIMATIONS.scaleHover
            )}
            aria-label={t('home', 'Home')}
          >
            <Logo />
          </Link>
        </div>

        {/* Third section - Navigation links (left in RTL, right in LTR) */}
        <div className={cn(
          "hidden md:flex",
          isRTL ? "order-1 justify-end" : "order-3 justify-start",
          "flex-1"
        )}>
          <NavigationLinks 
            links={navigationItems} 
            vertical={false}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
