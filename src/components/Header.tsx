
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { TranslatedText } from './ui/translated-text';
import { createLocalizedNavigationConfig } from '@/config/navigationConfig';
import NavigationLinks from './ui/NavigationLinks';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, isRTL } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 shadow-lg backdrop-blur-sm" : "bg-transparent"
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={`/${language}`} className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationLinks links={navigation.main} />
          </nav>

          {/* Right Side Actions */}
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            {/* Phone Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="hidden sm:flex"
              asChild
            >
              <a href="tel:035666915">
                <Phone className="w-4 h-4 mr-2" />
                <TranslatedText textKey="common.call" />
              </a>
            </Button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <NavigationLinks 
                links={navigation.main} 
                vertical 
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
              
              <div className="pt-4 border-t border-gray-200">
                <Button 
                  variant="orange" 
                  className="w-full"
                  asChild
                >
                  <a href="tel:035666915">
                    <Phone className="w-4 h-4 mr-2" />
                    <TranslatedText textKey="common.call" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
