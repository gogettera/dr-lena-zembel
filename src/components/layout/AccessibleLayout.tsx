import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import ScrollToTop from '../ui/scroll-to-top';

const AccessibleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <ScrollToTop />
      <AccessibilityWidget />
      <Footer />
    </div>
  );
};

export default AccessibleLayout;
