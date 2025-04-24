
import React from 'react';
import LegalPage from '@/components/legal/LegalPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar />
      <main>
        <LegalPage translationKey="privacyPolicy" />
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
