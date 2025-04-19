
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { createLocalizedPath } from '@/utils/languageRoutes';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const menuItems = [
    { href: "#treatments", label: t("treatments") },
    { href: "#patients", label: t("patients") },
    { href: "#team", label: t("team") },
    { href: "#contact", label: t("contact") }
  ];

  const isRTL = language === 'he' || language === 'ar';

  return (
    <nav className={cn(
      "py-2 px-4 md:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 shadow-md backdrop-blur-sm" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        <div className="flex items-center justify-start">
          <LanguageSwitcher />
        </div>

        <div className="flex justify-center">
          <Link to={createLocalizedPath(language, '/')}>
            <Logo />
          </Link>
        </div>

        <div className="flex items-center justify-end">
          <div className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-dental-navy hover:text-dental-orange transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <Button variant="orange" size="sm" className="rounded-full shadow-md flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{t('bookVisit')}</span>
            </Button>
          </div>

          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2 rounded-full bg-dental-beige/50 text-dental-navy hover:bg-dental-beige transition-colors"
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div 
        className={cn(
          "fixed inset-x-0 top-[57px] bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden",
          isMenuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block text-dental-navy hover:text-dental-orange transition-colors text-lg font-medium ${isRTL ? 'text-right' : 'text-left'}`}
                onClick={toggleMenu}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <Button variant="orange" className="w-full rounded-full shadow-md flex items-center justify-center gap-2 mt-2">
                <Phone className="h-4 w-4" />
                <span>{t('bookVisit')}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
