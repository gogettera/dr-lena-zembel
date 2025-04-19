
import React from 'react';
import Logo from './Logo';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-8 md:mb-0">
            <Logo />
          </div>
          
          <div className="text-center md:text-right mb-8 md:mb-0">
            <h3 className="text-xl font-bold text-dental-navy mb-4">שעות פעילות</h3>
            <p className="text-dental-navy">ימים א'-ה': 9:00-19:00</p>
            <p className="text-dental-navy">יום ו': 9:00-13:00</p>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-dental-navy mb-4">צור קשר</h3>
            
            <div className="flex items-center justify-center md:justify-end mb-2">
              <span className="text-dental-navy ms-2">03-1234567</span>
              <Phone className="h-5 w-5 text-dental-orange" />
            </div>
            
            <div className="flex items-center justify-center md:justify-end mb-2">
              <span className="text-dental-navy ms-2">info@dental-love.co.il</span>
              <Mail className="h-5 w-5 text-dental-orange" />
            </div>
            
            <div className="flex items-center justify-center md:justify-end">
              <span className="text-dental-navy ms-2">רחוב הדנטל 123, תל אביב</span>
              <MapPin className="h-5 w-5 text-dental-orange" />
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} דנטל לאב. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
