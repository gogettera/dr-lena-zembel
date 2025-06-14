
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

// Simple layout wrapper component
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow pt-16">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Root path - redirect to browser language */}
        <Route path="/" element={<Navigate to={`/${getBrowserLanguage()}`} replace />} />
        
        {/* Direct root path handler */}
        <Route index element={<Index />} />

        {/* Language routes */}
        <Route path="/:lang/*" element={<LanguageRoute />}>
          <Route path="" element={<PageLayout><HomePage /></PageLayout>} />
          <Route path="about" element={<PageLayout><AboutPage /></PageLayout>} />
          <Route path="contact" element={<PageLayout><ContactPage /></PageLayout>} />
          
          {/* Botox treatments */}
          <Route path="treatments/botox-treatments" element={<PageLayout><LanguageBotoxTreatmentsPage /></PageLayout>} />
          
          {/* Dedicated treatment landing pages */}
          <Route path="treatments/children-dentistry" element={<PageLayout><ChildrenDentistryLanding /></PageLayout>} />
          <Route path="treatments/aesthetic-treatments/landing" element={<PageLayout><AestheticTreatmentsLanding /></PageLayout>} />
          <Route path="treatments/orthodontics/landing" element={<PageLayout><OrthodonticsLanding /></PageLayout>} />
          <Route path="treatments/root-canal/landing" element={<PageLayout><RootCanalLanding /></PageLayout>} />
          <Route path="treatments/oral-rehabilitation/landing" element={<PageLayout><OralRehabilitationLanding /></PageLayout>} />
          <Route path="treatments/preventive-medicine/landing" element={<PageLayout><PreventiveMedicineLanding /></PageLayout>} />
          
          {/* Generic treatment pages */}
          <Route path="treatments/:treatmentType" element={<PageLayout><LanguageTreatmentPage /></PageLayout>} />
          <Route path="treatments/preventive-medicine" element={<PageLayout><PreventiveMedicinePage /></PageLayout>} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
