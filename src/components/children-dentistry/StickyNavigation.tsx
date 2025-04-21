
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Menu, X } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "ראשי" },
  { id: "why-us", label: "למה אנחנו" },
  { id: "visit-steps", label: "מהלך הביקור" },
  { id: "testimonials", label: "עדויות" },
  { id: "faq", label: "שאלות נפוצות" },
  { id: "contact", label: "צור קשר" },
];

const StickyNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine active section based on scroll position
      const sections = SECTIONS.map(section => ({
        id: section.id,
        offset: document.getElementById(section.id)?.offsetTop || 0,
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offset) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-0 right-0 z-40 px-4 transition-all duration-300 ease-in-out">
      <div className="bg-white/90 shadow-soft backdrop-blur-sm rounded-full max-w-3xl mx-auto border border-dental-beige/30">
        {isMobile ? (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center justify-between px-4 py-2">
              <Button 
                variant="orange" 
                size="sm" 
                className="rounded-full text-sm font-bold"
                onClick={() => window.location.href = "#book-appointment"}
              >
                קביעת תור
              </Button>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="py-2 px-4 space-y-2">
                {SECTIONS.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    className={`w-full justify-start ${
                      activeSection === section.id ? "text-dental-orange font-bold" : "text-dental-navy/70"
                    }`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.label}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-1 space-x-reverse">
              {SECTIONS.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  className={`px-3 rounded-full ${
                    activeSection === section.id ? "text-dental-orange font-bold" : "text-dental-navy/70"
                  }`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </Button>
              ))}
            </div>
            <Button 
              variant="orange" 
              size="sm" 
              className="rounded-full text-sm font-bold"
              onClick={() => window.location.href = "#book-appointment"}
            >
              קביעת תור
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyNavigation;
