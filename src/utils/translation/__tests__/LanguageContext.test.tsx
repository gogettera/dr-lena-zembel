
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
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
  const { t, language, setLanguage, isRTL } = useLanguage();
  return (
    <div>
      <div data-testid="translation">{t('testKey')}</div>
      <div data-testid="language">{language}</div>
      <div data-testid="rtl">{String(isRTL)}</div>
      <button onClick={() => setLanguage('en')} data-testid="switch-en">Switch to English</button>
      <button onClick={() => setLanguage('he')} data-testid="switch-he">Switch to Hebrew</button>
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

  it('allows changing language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    // Default is Hebrew
    expect(screen.getByTestId('language')).toHaveTextContent('he');
    
    // Switch to English
    fireEvent.click(screen.getByTestId('switch-en'));
    
    // Should now be in English
    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('translation')).toHaveTextContent('English');
  });

  it('correctly reports RTL status', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    // Hebrew is RTL
    expect(screen.getByTestId('language')).toHaveTextContent('he');
    expect(screen.getByTestId('rtl')).toHaveTextContent('true');
    
    // English is not RTL
    fireEvent.click(screen.getByTestId('switch-en'));
    expect(screen.getByTestId('rtl')).toHaveTextContent('false');
    
    // Back to Hebrew
    fireEvent.click(screen.getByTestId('switch-he'));
    expect(screen.getByTestId('rtl')).toHaveTextContent('true');
  });

  it('initializes with stored language preference', () => {
    // Set mock to return 'en' from localStorage
    window.localStorage.getItem = vi.fn().mockReturnValue('en');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    // Should initialize with English instead of default Hebrew
    expect(screen.getByTestId('language')).toHaveTextContent('en');
  });
});
