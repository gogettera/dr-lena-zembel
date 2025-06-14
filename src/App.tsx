
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LanguageRoute from '@/components/LanguageRoute';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import LanguageBotoxTreatmentsPage from '@/pages/LanguageBotoxTreatmentsPage';
import LanguageTreatmentPage from '@/pages/LanguageTreatmentPage';
import PreventiveMedicinePage from '@/pages/PreventiveMedicinePage';
import NotFound from '@/pages/NotFound';
import { getBrowserLanguage } from '@/utils/languageRoutes';
import Index from '@/pages/Index';
import ChildrenDentistryLanding from '@/components/children-dentistry/ChildrenDentistryLanding';
import AestheticTreatmentsLanding from '@/components/aesthetic-treatments/AestheticTreatmentsLanding';
import OrthodonticsLanding from '@/components/orthodontics/OrthodonticsLanding';
import RootCanalLanding from '@/components/root-canal/RootCanalLanding';
import OralRehabilitationLanding from '@/components/oral-rehabilitation/OralRehabilitationLanding';
import PreventiveMedicineLanding from '@/components/preventive-medicine/PreventiveMedicineLanding';
import AdminDashboard from '@/pages/admin/index';
import TranslationsAdminPage from '@/pages/admin/TranslationsAdminPage';
import TranslationAuditPage from '@/pages/admin/TranslationAuditPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Root path - redirect to browser language */}
        <Route path="/" element={<Navigate to={`/${getBrowserLanguage()}`} replace />} />
        
        {/* Direct root path handler - alternative to above */}
        <Route index element={<Index />} />

        {/* Language routes */}
        <Route path="/:lang" element={<LanguageRoute />}>
          <Route element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-16">
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="treatments/botox-treatments" element={<LanguageBotoxTreatmentsPage />} />
                  
                  {/* Dedicated treatment landing pages */}
                  <Route path="treatments/children-dentistry/landing" element={
                    <div className="bg-white">
                      <ChildrenDentistryLanding />
                    </div>
                  } />
                  <Route path="treatments/children-dentistry" element={
                    <div className="bg-white">
                      <ChildrenDentistryLanding />
                    </div>
                  } />
                  <Route path="treatments/aesthetic-treatments/landing" element={
                    <div className="bg-white">
                      <AestheticTreatmentsLanding />
                    </div>
                  } />
                  <Route path="treatments/orthodontics/landing" element={
                    <div className="bg-white">
                      <OrthodonticsLanding />
                    </div>
                  } />
                  <Route path="treatments/root-canal/landing" element={
                    <div className="bg-white">
                      <RootCanalLanding />
                    </div>
                  } />
                  <Route path="treatments/oral-rehabilitation/landing" element={
                    <div className="bg-white">
                      <OralRehabilitationLanding />
                    </div>
                  } />
                  <Route path="treatments/preventive-medicine/landing" element={
                    <div className="bg-white">
                      <PreventiveMedicineLanding />
                    </div>
                  } />
                  
                  {/* Tab-based treatment pages */}
                  <Route path="treatments/:treatmentType" element={<LanguageTreatmentPage />} />
                  <Route path="treatments/preventive-medicine" element={<PreventiveMedicinePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/translations" element={<TranslationsAdminPage />} />
        <Route path="/admin/audit-results" element={<TranslationAuditPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
