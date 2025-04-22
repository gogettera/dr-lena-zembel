
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import { LanguageProvider } from '@/contexts/LanguageContext';

interface AccessibleLayoutProps {
  children: React.ReactNode;
}

const AccessibleLayout: React.FC<AccessibleLayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      {children}
      <AccessibilityWidget />
      <Toaster />
    </LanguageProvider>
  );
};

export default AccessibleLayout;
