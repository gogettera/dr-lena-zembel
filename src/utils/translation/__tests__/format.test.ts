
import { describe, it, expect } from 'vitest';
import { formatTranslation, safeString } from '../format';

describe('formatTranslation', () => {
  it('should handle string values', () => {
    expect(formatTranslation('Hello')).toBe('Hello');
  });

  it('should handle null values', () => {
    expect(formatTranslation(null)).toBe('');
  });

  it('should handle undefined values', () => {
    expect(formatTranslation(undefined)).toBe('');
  });

  it('should handle object values', () => {
    expect(formatTranslation({ key: 'value' })).toBe('[Complex Object]');
  });
});

describe('safeString', () => {
  it('should convert any value to a safe string', () => {
    expect(safeString('text')).toBe('text');
    expect(safeString(null)).toBe('');
    expect(safeString(undefined)).toBe('');
    expect(safeString(123)).toBe('123');
    expect(safeString({ a: 1 })).toBe('[Object]');
  });
});
