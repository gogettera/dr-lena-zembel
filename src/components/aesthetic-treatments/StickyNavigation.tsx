
import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const StickyNavigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-20 left-0 w-full z-40 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-20"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-md shadow-md rounded-full flex justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between md:justify-center w-full py-2 px-4 space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => scrollToSection("hero")}
              className="whitespace-nowrap min-w-fit px-3 py-1.5 rounded-full text-sm font-medium text-dental-navy hover:bg-dental-beige/20"
            >
              מבוא
            </button>
            <button
              onClick={() => scrollToSection("treatments")}
              className="whitespace-nowrap min-w-fit px-3 py-1.5 rounded-full text-sm font-medium text-dental-navy hover:bg-dental-beige/20"
            >
              סוגי טיפולים
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="whitespace-nowrap min-w-fit px-3 py-1.5 rounded-full text-sm font-medium text-dental-navy hover:bg-dental-beige/20"
            >
              יתרונות
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="whitespace-nowrap min-w-fit px-3 py-1.5 rounded-full text-sm font-medium text-dental-navy hover:bg-dental-beige/20"
            >
              תהליך הטיפול
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="whitespace-nowrap min-w-fit px-3 py-1.5 rounded-full text-sm font-medium text-dental-navy hover:bg-dental-beige/20"
            >
              המלצות
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="whitespace-nowrap min-w-fit px-3 py-1.5 rounded-full text-sm font-medium text-dental-navy hover:bg-dental-beige/20"
            >
              שאלות נפוצות
            </button>
          </div>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-dental-orange/10 hover:bg-dental-orange/20 p-2 rounded-full mr-2 my-1 hidden md:flex"
            aria-label="חזרה למעלה"
          >
            <ChevronUp className="h-5 w-5 text-dental-orange" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StickyNavigation;
