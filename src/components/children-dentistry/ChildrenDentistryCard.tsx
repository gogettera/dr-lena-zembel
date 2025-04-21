
import React from "react";

const ChildrenDentistryCard: React.FC = () => (
  <section className="w-full flex justify-center items-center py-12">
    <div className="relative bg-white rounded-3xl shadow transition-all p-10 px-8 md:px-16 lg:px-24 w-full max-w-5xl min-h-[320px] flex flex-col justify-center text-center">
      {/* Faint top-left illustration */}
      <img 
        src="/lovable-uploads/cceeeb1b-6849-475f-b056-da735a051222.png" 
        alt="" 
        className="absolute top-0 left-0 z-0 w-24 opacity-10 pointer-events-none select-none"
        aria-hidden="true"
      />
      {/* Title row with star on right */}
      <div className="flex items-center justify-between mb-6">
        <span className="invisible w-6" /> {/* Spacer for symmetry */}
        <h2 className="font-extrabold text-2xl md:text-3xl text-[#1E318A] z-10">
          רפואת שיניים לילדים
        </h2>
        <span className="text-[#FCA5A5] text-3xl z-10" title="מועדף">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 3l3.09 6.26L24 10.27l-5 4.87
            1.18 6.86L14 18.27 7.82 22l1.18-6.86-5-4.87
            6.91-1.01L14 3z" fill="#FCA5A5" fillOpacity="0.2"/>
            <path d="M14 5.56L11.385 10.85l-5.395.786
            3.904 3.805-.921 5.372L14 17.19l4.927 2.58
            -.921-5.372 3.904-3.805-5.395-.786L14 5.56z" 
            stroke="#FCA5A5" strokeWidth="1.5" fill="none"/>
          </svg>
        </span>
      </div>
      {/* Subtitle text in Hebrew */}
      <div className="mb-2 text-lg md:text-xl text-[#4453A6] font-medium">
        גישה מותאמת אישית וְטיפול עדין לילדים בסביבה נעימה ומרגיעה, עם צוות מנוסה המתרמה בהרגעת חרדות
      </div>
      {/* English (or placeholder) text */}
      <div className="mt-3 md:mt-6 text-base md:text-lg text-[#4453A6]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui. Curabitur et odio vel orci scelerisque malesuada.
      </div>
      {/* Decorative bottom left star */}
      <span className="absolute bottom-4 left-6 text-[2rem] text-[#FCA5A5]/80 select-none" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 2.6l3.53 7.13 7.87 1.14-5.7 5.56 1.35 7.85L16 21.87l-7.05 3.71 1.35-7.85-5.7-5.56 7.87-1.14L16 2.6z" stroke="#FCA5A5" strokeWidth="2" fill="none"/>
        </svg>
      </span>
    </div>
  </section>
);

export default ChildrenDentistryCard;

