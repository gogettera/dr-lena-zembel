
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Phone, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import MobileNav from './MobileNav';
import LanguageSwitcher from './LanguageSwitcher';
import { createLocalizedNavigationConfig, isActiveLink } from '@/config/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  const location = useLocation();
  const navigation = createLocalizedNavigationConfig(language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

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
      aria-label="Main navigation"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className={cn(
        "max-w-7xl mx-auto grid items-center",
        "grid-cols-3 md:grid-cols-3"
      )}>
        <div className="flex items-center justify-start">
          <MobileNav />
          <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.main.map((item) => (
                  <NavigationMenuItem key={item.key}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className={cn(
                          isActiveLink(location.pathname, item.path) ? 'text-dental-orange' : 'text-dental-navy'
                        )}>
                          {t(item.labelKey)}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.children.map((child) => (
                              <li key={child.key}>
                                <Link 
                                  to={child.path}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                    isActiveLink(location.pathname, child.path) 
                                      ? "bg-dental-beige/20 text-dental-orange" 
                                      : "hover:bg-dental-beige/10 hover:text-dental-orange"
                                  )}
                                >
                                  <div className="text-sm font-medium leading-none">{t(child.labelKey)}</div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link 
                        to={item.path}
                        className={cn(
                          "block select-none space-y-1 rounded-md px-4 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors",
                          isActiveLink(location.pathname, item.path) 
                            ? "text-dental-orange" 
                            : "text-dental-navy hover:text-dental-orange"
                        )}
                      >
                        {t(item.labelKey)}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex justify-center">
          <Link 
            to={`/${language}`} 
            className="transition-transform duration-300 hover:scale-105"
            aria-label={t('home')}
          >
            <Logo />
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
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
              aria-label={t('clinicInfo.phone')}
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
