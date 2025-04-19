
/**
 * Utility functions for RTL/LTR handling
 */

/**
 * Sets the document direction to RTL or LTR
 */
export const setDirection = (dir: 'rtl' | 'ltr') => {
  document.documentElement.dir = dir;
  document.documentElement.lang = dir === 'rtl' ? 'he' : 'en';
};

/**
 * Sets up the document for Hebrew RTL
 */
export const setupHebrewRTL = () => {
  setDirection('rtl');
  document.title = 'דנטל לאב - מרפאת שיניים';
};
