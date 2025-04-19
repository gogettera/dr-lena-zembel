
import React from 'react';

const Logo = () => {
  return (
    <div className="text-center font-bold text-dental-navy">
      <div className="flex justify-center items-center">
        <img 
          src="/lovable-uploads/your-logo.png" 
          alt="דנטל לאב לוגו" 
          className="w-36 h-36 object-contain"
        />
      </div>
      <div className="mt-1">דנטל לאב</div>
    </div>
  );
};

export default Logo;
