
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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isRTL = language === 'he' || language === 'ar';

  return (
    <nav className={cn(
      "py-4 px-4 md:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled 
        ? "bg-white/80 shadow-lg backdrop-blur-md" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        <div className="flex items-center justify-start">
          <LanguageSwitcher />
        </div>

        <div className="flex justify-center">
          <Link to={createLocalizedPath(language, '/')} className="transition-transform duration-300 hover:scale-105">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center justify-end">
          <Button 
            variant="orange" 
            size="sm" 
            className="rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            <span>03-566-6915</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
