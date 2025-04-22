
export const getResponsiveClasses = () => {
  return {
    container: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    sectionPadding: "py-12 md:py-16 lg:py-24",
    responsiveText: {
      h1: "text-3xl md:text-4xl lg:text-5xl font-bold",
      h2: "text-2xl md:text-3xl lg:text-4xl font-bold",
      h3: "text-xl md:text-2xl lg:text-3xl font-semibold",
      body: "text-base md:text-lg",
      small: "text-sm md:text-base",
    },
    cardGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8",
    flex: {
      column: "flex flex-col",
      row: "flex flex-col md:flex-row",
      center: "items-center justify-center",
      between: "justify-between",
      start: "items-start",
    }
  };
};

// Utility for responsive spacing based on screen size
export const getResponsiveSpacing = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  const spacingMap = {
    sm: "space-y-4 md:space-y-6",
    md: "space-y-6 md:space-y-8 lg:space-y-10",
    lg: "space-y-8 md:space-y-12 lg:space-y-16",
    xl: "space-y-10 md:space-y-16 lg:space-y-24",
  };
  
  return spacingMap[size];
};

// Utility for properly handling RTL/LTR spacing
export const getDirectionalClasses = (isRTL: boolean) => {
  return {
    textAlign: isRTL ? "text-right" : "text-left",
    margin: {
      start: isRTL ? "mr-auto" : "ml-auto",
      end: isRTL ? "ml-auto" : "mr-auto",
      startSmall: isRTL ? "mr-2 md:mr-4" : "ml-2 md:ml-4",
      endSmall: isRTL ? "ml-2 md:ml-4" : "mr-2 md:mr-4",
    },
    padding: {
      start: isRTL ? "pr-4 md:pr-6 lg:pr-8" : "pl-4 md:pl-6 lg:pl-8",
      end: isRTL ? "pl-4 md:pl-6 lg:pl-8" : "pr-4 md:pr-6 lg:pr-8",
    },
    flex: {
      row: isRTL ? "flex-row-reverse" : "flex-row",
    },
    order: {
      first: isRTL ? "order-last md:order-first" : "order-first",
      last: isRTL ? "order-first md:order-last" : "order-last",
    }
  };
};
