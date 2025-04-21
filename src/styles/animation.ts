
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800
};

export const ANIMATION_TIMING = {
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  linear: 'linear'
};

export const ANIMATION_DELAY = {
  none: 0,
  short: 100,
  medium: 200,
  long: 400
};

export const getStaggeredDelay = (index: number, baseDelay: number = 100) => {
  return index * baseDelay;
};

export const getAnimationStyle = (
  duration: number = ANIMATION_DURATION.normal,
  timing: string = ANIMATION_TIMING.easeOut,
  delay: number = ANIMATION_DELAY.none
) => {
  return {
    animationDuration: `${duration}ms`,
    animationTimingFunction: timing,
    animationDelay: `${delay}ms`,
    animationFillMode: 'forwards'
  };
};

// Navigation-specific animations
export const NAVIGATION_ANIMATIONS = {
  fadeIn: "animate-fade-in",
  slideUp: "transition-transform duration-300",
  slideDown: "transition-transform duration-300",
  scaleHover: "transition-transform hover:scale-105 duration-200",
  backgroundTransition: "transition-colors duration-200",
  fadeInOut: "transition-opacity duration-300"
};

// Function to get staggered animation classes for navigation items
export const getNavigationItemAnimation = (index: number, total: number) => {
  const delay = getStaggeredDelay(index, 50);
  const opacity = `opacity-0 animate-fade-in [animation-delay:${delay}ms] [animation-fill-mode:forwards]`;
  return opacity;
};
