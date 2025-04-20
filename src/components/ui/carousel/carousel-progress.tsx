
import * as React from "react";
import { cn } from "@/lib/utils";

interface CarouselProgressProps {
  current: number;
  count: number;
  onSelect: (index: number) => void;
}

export function CarouselProgress({ current, count, onSelect }: CarouselProgressProps) {
  if (count <= 0) return null;

  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "w-2 h-2 rounded-full transition-all",
            current === index
              ? "bg-dental-orange scale-125"
              : "bg-dental-navy/20 hover:bg-dental-navy/30"
          )}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
