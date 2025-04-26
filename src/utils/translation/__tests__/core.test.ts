
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getNestedProperty, createTranslationFunction } from '../core';
import { mockTranslations } from './mock-translations';
import { Language } from '@/types/language';

describe('getNestedProperty', () => {
  const testObj = {
    level1: {
      level2: {
        level3: 'deep value'
      },
      array: [1, 2, 3]
    },
    simple: 'simple value'
  };

  it('should return a simple value', () => {
    expect(getNestedProperty(testObj, 'simple')).toBe('simple value');
  });

  it('should return a nested value', () => {
    expect(getNestedProperty(testObj, 'level1.level2.level3')).toBe('deep value');
  });

  it('should return default value when path does not exist', () => {
    expect(getNestedProperty(testObj, 'nonexistent', 'default')).toBe('default');
  });

  it('should handle null or undefined objects', () => {
    expect(getNestedProperty(null as any, 'key', 'default')).toBe('default');
    expect(getNestedProperty(undefined as any, 'key', 'default')).toBe('default');
  });

  it('should handle arrays in the path', () => {
    expect(getNestedProperty(testObj, 'level1.array')).toEqual([1, 2, 3]);
  });
});

describe('createTranslationFunction', () => {
  let t: ReturnType<typeof createTranslationFunction>;
  
  beforeEach(() => {
    // Mock console warnings to avoid cluttering test output
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should return translations for the current language', () => {
    t = createTranslationFunction('he', mockTranslations);
    expect(t('common.hello')).toBe('שלום');
    
    t = createTranslationFunction('en', mockTranslations);
    expect(t('common.hello')).toBe('Hello');
  });

  it('should fallback to default language when key is missing', () => {
    t = createTranslationFunction('en', mockTranslations, 'he');
    expect(t('missing.inEnglish')).toBe('קיים בעברית בלבד');
  });

  it('should handle nested translations', () => {
    t = createTranslationFunction('he', mockTranslations);
    expect(t('common.nested.key')).toBe('ערך מקונן');
    expect(t('common.nested.deeper.value')).toBe('ערך עמוק יותר');
  });

  it('should return key when translation is missing and no default value provided', () => {
    t = createTranslationFunction('en', mockTranslations);
    expect(t('missing.completelyMissing')).toBe('missing.completelyMissing');
  });

  it('should handle objects with returnObjects option', () => {
    t = createTranslationFunction('he', mockTranslations);
    expect(t('common.nested', { returnObjects: true })).toEqual({
      key: 'ערך מקונן',
      deeper: {
        value: 'ערך עמוק יותר'
      }
    });
  });

  it('should replace variables in translations', () => {
    t = createTranslationFunction('he', mockTranslations);
    expect(t('common.welcome', { context: 'יוסי' })).toBe('ברוך הבא, יוסי');
  });

  it('should handle default values', () => {
    t = createTranslationFunction('en', mockTranslations);
    expect(t('missing.key', 'Default text')).toBe('Default text');
    expect(t('missing.key', { defaultValue: 'Default via options' })).toBe('Default via options');
  });
});
