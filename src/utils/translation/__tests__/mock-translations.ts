
import { Language } from '@/types/language';

// Mock translations for testing
export const mockTranslations: Record<Language, Record<string, any>> = {
  he: {
    common: {
      hello: 'שלום',
      welcome: 'ברוך הבא, {{name}}',
      nested: {
        key: 'ערך מקונן',
        deeper: {
          value: 'ערך עמוק יותר'
        }
      }
    },
    missing: {
      inEnglish: 'קיים בעברית בלבד'
    }
  },
  en: {
    common: {
      hello: 'Hello',
      welcome: 'Welcome, {{name}}',
      nested: {
        key: 'Nested value',
        deeper: {
          value: 'Deeper value'
        }
      }
    }
  },
  ru: {
    common: {
      hello: 'Привет'
    }
  },
  de: {
    common: {
      hello: 'Hallo'
    }
  },
  ar: {
    common: {
      hello: 'مرحبا'
    }
  }
};
