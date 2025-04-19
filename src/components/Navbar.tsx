
import React, { useState } from 'react';
import Logo from './Logo';
import { Menu, X, Home, Users, User, Phone } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="py-4 px-6 md:px-12 bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center">
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden md:flex space-x-8 space-x-reverse">
          <a href="#practice" className="flex items-center text-dental-navy hover:text-dental-orange transition-colors font-medium">
            <span className="ml-1">על המרפאה</span>
            <Home className="h-4 w-4" />
          </a>
          <a href="#team" className="flex items-center text-dental-navy hover:text-dental-orange transition-colors font-medium">
            <span className="ml-1">הצוות</span>
            <Users className="h-4 w-4" />
          </a>
        </div>

        <div className="flex-1 flex justify-center">
          <Logo />
        </div>

        <div className="hidden md:flex space-x-8 space-x-reverse">
          <a href="#patients" className="flex items-center text-dental-navy hover:text-dental-orange transition-colors font-medium">
            <span className="ml-1">למטופלים</span>
            <User className="h-4 w-4" />
          </a>
          <a href="#contact" className="flex items-center text-dental-navy hover:text-dental-orange transition-colors font-medium">
            <span className="ml-1">צור קשר</span>
            <Phone className="h-4 w-4" />
          </a>
        </div>

        <div className="md:hidden">
          {/* Empty div for flex spacing */}
          <div className="w-6"></div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 flex flex-col space-y-4 border-t border-gray-200 pt-4">
          <a 
            href="#practice" 
            className="flex items-center justify-end text-dental-navy hover:text-dental-orange transition-colors font-medium text-right"
            onClick={toggleMenu}
          >
            <span className="ml-2">על המרפאה</span>
            <Home className="h-4 w-4" />
          </a>
          <a 
            href="#team" 
            className="flex items-center justify-end text-dental-navy hover:text-dental-orange transition-colors font-medium text-right"
            onClick={toggleMenu}
          >
            <span className="ml-2">הצוות</span>
            <Users className="h-4 w-4" />
          </a>
          <a 
            href="#patients" 
            className="flex items-center justify-end text-dental-navy hover:text-dental-orange transition-colors font-medium text-right"
            onClick={toggleMenu}
          >
            <span className="ml-2">למטופלים</span>
            <User className="h-4 w-4" />
          </a>
          <a 
            href="#contact" 
            className="flex items-center justify-end text-dental-navy hover:text-dental-orange transition-colors font-medium text-right"
            onClick={toggleMenu}
          >
            <span className="ml-2">צור קשר</span>
            <Phone className="h-4 w-4" />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
