
import { describe, it, expect } from 'vitest';
import { formatTranslation, safeString, isNestedObject, formatTranslationValue } from '../format';

describe('formatTranslation', () => {
  it('should replace variables in string', () => {
    const result = formatTranslation('Hello, {{name}}!', { name: 'John' });
    expect(result).toBe('Hello, John!');
  });

  it('should handle multiple variables', () => {
    const result = formatTranslation('{{greeting}}, {{name}}!', { 
      greeting: 'Hello', 
      name: 'John' 
    });
    expect(result).toBe('Hello, John!');
  });

  it('should leave placeholders when variables are not provided', () => {
    const result = formatTranslation('Hello, {{name}}!', {});
    expect(result).toBe('Hello, {{name}}!');
  });

  it('should handle undefined or null variables', () => {
    expect(formatTranslation('Hello, {{name}}!', null)).toBe('Hello, {{name}}!');
    expect(formatTranslation('Hello, {{name}}!', undefined)).toBe('Hello, {{name}}!');
  });

  it('should handle empty string', () => {
    expect(formatTranslation('', { name: 'John' })).toBe('');
    expect(formatTranslation(null as any, { name: 'John' })).toBe('');
  });
});

describe('safeString', () => {
  it('should convert values to strings', () => {
    expect(safeString('hello')).toBe('hello');
    expect(safeString(123)).toBe('123');
    expect(safeString(true)).toBe('true');
  });

  it('should handle null and undefined', () => {
    expect(safeString(null)).toBe('');
    expect(safeString(undefined)).toBe('');
  });

  it('should stringify objects', () => {
    expect(safeString({ a: 1 })).toBe('{"a":1}');
    expect(safeString([1, 2, 3])).toBe('[1,2,3]');
  });

  it('should handle circular references', () => {
    const circular: any = { a: 1 };
    circular.self = circular;
    expect(safeString(circular)).toBe('[Complex Object]');
  });
});

describe('isNestedObject', () => {
  it('should identify objects correctly', () => {
    expect(isNestedObject({ a: 1 })).toBe(true);
    expect(isNestedObject({})).toBe(true);
  });

  it('should return false for non-objects', () => {
    expect(isNestedObject(null)).toBe(false);
    expect(isNestedObject(undefined)).toBe(false);
    expect(isNestedObject('string')).toBe(false);
    expect(isNestedObject(123)).toBe(false);
    expect(isNestedObject([1, 2, 3])).toBe(false);
  });
});

describe('formatTranslationValue', () => {
  it('should handle string values', () => {
    expect(formatTranslationValue('hello')).toBe('hello');
  });

  it('should handle number values', () => {
    expect(formatTranslationValue(123)).toBe('123');
  });

  it('should handle null and undefined', () => {
    expect(formatTranslationValue(null)).toBe('');
    expect(formatTranslationValue(undefined)).toBe('');
  });

  it('should stringify objects', () => {
    expect(formatTranslationValue({ a: 1 })).toBe('{"a":1}');
  });
});
