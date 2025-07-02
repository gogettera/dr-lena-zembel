
// Common gradient presets for consistent styling - Updated to lighter theme
export const GRADIENTS = {
  // Main gradient backgrounds - lighter and softer
  primary: 'bg-gradient-to-br from-white via-blue-50/30 to-pink-50/20',
  secondary: 'bg-gradient-to-tr from-pink-50/30 via-white to-blue-50/20',
  accent: 'bg-gradient-to-r from-pink-100/30 to-blue-100/20',
  cool: 'bg-gradient-to-br from-blue-50/40 via-white to-sky-50/30',
  warm: 'bg-gradient-to-br from-pink-50/30 via-white to-rose-50/20',
  navy: 'bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300',
  
  // Subtle section backgrounds - very light
  subtle: {
    beige: 'bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30',
    pink: 'bg-gradient-to-br from-pink-50/40 via-white to-pink-50/20',
    orange: 'bg-gradient-to-br from-rose-50/30 via-white to-pink-50/20',
    sky: 'bg-gradient-to-br from-blue-50/30 via-white to-sky-50/20',
  },
  
  // Hero sections - light and airy
  hero: {
    main: 'bg-gradient-to-br from-white via-blue-50/20 to-pink-50/10',
    children: 'bg-gradient-to-br from-pink-50/30 via-blue-50/20 to-purple-50/10',
    treatments: 'bg-gradient-to-br from-purple-50/20 via-blue-50/10 to-white',
    aesthetic: 'bg-white',
    preventive: 'bg-gradient-to-br from-green-50/30 to-blue-50/20',
  },
  
  // Card backgrounds - very subtle
  card: {
    default: 'bg-white',
    highlighted: 'bg-gradient-to-br from-white to-gray-50/30',
    accent: 'bg-gradient-to-br from-white to-pink-50/20',
    cool: 'bg-gradient-to-br from-white to-blue-50/20',
  },
  
  // Text gradients - softer colors
  text: {
    primary: 'bg-gradient-to-r from-blue-500 via-blue-400 to-sky-400 bg-clip-text text-transparent',
    accent: 'bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent',
  },
  
  // Button gradients - lighter
  button: {
    primary: 'bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500',
    secondary: 'bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500',
  },
};

// Function to get a gradient by key path (e.g., "subtle.beige")
export const getGradient = (path: string) => {
  const parts = path.split('.');
  let result: any = GRADIENTS;
  
  for (const part of parts) {
    if (result && result[part]) {
      result = result[part];
    } else {
      return '';
    }
  }
  
  return typeof result === 'string' ? result : '';
};
