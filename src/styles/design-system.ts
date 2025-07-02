
import { COLORS, SPACING, SHADOWS, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from './tokens';

// Utility for responsive sizing
export const responsiveSize = (base: string, md: string, lg?: string): string => {
  return `${base} md:${md}${lg ? ` lg:${lg}` : ''}`;
};

// Simple function to get a color from our palette with optional opacity
export const getColor = (color: keyof typeof COLORS, opacity?: number): string => {
  const baseColor = typeof COLORS[color] === 'string' 
    ? COLORS[color] as string
    : (COLORS[color] as Record<string, string>)['500'] || '#000000';
    
  if (opacity !== undefined && opacity < 1) {
    return `${baseColor}${Math.round(opacity * 100).toString(16).padStart(2, '0')}`;
  }
  
  return baseColor;
};

// Utility for building a Tailwind class string with correct spacing
export const spacing = (
  top?: keyof typeof SPACING,
  right?: keyof typeof SPACING,
  bottom?: keyof typeof SPACING,
  left?: keyof typeof SPACING
): string => {
  if (top !== undefined && right === undefined && bottom === undefined && left === undefined) {
    return `p-${String(top)}`;
  }
  
  if (top !== undefined && bottom !== undefined && right === undefined && left === undefined) {
    return `py-${String(top)} px-${String(bottom)}`;
  }
  
  let classes = '';
  if (top !== undefined) classes += ` pt-${String(top)}`;
  if (right !== undefined) classes += ` pr-${String(right)}`;
  if (bottom !== undefined) classes += ` pb-${String(bottom)}`;
  if (left !== undefined) classes += ` pl-${String(left)}`;
  
  return classes.trim();
};

// Utility for building margin class strings
export const margin = (
  top?: keyof typeof SPACING,
  right?: keyof typeof SPACING,
  bottom?: keyof typeof SPACING,
  left?: keyof typeof SPACING
): string => {
  if (top !== undefined && right === undefined && bottom === undefined && left === undefined) {
    return `m-${String(top)}`;
  }
  
  if (top !== undefined && bottom !== undefined && right === undefined && left === undefined) {
    return `my-${String(top)} mx-${String(bottom)}`;
  }
  
  let classes = '';
  if (top !== undefined) classes += ` mt-${String(top)}`;
  if (right !== undefined) classes += ` mr-${String(right)}`;
  if (bottom !== undefined) classes += ` mb-${String(bottom)}`;
  if (left !== undefined) classes += ` ml-${String(left)}`;
  
  return classes.trim();
};

// Generate text styles based on design system tokens
export const textStyle = (
  size: keyof typeof FONT_SIZE,
  weight: keyof typeof FONT_WEIGHT = 'normal',
  color: string = 'textDark'
): string => {
  return `text-${String(size)} font-${String(weight)} text-dental-${color}`;
};

// Generate a shadow class
export const shadow = (level: keyof typeof SHADOWS): string => {
  return `shadow-${String(level)}`;
};

// Generate a border radius class
export const borderRadius = (size: keyof typeof BORDER_RADIUS): string => {
  if (size === 'none') return 'rounded-none';
  if (size === 'full') return 'rounded-full';
  return `rounded-${String(size)}`;
};

// Generate a container style class with max width
export const container = (maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' = '7xl'): string => {
  return `max-w-${maxWidth} mx-auto`;
};

// Generate flexbox utility classes
export const flexLayout = (
  direction: 'row' | 'row-reverse' | 'col' | 'col-reverse' = 'row',
  justify: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' = 'start',
  align: 'start' | 'end' | 'center' | 'baseline' | 'stretch' = 'start',
  wrap: boolean = false
): string => {
  return `flex flex-${direction} justify-${justify} items-${align}${wrap ? ' flex-wrap' : ''}`;
};

// Generate grid utility classes
export const gridLayout = (
  cols: number,
  gap: keyof typeof SPACING = 4
): string => {
  return `grid grid-cols-${cols} gap-${String(gap)}`;
};

// Generate responsive style classes
export const responsive = {
  hidden: (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'): string => {
    return `hidden ${breakpoint}:block`;
  },
  flex: (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'): string => {
    return `hidden ${breakpoint}:flex`;
  },
  grid: (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'): string => {
    return `hidden ${breakpoint}:grid`;
  },
  cols: (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl', cols: number): string => {
    return `${breakpoint}:grid-cols-${cols}`;
  },
  text: (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl', size: keyof typeof FONT_SIZE): string => {
    return `${breakpoint}:text-${String(size)}`;
  }
};

// Visual style presets for common UI elements
export const presets = {
  card: `bg-white rounded-lg shadow-soft p-6 hover:shadow-md transition-shadow duration-300`,
  button: {
    primary: `bg-dental-orange text-white py-2 px-4 rounded-md shadow-soft hover:shadow-glow transition-all duration-300`,
    secondary: `bg-dental-navy text-white py-2 px-4 rounded-md shadow-soft hover:shadow-md transition-all duration-300`,
    outline: `border border-dental-navy text-dental-navy py-2 px-4 rounded-md hover:bg-dental-navy/5 transition-all duration-300`,
    ghost: `text-dental-navy py-2 px-4 rounded-md hover:bg-dental-beige/20 transition-all duration-300`
  },
  input: `w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dental-sky focus:border-transparent transition-all duration-300`,
  section: `py-12 md:py-16`,
  container: `container mx-auto px-4 md:px-6`
};
