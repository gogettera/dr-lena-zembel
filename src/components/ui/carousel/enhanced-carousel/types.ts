
import { CarouselApi } from '@/components/ui/carousel';

export interface EnhancedCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  autoplay?: number | false;
  interval?: number;
  showProgress?: boolean;
  showArrows?: boolean;
  className?: string;
  setApi?: (api: CarouselApi) => void;
  opts?: {
    align?: "start" | "center" | "end";
    loop?: boolean;
    skipSnaps?: boolean;
    startIndex?: number;
    dragFree?: boolean;
    direction?: "rtl" | "ltr";
  };
}

export interface CarouselProgressProps {
  current: number;
  count: number;
  onSelect?: (index: number) => void;
}
