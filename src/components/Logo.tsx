
import React from 'react';
import OptimizedImage from '@/components/ui/optimized-image';

const Logo = () => {
  return (
    <div className="flex items-center justify-center relative group">
      <div className="absolute inset-0 bg-dental-orange/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <OptimizedImage 
        src="/lovable-uploads/c1007b41-5fb4-451a-a540-744c4643c25e.png" 
        alt="דנטל לאב לוגו" 
        width={80}
        height={80}
        priority={true} // Mark as high priority since it's in the header
        className="w-16 h-16 md:w-20 md:h-20 object-scale-down transform transition-all duration-300 group-hover:scale-110 relative z-10" 
      />
      <span className="sr-only">דנטל לאב</span>
    </div>
  );
};

export default Logo;
