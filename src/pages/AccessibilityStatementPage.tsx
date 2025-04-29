
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';
import AccessibilityStatement from '@/components/AccessibilityStatement';
import BackToTop from '@/components/BackToTop';

const AccessibilityStatementPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <AccessibilityStatement />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default AccessibilityStatementPage;
