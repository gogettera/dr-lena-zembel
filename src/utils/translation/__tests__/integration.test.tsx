import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import HebrewText from '@/components/shared/HebrewText';
import React from 'react';

// Real implementation for Hebrew utils
vi.mock('@/utils/hebrewUtils', () => {
  const original = vi.importActual('@/utils/hebrewUtils');
  return {
    ...original,
    useHebrewText: () => ({
      getTextDirectionClass: () => 'text-right',
      isRTL: true,
      isHebrew: () => true,
      formatNumber: (n: number) => n.toString(),
      formatDate: (d: Date) => d.toString()
    })
  };
});

// Mock translations
const mockTranslations = {
  he: {
    greetings: {
      hello: 'שלום',
      welcome: 'ברוכים הבאים, {{name}}!'
    }
  },
  en: {
    greetings: {
      hello: 'Hello',
      welcome: 'Welcome, {{name}}!'
    }
  }
};

vi.mock('@/translations/he', () => ({
  default: mockTranslations.he
}));

vi.mock('@/translations/en', () => ({
  default: mockTranslations.en
}));

// Set default mocks for other language files
['ru', 'de', 'ar'].forEach(lang => {
  vi.mock(`@/translations/${lang}.json`, () => ({
    default: {}
  }));
});

// Mock the direction utility
vi.mock('@/utils/direction', () => ({
  setupDirectionByLanguage: vi.fn()
}));

// Test component that combines HebrewText and translations
const TranslatedGreeting = () => {
  const { t, language, setLanguage } = useLanguage();
  return (
    <div>
      <HebrewText tag="h1">{t('greetings.hello')}</HebrewText>
      <HebrewText>{t('greetings.welcome', { context: 'User' })}</HebrewText>
      <div>
        <button onClick={() => setLanguage('he')} data-testid="he-btn">Hebrew</button>
        <button onClick={() => setLanguage('en')} data-testid="en-btn">English</button>
      </div>
      <div data-testid="current-lang">{language}</div>
    </div>
  );
};

describe('Translation System Integration', () => {
  it('renders translations with proper RTL handling', () => {
    const { container } = render(
      <LanguageProvider>
        <TranslatedGreeting />
      </LanguageProvider>
    );

    // Check initial Hebrew state
    expect(screen.getByRole('heading')).toHaveTextContent('שלום');
    expect(container.textContent).toContain('ברוכים הבאים, User!');
    expect(screen.getByTestId('current-lang')).toHaveTextContent('he');

    // Switch to English
    fireEvent.click(screen.getByTestId('en-btn'));

    // Check English translations
    expect(screen.getByRole('heading')).toHaveTextContent('Hello');
    expect(container.textContent).toContain('Welcome, User!');
    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');

    // Back to Hebrew
    fireEvent.click(screen.getByTestId('he-btn'));
    expect(screen.getByRole('heading')).toHaveTextContent('שלום');
  });
});
