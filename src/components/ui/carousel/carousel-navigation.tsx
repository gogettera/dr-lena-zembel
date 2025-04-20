
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

export function CarouselNavigation({ onPrevious, onNext }: CarouselNavigationProps) {
  return (
    <>
      <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-white shadow-md hover:bg-dental-beige hover:scale-110 transition-all border-dental-navy/20"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-5 w-5 text-dental-navy" />
        </Button>
      </div>
      <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-white shadow-md hover:bg-dental-beige hover:scale-110 transition-all border-dental-navy/20"
          onClick={onNext}
        >
          <ChevronRight className="h-5 w-5 text-dental-navy" />
        </Button>
      </div>
    </>
  );
}
