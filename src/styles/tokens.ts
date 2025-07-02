
// Design tokens system - Enhanced French Elegance

// Color palette - Sophisticated French-inspired colors
export const COLORS = {
  // Primary colors - refined and elegant
  navy: '#2C3E50',     // Deep sophisticated blue
  orange: '#E67E22',   // Warm sophisticated orange
  beige: '#FAF9F7',    // Warm ivory
  textDark: '#2C3E50', // Rich charcoal
  
  // Supporting colors - French palette
  sky: '#74B9FF',      // Soft French blue
  ocean: '#0984E3',    // Classic French blue
  azure: '#DDD6FE',    // Lavender
  pink: '#FDF2F8',     // Soft rose
  accent: '#FDCB6E',   // Golden accent
  highlight: '#FFE8E8', // Soft blush
  
  // French elegance colors
  champagne: '#F7ECE1', // Champagne
  pearl: '#F8F6F0',     // Pearl white
  sage: '#A8B5A0',      // Sage green
  lavender: '#E6E6FA',  // French lavender
  cream: '#FFFDD0',     // Cream
  
  // Functional colors - refined
  success: '#00B894',   // Elegant green
  error: '#E17055',     // Sophisticated red
  warning: '#FDCB6E',   // Golden warning
  info: '#74B9FF',      // Elegant blue
  
  // Neutral tones - sophisticated palette
  white: '#FFFFFF',
  black: '#2C3E50',     // Sophisticated dark
  gray: {
    100: '#F8F9FA',     // Whisper
    200: '#E9ECEF',     // Mist
    300: '#DEE2E6',     // Fog
    400: '#CED4DA',     // Cloud
    500: '#ADB5BD',     // Stone
    600: '#6C757D',     // Slate
    700: '#495057',     // Charcoal
    800: '#343A40',     // Graphite
    900: '#212529',     // Midnight
  }
};

// Spacing system - refined proportions
export const SPACING = {
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
};

// Font sizes - elegant typography scale
export const FONT_SIZE = {
  xs: '0.75rem',     // 12px - Caption
  sm: '0.875rem',    // 14px - Small text
  base: '1rem',      // 16px - Body
  lg: '1.125rem',    // 18px - Large body
  xl: '1.25rem',     // 20px - Subtitle
  '2xl': '1.5rem',   // 24px - Heading 6
  '3xl': '1.875rem', // 30px - Heading 5
  '4xl': '2.25rem',  // 36px - Heading 4
  '5xl': '3rem',     // 48px - Heading 3
  '6xl': '3.75rem',  // 60px - Heading 2
  '7xl': '4.5rem',   // 72px - Hero
  '8xl': '6rem',     // 96px - Display
  '9xl': '8rem',     // 128px - Hero Display
};

// Font weights - refined hierarchy
export const FONT_WEIGHT = {
  thin: '100',
  extralight: '200',
  light: '300',      // Elegant light
  normal: '400',     // Body text
  medium: '500',     // Emphasis
  semibold: '600',   // Headings
  bold: '700',       // Strong headings
  extrabold: '800',  // Display
  black: '900',
};

// Line heights - elegant proportions
export const LINE_HEIGHT = {
  none: '1',
  tight: '1.25',     // Headlines
  snug: '1.375',     // Subheadings
  normal: '1.5',     // Body text
  relaxed: '1.625',  // Large text
  loose: '2',        // Spacious
};

// Shadows - sophisticated depth
export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(44, 62, 80, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(44, 62, 80, 0.1), 0 1px 2px 0 rgba(44, 62, 80, 0.06)',
  md: '0 4px 6px -1px rgba(44, 62, 80, 0.1), 0 2px 4px -1px rgba(44, 62, 80, 0.06)',
  lg: '0 10px 15px -3px rgba(44, 62, 80, 0.1), 0 4px 6px -2px rgba(44, 62, 80, 0.05)',
  xl: '0 20px 25px -5px rgba(44, 62, 80, 0.1), 0 10px 10px -5px rgba(44, 62, 80, 0.04)',
  '2xl': '0 25px 50px -12px rgba(44, 62, 80, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(44, 62, 80, 0.06)',
  none: 'none',
  elegant: '0 4px 20px -2px rgba(44, 62, 80, 0.08), 0 2px 8px -1px rgba(44, 62, 80, 0.04)',
  premium: '0 8px 32px -4px rgba(44, 62, 80, 0.12), 0 4px 16px -2px rgba(44, 62, 80, 0.08)',
};

// Border radius - refined curves
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',    // 2px - Subtle
  DEFAULT: '0.375rem', // 6px - Standard
  md: '0.5rem',      // 8px - Medium
  lg: '0.75rem',     // 12px - Large
  xl: '1rem',        // 16px - Extra large
  '2xl': '1.5rem',   // 24px - Hero elements
  '3xl': '2rem',     // 32px - Feature cards
  full: '9999px',    // Fully rounded
};

// Z-index - layered elegance
export const Z_INDEX = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  auto: 'auto',
  
  // Application-specific layers
  dropdown: '1000',
  sticky: '1100',
  fixed: '1200',
  modal: '1300',
  popover: '1400',
  tooltip: '1500',
};

// Animation durations - smooth transitions
export const DURATIONS = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',    // Standard
  400: '400ms',    // Elegant
  500: '500ms',    // Smooth
  700: '700ms',    // Luxurious
  1000: '1000ms',  // Dramatic
};

// Media queries
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Layout - refined containers
export const CONTAINERS = {
  xs: '20rem',    // 320px
  sm: '24rem',    // 384px
  md: '28rem',    // 448px
  lg: '32rem',    // 512px
  xl: '36rem',    // 576px
  '2xl': '42rem', // 672px
  '3xl': '48rem', // 768px
  '4xl': '56rem', // 896px
  '5xl': '64rem', // 1024px
  '6xl': '72rem', // 1152px
  '7xl': '80rem', // 1280px
  full: '100%',
};
