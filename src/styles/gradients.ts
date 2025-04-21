
// Common gradient presets for consistent styling
export const GRADIENTS = {
  // Main gradient backgrounds
  primary: 'bg-gradient-to-br from-dental-beige via-white to-dental-pink/10',
  secondary: 'bg-gradient-to-tr from-dental-pink/20 via-white to-dental-beige/20',
  accent: 'bg-gradient-to-r from-dental-orange/10 to-dental-accent/10',
  cool: 'bg-gradient-to-br from-dental-sky/20 via-white to-dental-azure/20',
  warm: 'bg-gradient-to-br from-dental-beige/30 via-white to-dental-orange/10',
  navy: 'bg-gradient-to-br from-dental-navy via-dental-navy/90 to-dental-navy/80',
  
  // Subtle section backgrounds
  subtle: {
    beige: 'bg-gradient-to-br from-dental-beige/30 via-dental-beige/20 to-dental-beige/10',
    pink: 'bg-gradient-to-br from-dental-pink/30 via-dental-pink/20 to-dental-pink/10',
    orange: 'bg-gradient-to-br from-dental-orange/20 via-dental-orange/10 to-dental-orange/5',
    sky: 'bg-gradient-to-br from-dental-sky/20 via-dental-sky/10 to-dental-sky/5',
  },
  
  // Hero sections
  hero: {
    main: 'bg-gradient-to-br from-dental-beige via-dental-pink to-dental-beige',
    children: 'bg-gradient-to-br from-[#FFDEE2]/40 via-[#D3E4FD]/20 to-[#F1F0FB]/50',
    treatments: 'bg-gradient-to-br from-[#E5DEFF]/40 via-[#F1F0FB]/20 to-[#FDF4F0]/50',
    aesthetic: 'bg-white min-h-screen',
    preventive: 'bg-[#FFDEE2] relative',
  },
  
  // Card backgrounds
  card: {
    default: 'bg-white',
    highlighted: 'bg-gradient-to-br from-white to-dental-beige/10',
    accent: 'bg-gradient-to-br from-white to-dental-accent/10',
    cool: 'bg-gradient-to-br from-white to-dental-sky/10',
  },
  
  // Text gradients (use with bg-clip-text text-transparent)
  text: {
    primary: 'bg-gradient-to-r from-dental-navy via-dental-ocean to-dental-sky bg-clip-text text-transparent',
    accent: 'bg-gradient-to-r from-dental-orange to-dental-accent bg-clip-text text-transparent',
  },
  
  // Button gradients
  button: {
    primary: 'bg-gradient-to-r from-dental-orange to-dental-orange/90 hover:from-dental-orange/90 hover:to-dental-orange',
    secondary: 'bg-gradient-to-r from-dental-navy to-dental-navy/90 hover:from-dental-navy/90 hover:to-dental-navy',
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
