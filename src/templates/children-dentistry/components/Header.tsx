
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PhoneOutgoing, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to={`/${currentLanguage}`} className="block">
            <img 
              src="/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png" 
              alt={t('common.logoAlt')} 
              className="h-10 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('journey')}
              className="text-dental-navy hover:text-dental-orange transition-colors"
            >
              {t('childrenAdLanding.navigation.journey')}
            </button>
            <button 
              onClick={() => scrollToSection('doctor')}
              className="text-dental-navy hover:text-dental-orange transition-colors"
            >
              {t('childrenAdLanding.navigation.doctor')}
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-dental-navy hover:text-dental-orange transition-colors"
            >
              {t('childrenAdLanding.navigation.faq')}
            </button>
            <a 
              href="tel:03-566-6915" 
              className="flex items-center gap-2 text-dental-navy hover:text-dental-orange transition-colors"
            >
              <PhoneOutgoing size={16} />
              <span>03-566-6915</span>
            </a>
            <Button 
              onClick={() => scrollToSection('booking')}
              variant="orange"
              size="sm"
              className="rounded-full"
            >
              {t('bookNow')}
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-dental-navy p-1" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('common.closeMenu') : t('common.openMenu')}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-40 transition-transform duration-300 md:hidden",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="pt-20 px-6 flex flex-col gap-6">
          <button 
            onClick={() => scrollToSection('journey')}
            className="text-xl py-3 text-center border-b border-gray-100"
          >
            {t('childrenAdLanding.navigation.journey')}
          </button>
          <button 
            onClick={() => scrollToSection('doctor')}
            className="text-xl py-3 text-center border-b border-gray-100"
          >
            {t('childrenAdLanding.navigation.doctor')}
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="text-xl py-3 text-center border-b border-gray-100"
          >
            {t('childrenAdLanding.navigation.faq')}
          </button>
          <div className="mt-4 flex flex-col gap-4">
            <a 
              href="tel:03-566-6915" 
              className="flex items-center justify-center gap-2 py-3 text-dental-navy"
            >
              <PhoneOutgoing size={20} />
              <span>03-566-6915</span>
            </a>
            <Button 
              onClick={() => scrollToSection('booking')}
              variant="orange"
              size="lg"
              className="w-full rounded-full"
            >
              {t('bookNow')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
