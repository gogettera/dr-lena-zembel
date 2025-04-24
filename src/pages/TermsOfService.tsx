
import React from 'react';
import LegalPage from '@/components/legal/LegalPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';

const TermsOfService = () => {
  return (
    <div>
      <Navbar />
      <main>
        <LegalPage translationKey="termsOfService" />
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
