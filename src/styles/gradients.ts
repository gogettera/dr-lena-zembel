
// Premium tech gradient presets - Airbnb-inspired sophistication
export const GRADIENTS = {
  // Main gradient backgrounds - clean tech aesthetics
  primary: 'bg-white',
  secondary: 'bg-gradient-to-br from-gray-50 to-white',
  accent: 'bg-gradient-to-r from-gray-50 to-gray-100',
  cool: 'bg-gradient-to-br from-blue-50 to-white',
  warm: 'bg-gradient-to-br from-orange-50 to-white',
  navy: 'bg-gradient-to-br from-gray-900 to-gray-800',
  
  // Premium section backgrounds - minimal tech
  elegant: {
    pearl: 'bg-white',
    champagne: 'bg-gradient-to-br from-gray-50 to-white',
    lavender: 'bg-gradient-to-br from-purple-50 to-white',
    sage: 'bg-gradient-to-br from-green-50 to-white',
    cream: 'bg-gradient-to-br from-yellow-50 to-white',
  },
  
  // Hero sections - premium tech
  hero: {
    main: 'bg-white',
    children: 'bg-gradient-to-br from-blue-50 to-white',
    treatments: 'bg-gradient-to-br from-green-50 to-white',
    aesthetic: 'bg-gradient-to-br from-pink-50 to-white',
    preventive: 'bg-gradient-to-br from-teal-50 to-white',
  },
  
  // Clean card backgrounds
  card: {
    default: 'bg-white',
    elegant: 'bg-white',
    premium: 'bg-gradient-to-br from-white to-gray-50',
    sophisticated: 'bg-white',
    luxury: 'bg-white',
  },
  
  // Premium text gradients
  text: {
    primary: 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent',
    accent: 'bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent',
    elegant: 'bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent',
    sophisticated: 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent',
  },
  
  // Premium button gradients
  button: {
    primary: 'bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500',
    secondary: 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700',
    elegant: 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700',
    sophisticated: 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600',
  },
  
  // Premium overlays
  overlay: {
    sophisticated: 'bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent',
    elegant: 'bg-gradient-to-br from-white/80 via-gray-50/30 to-gray-100/20',
    premium: 'bg-gradient-to-t from-gray-100/40 to-transparent',
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
      return GRADIENTS.primary;
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
  return baseGradient + ` hover:opacity-${intensity}`;
};
