import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import React from 'react';

// Mock translations
vi.mock('@/translations/he', () => ({
  default: { testKey: 'עברית' }
}));

vi.mock('@/translations/en', () => ({
  default: { testKey: 'English' }
}));

vi.mock('@/translations/ru.json', () => ({
  default: { testKey: 'Русский' }
}));

vi.mock('@/translations/de.json', () => ({
  default: { testKey: 'Deutsch' }
}));

vi.mock('@/translations/ar.json', () => ({
  default: { testKey: 'العربية' }
}));

// Mock the direction utility
vi.mock('@/utils/direction', () => ({
  setupDirectionByLanguage: vi.fn()
}));

// Test component that uses the language context
const TestComponent = () => {
  const { t, language, isRTL } = useLanguage();
  return (
    <div>
      <div data-testid="translation">{t('testKey')}</div>
      <div data-testid="language">{language}</div>
      <div data-testid="rtl">{String(isRTL)}</div>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    // Mock local storage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // Mock navigator language
    Object.defineProperty(navigator, 'language', {
      get: () => 'en-US'
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('provides translation function through context', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('translation')).toHaveTextContent('עברית');
  });

  it('correctly reports RTL status for Hebrew', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    // Hebrew is RTL
    expect(screen.getByTestId('language')).toHaveTextContent('he');
    expect(screen.getByTestId('rtl')).toHaveTextContent('true');
  });
});
