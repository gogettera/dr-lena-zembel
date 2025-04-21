
import { ANIMATION_DURATION, ANIMATION_TIMING, ANIMATION_DELAY } from './animation';

// Animation presets for common UI patterns
export const ANIMATION_PRESETS = {
  // Entrance animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { 
      duration: ANIMATION_DURATION.normal / 1000, 
      ease: ANIMATION_TIMING.easeOut 
    }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: ANIMATION_DURATION.normal / 1000, 
      ease: ANIMATION_TIMING.easeOut 
    }
  },
  fadeInDown: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: ANIMATION_DURATION.normal / 1000,
      ease: ANIMATION_TIMING.easeOut 
    }
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { 
      duration: ANIMATION_DURATION.normal / 1000,
      ease: ANIMATION_TIMING.easeOut
    }
  },
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { 
      duration: ANIMATION_DURATION.normal / 1000,
      ease: ANIMATION_TIMING.easeOut 
    }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: ANIMATION_DURATION.normal / 1000,
      ease: ANIMATION_TIMING.easeOut
    }
  },
  
  // Exit animations
  fadeOut: {
    exit: { opacity: 0 },
    transition: {
      duration: ANIMATION_DURATION.fast / 1000,
      ease: ANIMATION_TIMING.easeIn
    }
  },
  fadeOutUp: {
    exit: { opacity: 0, y: -10 },
    transition: {
      duration: ANIMATION_DURATION.fast / 1000,
      ease: ANIMATION_TIMING.easeIn
    }
  },
  
  // Interactive animations
  pulse: {
    animate: { 
      scale: [1, 1.05, 1],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: ANIMATION_TIMING.easeInOut
    }
  },
  bounce: {
    animate: { 
      y: [0, -10, 0],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: ANIMATION_TIMING.easeInOut
    }
  },
  
  // Page transitions
  pageEnter: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: ANIMATION_DURATION.normal / 1000,
      ease: ANIMATION_TIMING.easeOut
    }
  },
  pageExit: {
    exit: { opacity: 0 },
    transition: {
      duration: ANIMATION_DURATION.fast / 1000,
      ease: ANIMATION_TIMING.easeIn
    }
  }
};

// Function to get staggered animation delays for child elements
export const getStaggeredAnimations = (
  baseAnimation: keyof typeof ANIMATION_PRESETS,
  childCount: number,
  staggerDelay: number = 0.1
) => {
  return Array.from({ length: childCount }).map((_, i) => {
    const basePreset = { ...ANIMATION_PRESETS[baseAnimation] };
    const transition = { 
      ...basePreset.transition,
      delay: i * staggerDelay
    };
    
    return {
      ...basePreset,
      transition
    };
  });
};

// CSS animation classes for use with Tailwind
export const ANIMATION_CLASSES = {
  fadeIn: 'animate-fade-in',
  fadeInUp: 'animate-fade-in-up',
  fadeInDown: 'animate-fade-in-down',
  fadeInLeft: 'animate-fade-in-left',
  fadeInRight: 'animate-fade-in-right',
  scaleIn: 'animate-scale-in',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  // Add delay classes
  delay100: '[animation-delay:100ms]',
  delay200: '[animation-delay:200ms]',
  delay300: '[animation-delay:300ms]',
  delay400: '[animation-delay:400ms]',
  delay500: '[animation-delay:500ms]',
  delay600: '[animation-delay:600ms]',
  delay700: '[animation-delay:700ms]',
  delay800: '[animation-delay:800ms]',
  delay900: '[animation-delay:900ms]',
  delay1000: '[animation-delay:1000ms]',
};

// Helper function to generate delay class for nth item
export const getDelayClass = (index: number, baseDelay: number = 100) => {
  const delay = index * baseDelay;
  if (delay <= 1000 && delay % 100 === 0) {
    return ANIMATION_CLASSES[`delay${delay}` as keyof typeof ANIMATION_CLASSES];
  }
  return `[animation-delay:${delay}ms]`;
};

// Helper to generate animation classes with delay
export const getAnimationWithDelay = (
  animation: keyof typeof ANIMATION_CLASSES,
  index: number,
  baseDelay: number = 100
) => {
  return cn(ANIMATION_CLASSES[animation], getDelayClass(index, baseDelay));
};

// Helper function to combine Tailwind classes
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
