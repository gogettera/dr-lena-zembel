import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TranslationExample from '@/components/examples/TranslationExample';
import { LanguageProvider } from '@/contexts/LanguageContext';
import React from 'react';

// Mock the useHebrewText hook
vi.mock('@/utils/hebrewUtils', () => ({
  useHebrewText: () => ({
    formatNumber: (n: number) => `${n}`,
    formatDate: () => '2023-05-01',
    getTextDirectionClass: () => 'text-right',
    isRTL: true,
    isHebrew: () => true
  })
}));

// Mock the translations
vi.mock('@/contexts/LanguageContext', async () => {
  const actual = await vi.importActual('@/contexts/LanguageContext');
  return {
    ...actual,
    useLanguage: () => ({
      t: (key: string, options?: any) => {
        const translations: Record<string, any> = {
          'common.clinicDescription': 'מרפאת השיניים המקצועית',
          'common.dentistryWithLove': 'רפואת שיניים מקצועית',
          'treatments.patientExperiences': 'חוויות מטופלים',
          'info.doctorInfo.name': 'ד"ר לנה זמבל',
          'info.doctorInfo.title': 'רופאת שיניים מומחית',
          'info.doctorInfo.education': 'בוגרת הפקולטה לרפואת שיניים'
        };

        if (key === 'info.doctorInfo' && options?.returnObjects) {
          return {
            name: 'ד"ר לנה זמבל',
            title: 'רופאת שיניים מומחית',
            education: 'בוגרת הפקולטה לרפואת שיניים'
          };
        }
        
        return translations[key] || key;
      },
      language: 'he',
      isRTL: true,
      setLanguage: vi.fn(),
      availableLanguages: ['he', 'en', 'ru', 'de', 'ar']
    })
  };
});

describe('TranslationExample', () => {
  it('renders correctly with translations', () => {
    render(
      <LanguageProvider>
        <TranslationExample />
      </LanguageProvider>
    );
    
    // Check that key translations appear
    expect(screen.getByText('מרפאת השיניים המקצועית')).toBeInTheDocument();
    expect(screen.getByText('רפואת שיניים מקצועית')).toBeInTheDocument();
    expect(screen.getByText('ד"ר לנה זמבל')).toBeInTheDocument();
    expect(screen.getByText('רופאת שיניים מומחית')).toBeInTheDocument();
    expect(screen.getByText('בוגרת הפקולטה לרפואת שיניים')).toBeInTheDocument();
    
    // Check that formatted date and numbers are present
    expect(screen.getByText(/חוויות מטופלים/)).toBeInTheDocument();
    expect(screen.getByText(/1250/)).toBeInTheDocument();
    expect(screen.getByText(/2023-05-01/)).toBeInTheDocument();
  });
});
