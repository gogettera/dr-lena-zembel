
import React, { ReactNode } from 'react';

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  centered?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  centered = true,
  className = ''
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-lg text-dental-navy/80 max-w-3xl mx-auto opacity-0 animate-[fade-in_0.5s_ease-out_0.2s_forwards]">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
