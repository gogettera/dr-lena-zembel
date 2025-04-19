
import React from 'react';

const Logo = () => {
  return (
    <div className="text-center font-bold text-dental-navy">
      <div className="flex justify-center items-center">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="16" stroke="#221F26" strokeWidth="2"/>
          <path d="M14 13H22C23.1046 13 24 13.8954 24 15V22C24 24.2091 22.2091 26 20 26H16C13.7909 26 12 24.2091 12 22V15C12 13.8954 12.8954 13 14 13Z" fill="#221F26"/>
          <rect x="15" y="10" width="6" height="6" rx="1" fill="#F97316"/>
        </svg>
      </div>
      <div className="mt-1">דנטל לאב</div>
    </div>
  );
};

export default Logo;
