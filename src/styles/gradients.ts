
// French elegance gradient presets for sophisticated styling
export const GRADIENTS = {
  // Main gradient backgrounds - sophisticated French palette
  primary: 'bg-gradient-to-br from-dental-pearl via-white to-dental-champagne/30',
  secondary: 'bg-gradient-to-tr from-dental-champagne/20 via-white to-dental-lavender/10',
  accent: 'bg-gradient-to-r from-dental-sage/20 to-dental-lavender/15',
  cool: 'bg-gradient-to-br from-dental-lavender/30 via-white to-dental-azure/20',
  warm: 'bg-gradient-to-br from-dental-champagne/25 via-white to-dental-cream/15',
  navy: 'bg-gradient-to-br from-dental-navy via-slate-700 to-slate-600',
  
  // Elegant section backgrounds - French sophistication
  elegant: {
    pearl: 'bg-gradient-to-br from-dental-pearl via-white to-dental-champagne/20',
    champagne: 'bg-gradient-to-br from-dental-champagne/30 via-white to-dental-pearl',
    lavender: 'bg-gradient-to-br from-dental-lavender/25 via-white to-dental-azure/15',
    sage: 'bg-gradient-to-br from-dental-sage/20 via-white to-dental-champagne/10',
    cream: 'bg-gradient-to-br from-dental-cream/40 via-white to-dental-pearl',
  },
  
  // Hero sections - French elegance
  hero: {
    main: 'bg-gradient-to-br from-white via-dental-champagne/10 to-dental-lavender/8',
    children: 'bg-gradient-to-br from-dental-lavender/20 via-dental-champagne/15 to-dental-sage/10',
    treatments: 'bg-gradient-to-br from-dental-sage/15 via-dental-pearl to-white',
    aesthetic: 'bg-gradient-to-br from-white via-dental-champagne/15 to-dental-lavender/12',
    preventive: 'bg-gradient-to-br from-dental-sage/25 to-dental-champagne/20',
  },
  
  // Sophisticated card backgrounds
  card: {
    default: 'bg-white',
    elegant: 'bg-gradient-to-br from-white to-dental-pearl/30',
    premium: 'bg-gradient-to-br from-white to-dental-champagne/20',
    sophisticated: 'bg-gradient-to-br from-white to-dental-lavender/15',
    luxury: 'bg-gradient-to-br from-dental-pearl to-white',
  },
  
  // French-inspired text gradients
  text: {
    primary: 'bg-gradient-to-r from-dental-navy via-slate-600 to-dental-ocean bg-clip-text text-transparent',
    accent: 'bg-gradient-to-r from-dental-orange to-amber-500 bg-clip-text text-transparent',
    elegant: 'bg-gradient-to-r from-dental-navy to-dental-sage bg-clip-text text-transparent',
    sophisticated: 'bg-gradient-to-r from-slate-700 to-dental-navy bg-clip-text text-transparent',
  },
  
  // Elegant button gradients
  button: {
    primary: 'bg-gradient-to-r from-dental-orange to-amber-500 hover:from-dental-orange/90 hover:to-amber-500/90',
    secondary: 'bg-gradient-to-r from-dental-navy to-slate-700 hover:from-dental-navy/90 hover:to-slate-700/90',
    elegant: 'bg-gradient-to-r from-slate-600 to-dental-navy hover:from-slate-700 hover:to-dental-navy/90',
    sophisticated: 'bg-gradient-to-r from-dental-sage to-slate-500 hover:from-dental-sage/90 hover:to-slate-500/90',
  },
  
  // French elegance overlays
  overlay: {
    sophisticated: 'bg-gradient-to-t from-dental-navy/60 via-dental-navy/20 to-transparent',
    elegant: 'bg-gradient-to-br from-white/80 via-dental-champagne/30 to-dental-lavender/20',
    premium: 'bg-gradient-to-t from-dental-champagne/40 to-transparent',
  },
};

// Enhanced function to get gradient by key path
export const getGradient = (path: string) => {
  const parts = path.split('.');
  let result: any = GRADIENTS;
  
  for (const part of parts) {
    if (result && result[part]) {
      result = result[part];
    } else {
      console.warn(`Gradient path "${path}" not found`);
      return GRADIENTS.primary; // Fallback to primary
    }
  }
  
  return typeof result === 'string' ? result : GRADIENTS.primary;
};

// Utility functions for dynamic gradients
export const createCustomGradient = (
  colors: string[], 
  direction: 'to-r' | 'to-br' | 'to-tr' | 'to-b' = 'to-br'
): string => {
  return `bg-gradient-${direction} ${colors.map((color, index) => 
    `${index === 0 ? 'from-' : index === colors.length - 1 ? 'to-' : 'via-'}${color}`
  ).join(' ')}`;
};

export const addGradientHover = (baseGradient: string, intensity: number = 90): string => {
  // This would need to be implemented based on specific hover requirements
  return baseGradient + ` hover:opacity-${intensity}`;
};
