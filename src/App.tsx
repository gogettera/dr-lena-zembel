
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import AccessibleLayout from '@/components/layout/AccessibleLayout';
import Index from '@/pages/Index';
import LanguageHome from '@/pages/LanguageHome';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import LanguageTreatmentPage from '@/pages/LanguageTreatmentPage';
import BotoxTreatmentsPage from '@/pages/BotoxTreatmentsPage';
import PreventiveMedicinePage from '@/pages/PreventiveMedicinePage';
import AccessibilityStatementPage from '@/pages/AccessibilityStatementPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Index />} />
          
          {/* Language-specific routes */}
          <Route path="/:lang" element={
            <AccessibleLayout>
              <LanguageHome />
            </AccessibleLayout>
          } />
          
          <Route path="/:lang/about" element={
            <AccessibleLayout>
              <AboutPage />
            </AccessibleLayout>
          } />
          
          <Route path="/:lang/contact" element={
            <AccessibleLayout>
              <ContactPage />
            </AccessibleLayout>
          } />
          
          <Route path="/:lang/treatments/:treatmentType" element={
            <AccessibleLayout>
              <LanguageTreatmentPage />
            </AccessibleLayout>
          } />
          
          <Route path="/:lang/treatments/:treatmentType/:subpage" element={
            <AccessibleLayout>
              <LanguageTreatmentPage />
            </AccessibleLayout>
          } />
          
          <Route path="/:lang/treatments/botox-treatments" element={
            <AccessibleLayout>
              <BotoxTreatmentsPage />
            </AccessibleLayout>
          } />
          
          <Route path="/:lang/preventive-medicine" element={
            <AccessibleLayout>
              <PreventiveMedicinePage />
            </AccessibleLayout>
          } />
          
          <Route path="/:lang/accessibility-statement" element={
            <AccessibleLayout>
              <AccessibilityStatementPage />
            </AccessibleLayout>
          } />
          
          <Route path="/:lang/privacy-policy" element={
            <AccessibleLayout>
              <PrivacyPolicy />
            </AccessibleLayout>
          } />
          
          <Route path="/:lang/terms-of-service" element={
            <AccessibleLayout>
              <TermsOfService />
            </AccessibleLayout>
          } />
          
          {/* Simple fallback routes for compatibility */}
          <Route path="/about" element={
            <AccessibleLayout>
              <AboutPage />
            </AccessibleLayout>
          } />
          
          <Route path="/contact" element={
            <AccessibleLayout>
              <ContactPage />
            </AccessibleLayout>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;
