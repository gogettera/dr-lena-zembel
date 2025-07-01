import { orthodonticsContent } from './orthodontics';
import { TreatmentContent } from '../treatmentContent';

// Export all treatment content
export const treatmentContents: Record<string, TreatmentContent> = {
  'orthodontics': orthodonticsContent,
  // Other treatments will continue to use the main treatmentContent.ts for now
};

export const getTreatmentContentFromFiles = (slug: string): TreatmentContent | null => {
  return treatmentContents[slug] || null;
};
