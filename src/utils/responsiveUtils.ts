
export const getResponsiveClasses = () => {
  return {
    responsiveText: {
      h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
      h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
      h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
      h4: 'text-base sm:text-lg md:text-xl lg:text-2xl',
      body: 'text-sm sm:text-base md:text-lg',
      small: 'text-xs sm:text-sm md:text-base'
    },
    responsiveSpacing: {
      section: 'py-8 sm:py-12 md:py-16 lg:py-20',
      container: 'px-4 sm:px-6 md:px-8 lg:px-12',
      gap: 'gap-4 sm:gap-6 md:gap-8 lg:gap-12'
    },
    responsiveGrid: {
      auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      two: 'grid-cols-1 md:grid-cols-2',
      three: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      four: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    }
  };
};
