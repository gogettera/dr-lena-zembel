
import React from 'react';

const Logo = () => {
  return (
    <div className="text-center font-bold text-dental-navy">
      <div className="flex justify-center items-center">
        <img 
          src="/lovable-uploads/c1007b41-5fb4-451a-a540-744c4643c25e.png" 
          alt="דנטל לאב לוגו" 
          className="w-16 h-16 md:w-20 md:h-20 object-scale-down hover:scale-105 transition-transform duration-300" 
        />
        <span className="sr-only">דנטל לאב</span>
      </div>
    </div>
  );
};

export default Logo;
