
import { describe, it, expect } from 'vitest';
import { getNestedValue, getTranslation, translate } from '../core';

describe('getNestedValue', () => {
  it('should retrieve nested values correctly', () => {
    const obj = {
      a: {
        b: {
          c: 'value'
        }
      }
    };
    
    expect(getNestedValue(obj, 'a.b.c')).toBe('value');
  });
  
  it('should return undefined for non-existent paths', () => {
    const obj = { a: { b: 1 } };
    expect(getNestedValue(obj, 'a.c')).toBe(undefined);
  });
});

describe('translate', () => {
  it('should retrieve and interpolate translations', () => {
    const translations = {
      common: {
        greeting: 'Hello, {{name}}!',
        farewell: 'Goodbye'
      }
    };
    
    expect(translate(translations, 'common.greeting', { 
      params: { name: 'World' } 
    })).toBe('Hello, World!');
  });
  
  it('should use fallback when translation is missing', () => {
    const translations = {};
    expect(translate(translations, 'missing.key', { 
      fallback: 'Fallback Text' 
    })).toBe('Fallback Text');
  });
});
