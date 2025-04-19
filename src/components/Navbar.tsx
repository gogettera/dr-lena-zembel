
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const menuItems = [
    { href: "#practice", label: "המרפאה שלנו" },
    { href: "#team", label: "המלצות" },
    { href: "#patients", label: "למטופלים" },
    { href: "#treatments", label: "טיפולים" },
    { href: "#contact", label: "צור קשר" }
  ];

  return (
    <nav className={cn(
      "py-2 px-4 md:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 shadow-md backdrop-blur-sm" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />

        <div className="hidden md:flex space-x-8 space-x-reverse">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-dental-navy hover:text-dental-orange transition-colors text-sm font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:right-0 after:bg-dental-orange after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex">
          <Button variant="orange" size="sm" className="rounded-full shadow-md flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>לתיאום ביקור</span>
          </Button>
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="p-2 rounded-full bg-dental-beige/50 text-dental-navy hover:bg-dental-beige transition-colors"
            aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
                className="block text-dental-navy hover:text-dental-orange transition-colors text-lg font-medium text-right"
                onClick={toggleMenu}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <Button variant="orange" className="w-full rounded-full shadow-md flex items-center justify-center gap-2 mt-2">
                <Phone className="h-4 w-4" />
                <span>לתיאום ביקור</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
