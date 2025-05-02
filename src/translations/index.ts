
// Main translation indexes
import heCommon from './he/common.json';
import heTranslations from './he/treatments.json';
import heNavigation from './he/navigation.json';
import heAestheticTreatments from './he/aestheticTreatments.json';
import heOrthodontics from './he/orthodontics.json';
import heRootCanal from './he/rootCanal.json';
import heChildrenDentistry from './he/childrenDentistry.json';
import heAbout from './he/about.json';
import heClinic from './he/clinic.json';
import heContact from './he/contact.json';
import heInfo from './he/info.json';
import heTestimonials from './he/testimonials.json';
import heAccessibility from './he/accessibility.json';
import heLegal from './he/legal.json';
import heBotoxTreatments from './he/botoxTreatments.json';

import enCommon from './en/common.json';
import enTranslations from './en/treatments.json';
import enNavigation from './en/navigation.json';
import enAestheticTreatments from './en/aestheticTreatments.json';
import enBotoxTreatments from './en/botoxTreatments.json';
import enOrthodontics from './en/orthodontics.json';
import enRootCanal from './en/rootCanal.json';
import enChildrenDentistry from './en/childrenDentistry.json';
import enAbout from './en/about.json';
import enClinic from './en/clinic.json';
import enContact from './en/contact.json';
import enInfo from './en/info.json';
import enTestimonials from './en/testimonials.json';
import enAccessibility from './en/accessibility.json';
import enLegal from './en/legal.json';

import arCommon from './ar/common.json';
// Arabic doesn't have navigation.json, using common instead
import ruCommon from './ru/common.json';
import ruNavigation from './ru/navigation.json';
import deCommon from './de/common.json';
// German doesn't have navigation.json, using common instead

// Export translations with proper namespaces
export default {
  he: {
    common: heCommon,
    treatments: heTranslations,
    navigation: heNavigation,
    aestheticTreatments: heAestheticTreatments,
    orthodontics: heOrthodontics,
    rootCanal: heRootCanal,
    childrenDentistry: heChildrenDentistry,
    about: heAbout,
    clinic: heClinic,
    contact: heContact,
    info: heInfo,
    testimonials: heTestimonials,
    accessibility: heAccessibility,
    legal: heLegal,
    botoxTreatments: heBotoxTreatments
  },
  en: {
    common: enCommon,
    treatments: enTranslations,
    navigation: enNavigation,
    aestheticTreatments: enAestheticTreatments,
    botoxTreatments: enBotoxTreatments,
    orthodontics: enOrthodontics,
    rootCanal: enRootCanal,
    childrenDentistry: enChildrenDentistry,
    about: enAbout,
    clinic: enClinic,
    contact: enContact,
    info: enInfo,
    testimonials: enTestimonials,
    accessibility: enAccessibility,
    legal: enLegal
  },
  ar: {
    common: arCommon,
    navigation: arCommon  // Use common as a fallback since navigation doesn't exist
  },
  ru: {
    common: ruCommon,
    navigation: ruNavigation
  },
  de: {
    common: deCommon,
    navigation: deCommon  // Use common as a fallback since navigation doesn't exist
  },
};
