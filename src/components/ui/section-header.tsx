
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  className,
  titleClassName,
  subtitleClassName 
}: SectionHeaderProps) => {
  return (
    <div className={cn("text-center mb-16", className)}>
      <h2 className={cn(
        "text-3xl md:text-4xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]",
        titleClassName
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg text-dental-navy/80 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards] max-w-2xl mx-auto",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-dental-orange mx-auto mt-6 rounded-full opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]" />
    </div>
  );
};

export default SectionHeader;
