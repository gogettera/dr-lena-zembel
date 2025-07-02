
// Premium Apple-inspired Design System - Precision and Elegance

// Color palette - Apple-inspired sophistication with dental warmth
export const COLORS = {
  // Primary colors - Apple precision with medical trust
  primary: '#007AFF',      // Apple blue - trust, professionalism
  primaryDark: '#0056CC',  // Darker blue for depth
  primaryLight: '#66B3FF', // Lighter blue for accents
  
  // Neutral system - Apple's refined grays
  white: '#FFFFFF',
  black: '#1C1C1E',        // Apple's true black
  gray: {
    50: '#FAFAFA',         // Softest background
    100: '#F2F2F7',        // Light background
    200: '#E5E5EA',        // Border light
    300: '#D1D1D6',        // Border medium
    400: '#C7C7CC',        // Disabled text
    500: '#AEAEB2',        // Secondary text
    600: '#8E8E93',        // Tertiary text
    700: '#636366',        // Label text
    800: '#48484A',        // Secondary label
    900: '#1C1C1E',        // Primary text
  },
  
  // Dental-specific colors - warm and trustworthy
  dental: {
    navy: '#1C1C1E',       // Apple black for headers
    coral: '#FF6B6B',      // Warm accent for CTAs
    mint: '#00D4AA',       // Fresh, clean feeling
    cream: '#FAFAFA',      // Soft backgrounds
    gold: '#FFB800',       // Premium accent
  },
  
  // System colors - Apple standards
  blue: '#007AFF',
  green: '#34C759',        // Success
  orange: '#FF9500',       // Warning
  red: '#FF3B30',          // Error
  purple: '#AF52DE',       // Special
  pink: '#FF2D92',         // Accent
  
  // Semantic colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
};

// Typography - Apple's precise hierarchy
export const TYPOGRAPHY = {
  // Font families - Apple system with fallbacks
  fontFamily: {
    system: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'].join(', '),
    mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'].join(', '),
  },
  
  // Font sizes - Apple's scale
  fontSize: {
    xs: '0.75rem',         // 12px
    sm: '0.875rem',        // 14px
    base: '1rem',          // 16px
    lg: '1.125rem',        // 18px
    xl: '1.25rem',         // 20px
    '2xl': '1.5rem',       // 24px
    '3xl': '1.875rem',     // 30px
    '4xl': '2.25rem',      // 36px
    '5xl': '3rem',         // 48px
    '6xl': '3.75rem',      // 60px
  },
  
  // Font weights - Apple's precision
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
  },
  
  // Line heights - Apple's rhythm
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Letter spacing - Apple's precision
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Spacing - Apple's 8px grid system
export const SPACING = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',    // 2px
  1: '0.25rem',       // 4px
  1.5: '0.375rem',    // 6px
  2: '0.5rem',        // 8px - base unit
  2.5: '0.625rem',    // 10px
  3: '0.75rem',       // 12px
  4: '1rem',          // 16px
  5: '1.25rem',       // 20px
  6: '1.5rem',        // 24px - rhythm unit
  8: '2rem',          // 32px
  10: '2.5rem',       // 40px
  12: '3rem',         // 48px
  16: '4rem',         // 64px
  20: '5rem',         // 80px
  24: '6rem',         // 96px
  32: '8rem',         // 128px
  40: '10rem',        // 160px
  48: '12rem',        // 192px
  56: '14rem',        // 224px
  64: '16rem',        // 256px
};

// Shadows - Apple's subtle depth
export const SHADOWS = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
  
  // Apple-specific shadows
  button: '0 1px 3px rgba(0, 0, 0, 0.12)',
  buttonHover: '0 4px 12px rgba(0, 0, 0, 0.15)',
  card: '0 2px 8px rgba(0, 0, 0, 0.04)',
  cardHover: '0 8px 24px rgba(0, 0, 0, 0.12)',
  focus: '0 0 0 4px rgba(0, 122, 255, 0.2)',
};

// Border radius - Apple's modern curves
export const BORDER_RADIUS = {
  none: '0',
  xs: '0.125rem',     // 2px
  sm: '0.25rem',      // 4px
  md: '0.375rem',     // 6px
  lg: '0.5rem',       // 8px
  xl: '0.75rem',      // 12px
  '2xl': '1rem',      // 16px
  '3xl': '1.5rem',    // 24px
  full: '9999px',
};

// Animation - Apple's precise timing
export const ANIMATION = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
  },
  
  easing: {
    // Apple's signature easing
    default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};

// Layout - Apple's content sizing
export const LAYOUT = {
  maxWidth: {
    xs: '20rem',      // 320px
    sm: '24rem',      // 384px
    md: '28rem',      // 448px
    lg: '32rem',      // 512px
    xl: '36rem',      // 576px
    '2xl': '42rem',   // 672px
    '3xl': '48rem',   // 768px
    '4xl': '56rem',   // 896px
    '5xl': '64rem',   // 1024px
    '6xl': '72rem',   // 1152px
    '7xl': '80rem',   // 1280px
    full: '100%',
  },
  
  container: {
    padding: {
      mobile: '1rem',     // 16px
      tablet: '2rem',     // 32px
      desktop: '3rem',    // 48px
    },
  },
};

// Z-index - Apple's layering
export const Z_INDEX = {
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1020,
  banner: 1030,
  overlay: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
};

