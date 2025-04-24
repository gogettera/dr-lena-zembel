
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import ScrollToTop from '../ui/scroll-to-top';

/**
 * AccessibleLayout - Main layout component that provides:
 * - Navigation header
 * - Footer
 * - Accessibility features
 * - Scroll to top functionality
 */
const AccessibleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
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
