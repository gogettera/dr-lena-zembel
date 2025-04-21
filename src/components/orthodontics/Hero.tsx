
import React from "react";
import { Book } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";

const OrthodonticsHero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative py-10 md:py-24 px-4 bg-[#E5DEFF] overflow-hidden scroll-mt-24"
    >
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#8B5CF6]/10 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-[#0EA5E9]/10 pointer-events-none" />
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20 relative z-10">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center mb-5 md:mb-0">
          <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            <OptimizedImage
              src="/images/ortho-hero.jpg"
              alt="יישור שיניים במרפאה"
              className="rounded-3xl shadow-lg w-[340px] md:w-[420px] h-auto object-cover border-4 border-white"
            />
            <Book className="absolute -top-8 rtl:-right-8 left-1/2 -translate-x-1/2 h-14 w-14 text-[#9b87f5] bg-white rounded-full border shadow-lg p-2 animate-pulse" />
          </div>
        </div>
        {/* Hero Text */}
        <div className="md:w-1/2 text-center md:text-right flex flex-col items-center md:items-end">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#6E59A5] font-[Heebo] leading-snug opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            חיוך ישר – בריאות וביטחון עצמי לכל החיים
          </h1>
          <p className="text-lg md:text-xl text-[#6E59A5]/80 mb-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            יישור שיניים מותאם אישית, באווירה נעימה ובגישה חדשנית לטיפול במבוגרים ובילדים.
          </p>
        </div>
      </div>
    </section>
  );
};
export default OrthodonticsHero;
