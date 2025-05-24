
import { Language } from '@/types/language';

export interface MissingTranslationKey {
  key: string;
  missingInLanguages: Language[];
  usedInFiles: string[];
  category: string;
  priority: 'high' | 'medium' | 'low';
}

export interface TranslationAuditReport {
  totalKeysChecked: number;
  missingKeys: MissingTranslationKey[];
  completionByLanguage: Record<Language, number>;
  categorySummary: Record<string, number>;
}
