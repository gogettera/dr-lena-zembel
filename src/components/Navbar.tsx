
import React, { useState } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: "#practice", label: "על המרפאה" },
    { href: "#team", label: "הצוות" },
    { href: "#patients", label: "למטופלים" },
    { href: "#contact", label: "צור קשר" }
  ];

  return (
    <nav className="py-3 px-4 md:px-8 bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="p-1 -ml-1 text-dental-navy hover:text-dental-orange transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex-1 flex justify-center md:justify-between items-center">
          <div className="hidden md:flex space-x-8 space-x-reverse">
            {menuItems.slice(0, 2).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-dental-navy hover:text-dental-orange transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          <Logo />

          <div className="hidden md:flex space-x-8 space-x-reverse">
            {menuItems.slice(2).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-dental-navy hover:text-dental-orange transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="md:hidden w-5" aria-hidden="true" />
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[57px] bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out border-b border-gray-100 md:hidden",
          isMenuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="px-4 py-3 space-y-3">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-dental-navy hover:text-dental-orange transition-colors text-sm font-medium text-right"
              onClick={toggleMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
