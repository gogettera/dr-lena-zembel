
import { useState, useEffect, useCallback } from 'react';
import { debounce } from '@/utils/direction';

export interface Section {
  id: string;
  label: string;
  href?: string;
}

interface UseActiveSectionOptions {
  sections: Section[];
  offset?: number;
  threshold?: number;
  debounceTime?: number;
}

/**
 * Hook to track active section based on scroll position
 */
export function useActiveSection({
  sections,
  offset = 100,
  threshold = 0.3,
  debounceTime = 100
}: UseActiveSectionOptions) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Determine active section based on scroll position
  const determineActiveSection = useCallback(() => {
    // Show navigation after scrolling down
    if (window.scrollY > offset) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Determine active section based on scroll position
    const sectionElements = sections.map(section => ({
      id: section.id,
      element: document.getElementById(section.id),
    }));

    const scrollPosition = window.scrollY + window.innerHeight * threshold;
    
    // Find the section that is currently in view, starting from the bottom
    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const { id, element } = sectionElements[i];
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(id);
        return;
      }
    }

    // If no section is found, set the first one as active
    if (sectionElements.length > 0 && sectionElements[0].element) {
      setActiveSection(sectionElements[0].id);
    }
  }, [sections, offset, threshold]);

  // Debounce scroll handler for better performance
  const debouncedDetermineActiveSection = useCallback(
    debounce(determineActiveSection, debounceTime),
    [determineActiveSection, debounceTime]
  );

  // Scroll to a specific section
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Adjust scroll position to account for fixed header
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    // Initial check
    determineActiveSection();

    // Set up scroll listener
    window.addEventListener('scroll', debouncedDetermineActiveSection);
    return () => window.removeEventListener('scroll', debouncedDetermineActiveSection);
  }, [debouncedDetermineActiveSection, determineActiveSection]);

  return {
    activeSection,
    isVisible,
    scrollToSection
  };
}
