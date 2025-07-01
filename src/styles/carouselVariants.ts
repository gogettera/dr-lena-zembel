
export const carouselArrowStyles = {
  default: "bg-white/90 text-gray-800 hover:bg-white shadow-md",
  light: "bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80",
  dark: "bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm",
  circle: "rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-md w-10 h-10 p-2",
  pill: "rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-md"
} as const;

export type CarouselArrowVariant = keyof typeof carouselArrowStyles;
