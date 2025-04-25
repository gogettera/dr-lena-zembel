
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import TreatmentsPage from '@/pages/TreatmentsPage';
import RootCanalPage from '@/pages/RootCanalPage';
import ChildrenDentistryPage from '@/pages/ChildrenDentistryPage';
import OrthodonticsPage from '@/pages/OrthodonticsPage';
import BotoxTreatmentsPage from '@/pages/BotoxTreatmentsPage';
import PreventiveMedicinePage from '@/pages/PreventiveMedicinePage';
import AestheticTreatmentsPage from '@/pages/AestheticTreatmentsPage';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageRoute from '@/components/LanguageRoute';
import LanguageBotoxTreatmentsPage from '@/pages/LanguageBotoxTreatmentsPage';
import { getBrowserLanguage } from '@/utils/languageRoutes';

function App() {
  return (
    <LanguageProvider>
      <Routes>
        {/* Default redirect to browser language */}
        <Route path="/" element={<Navigate to={`/${getBrowserLanguage()}`} replace />} />

        {/* Language routes */}
        <Route path="/:lang" element={<LanguageRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="treatments" element={<TreatmentsPage />} />
            <Route path="treatments/root-canal" element={<RootCanalPage />} />
            <Route path="treatments/children-dentistry" element={<ChildrenDentistryPage />} />
            <Route path="treatments/orthodontics" element={<OrthodonticsPage />} />
            <Route path="treatments/botox-treatments" element={<LanguageBotoxTreatmentsPage />} />
            <Route path="treatments/preventive-medicine" element={<PreventiveMedicinePage />} />
            <Route path="treatments/aesthetic-treatments" element={<AestheticTreatmentsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>

        {/* Legacy direct routes (for backward compatibility) */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/treatments" element={<TreatmentsPage />} />
          <Route path="/treatments/root-canal" element={<RootCanalPage />} />
          <Route path="/treatments/children-dentistry" element={<ChildrenDentistryPage />} />
          <Route path="/treatments/orthodontics" element={<OrthodonticsPage />} />
          <Route path="/treatments/botox-treatments" element={<BotoxTreatmentsPage />} />
          <Route path="/treatments/preventive-medicine" element={<PreventiveMedicinePage />} />
          <Route path="/treatments/aesthetic-treatments" element={<AestheticTreatmentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}

export default App;
