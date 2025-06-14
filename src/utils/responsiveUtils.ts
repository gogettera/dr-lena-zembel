

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

export const getDirectionalClasses = (isRTL: boolean) => {
  return {
    textAlign: isRTL ? 'text-right' : 'text-left',
    spaceDir: isRTL ? 'space-x-reverse' : '',
    flexDir: isRTL ? 'flex-row-reverse' : 'flex-row',
    marginLeft: isRTL ? 'ml-auto' : '',
    marginRight: isRTL ? 'mr-auto' : '',
    left: isRTL ? 'right-0' : 'left-0',
    right: isRTL ? 'left-0' : 'right-0',
    padding: isRTL ? 'pl-4 pr-2' : 'pr-4 pl-2',
    borderSide: isRTL ? 'border-r' : 'border-l',
    transformOrigin: isRTL ? 'origin-right' : 'origin-left',
    scroll: isRTL ? 'rtl-scrollbar' : '',
    order: {
      first: isRTL ? 'order-last' : 'order-first',
      last: isRTL ? 'order-first' : 'order-last',
      nav: isRTL ? 'flex-row-reverse' : 'flex-row',
      header: {
        phone: isRTL ? 'order-3' : 'order-1',
        logo: 'order-2',
        nav: isRTL ? 'order-1' : 'order-3'
      }
    },
    icon: {
      chevron: isRTL ? 'rotate-180' : '',
      arrow: isRTL ? '-scale-x-100' : '',
    }
  };
};

