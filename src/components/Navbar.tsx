
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileNav from './MobileNav';
import LanguageSwitcher from './LanguageSwitcher';
import { createLocalizedNavigationConfig } from '@/config/navigation';
import { useDirectionalStyles } from '@/utils/direction';
import { debounce } from '@/utils/direction';
import { NAVIGATION_ANIMATIONS } from '@/styles/animation';
import NavigationLinks from './ui/NavigationLinks';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, isRTL } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);
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
        "py-4 px-4 md:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-white/80 shadow-lg backdrop-blur-md" : "bg-transparent"
      )} 
      role="navigation" 
      aria-label={t('mainNavigation', 'Main navigation')}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className={cn(
        "max-w-7xl mx-auto grid items-center",
        "grid-cols-3 md:grid-cols-3"
      )}>
        <div className="flex items-center justify-start">
          <MobileNav />
          <div className={cn("hidden md:flex items-center", styles.spaceDir)}>
            <NavigationLinks links={navigation.main} vertical={false} />
          </div>
        </div>

        <div className="flex justify-center">
          <Link 
            to={`/${language}`} 
            className={cn("transition-transform duration-300 hover:scale-105", NAVIGATION_ANIMATIONS.scaleHover)}
            aria-label={t('home', 'Home')}
          >
            <Logo />
          </Link>
        </div>

        <div className={cn("flex items-center justify-end space-x-2", styles.spaceDir)}>
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full hover:bg-dental-beige/20"
            asChild
          >
            <a 
              href={`tel:${t('clinicInfo.phone')}`}
              aria-label={t('call', 'Call')}
            >
              <Phone className="h-5 w-5 text-dental-navy" />
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
