
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider";
import { ScrollToTopButton } from './components/ui/scroll-to-top-button';
import { Toaster } from "@/components/ui/toaster"
import { useLanguage } from '@/contexts/LanguageContext';
import { ResourcePrefetcher } from './components/resource-prefetcher';
import { siteConfig } from './config/site';
import { languages } from './config/i18n';

// Import page components
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TreatmentsPage from "./pages/TreatmentsPage";
import AestheticTreatmentsPage from "./pages/AestheticTreatmentsPage";
import ContactPage from "./pages/ContactPage";
import AccessibilityStatementPage from "./pages/AccessibilityStatementPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import InfoPage from "./pages/InfoPage";
import ChildrenDentistryLanding from "./components/children-dentistry/ChildrenDentistryLanding";
import OralRehabilitationPage from "./pages/OralRehabilitationPage";
import OrthodonticsPage from "./pages/OrthodonticsPage";
import RootCanalPage from "./pages/RootCanalPage";
import BotoxTreatmentsPage from "./pages/BotoxTreatmentsPage";
import ClinicPage from "./pages/ClinicPage";
import ChildrenDentistryAdLandingPage from "./pages/ChildrenDentistryAdLandingPage";

function App() {
  const { language } = useLanguage();
  
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const location = useLocation();

  useEffect(() => {
    // Log the page view to GA
  }, [location]);

  return (
    <Router>
      <ThemeProvider>
        <ResourcePrefetcher resources={languages.map(lang => `/locales/${lang}.json`)}>
          <ScrollToTopButton />
          <Routes>
            {/* Home routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/he" element={<HomePage />} />
            <Route path="/en" element={<HomePage />} />
            <Route path="/de" element={<HomePage />} />

            {/* Regular routes */}
            <Route path="/he/about" element={<AboutPage />} />
            <Route path="/en/about" element={<AboutPage />} />
            <Route path="/de/about" element={<AboutPage />} />

            <Route path="/he/treatments" element={<TreatmentsPage />} />
            <Route path="/en/treatments" element={<TreatmentsPage />} />
            <Route path="/de/treatments" element={<TreatmentsPage />} />

            <Route path="/he/aesthetic-treatments" element={<AestheticTreatmentsPage />} />
            <Route path="/en/aesthetic-treatments" element={<AestheticTreatmentsPage />} />
            <Route path="/de/aesthetic-treatments" element={<AestheticTreatmentsPage />} />

            <Route path="/he/contact" element={<ContactPage />} />
            <Route path="/en/contact" element={<ContactPage />} />
            <Route path="/de/contact" element={<ContactPage />} />

            <Route path="/he/accessibility-statement" element={<AccessibilityStatementPage />} />
            <Route path="/en/accessibility-statement" element={<AccessibilityStatementPage />} />
            <Route path="/de/accessibility-statement" element={<AccessibilityStatementPage />} />

            <Route path="/he/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/en/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/de/privacy-policy" element={<PrivacyPolicyPage />} />

            <Route path="/he/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/en/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/de/terms-of-service" element={<TermsOfServicePage />} />

            <Route path="/he/info" element={<InfoPage />} />
            <Route path="/en/info" element={<InfoPage />} />
            <Route path="/de/info" element={<InfoPage />} />
            
            <Route path="/he/children-dentistry" element={<ChildrenDentistryLanding />} />
            <Route path="/en/children-dentistry" element={<ChildrenDentistryLanding />} />
            <Route path="/de/children-dentistry" element={<ChildrenDentistryLanding />} />

            <Route path="/he/oral-rehabilitation" element={<OralRehabilitationPage />} />
            <Route path="/en/oral-rehabilitation" element={<OralRehabilitationPage />} />
            <Route path="/de/oral-rehabilitation" element={<OralRehabilitationPage />} />

            <Route path="/he/orthodontics" element={<OrthodonticsPage />} />
            <Route path="/en/orthodontics" element={<OrthodonticsPage />} />
            <Route path="/de/orthodontics" element={<OrthodonticsPage />} />

            <Route path="/he/root-canal" element={<RootCanalPage />} />
            <Route path="/en/root-canal" element={<RootCanalPage />} />
            <Route path="/de/root-canal" element={<RootCanalPage />} />

            <Route path="/he/botox-treatments" element={<BotoxTreatmentsPage />} />
            <Route path="/en/botox-treatments" element={<BotoxTreatmentsPage />} />
            <Route path="/de/botox-treatments" element={<BotoxTreatmentsPage />} />

            <Route path="/he/clinic" element={<ClinicPage />} />
            <Route path="/en/clinic" element={<ClinicPage />} />
            <Route path="/de/clinic" element={<ClinicPage />} />
            
            {/* Add the new route for children dentistry ad landing page */}
            <Route path="/he/ad/children-dentistry" element={<ChildrenDentistryAdLandingPage />} />
          </Routes>
        
          <Toaster />
        </ResourcePrefetcher>
      </ThemeProvider>
    </Router>
  );
}

export default App;
