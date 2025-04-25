
import { TranslationModule, TranslationModules } from './types';

// Combines translations from multiple files into one object
export const combineTranslations = (translationModules: TranslationModules) => {
  const combined: Record<string, any> = {};
  
  for (const [key, module] of Object.entries(translationModules)) {
    if (typeof module === 'object') {
      combined[key] = module;
    }
  }
  
  return combined;
};

// Helper to load translations asynchronously
export const loadModularTranslations = async (
  modules: string[],
  language: string
): Promise<TranslationModule> => {
  const translations: Record<string, any> = {};
  
  await Promise.all(
    modules.map(async (module) => {
      try {
        const moduleData = await import(`../../translations/${language}/${module}.json`);
        translations[module] = moduleData.default || moduleData;
      } catch (error) {
        console.warn(`Failed to load ${module} translations for ${language}`);
      }
    })
  );
  
  return translations;
};
