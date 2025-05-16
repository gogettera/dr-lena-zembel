
import { TranslationOptions } from './types';

/**
 * Format a date according to the specified locale
 * 
 * @param date The date to format
 * @param locale The locale to use for formatting
 * @returns A formatted date string
 */
export const formatDate = (date: Date, locale: string = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale).format(date);
};

/**
 * Format a number according to the specified locale
 * 
 * @param num The number to format
 * @param locale The locale to use for formatting
 * @returns A formatted number string
 */
export const formatNumber = (num: number, locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Format a currency value according to the specified locale and currency
 * 
 * @param value The number to format as currency
 * @param locale The locale to use for formatting
 * @param currency The currency code (e.g., 'USD', 'EUR', 'ILS')
 * @returns A formatted currency string
 */
export const formatCurrency = (
  value: number, 
  locale: string = 'en-US', 
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Format a translation value based on options
 * 
 * @param value The translation value
 * @param options Options for formatting
 * @returns The formatted string
 */
export const formatTranslationValue = (
  value: string, 
  options?: TranslationOptions
): string => {
  // For now, just return the value - we can add more formatting options later
  return value;
};
