
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDirectionalStyles } from '@/utils/direction';
import { Button } from '@/components/ui/button';
import { debounce } from '@/utils/direction';

const StickyNavigation: React.FC = () => {
  const { t } = useLanguage();
  const dir = useDirectionalStyles();
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const navSections = [
    { id: 'treatment-types', label: t('treatments') },
    { id: 'benefits', label: t('botoxTreatments.benefitsTitle') },
    { id: 'process', label: t('botoxTreatments.processTitle') },
    { id: 'before-after', label: t('botoxTreatments.beforeAfterTitle') },
    { id: 'doctor', label: t('botoxTreatments.doctorTitle') },
    { id: 'safety', label: t('botoxTreatments.safetyTitle') },
    { id: 'faq', label: t('botoxTreatments.faqTitle') },
    { id: 'booking', label: t('bookVisit') }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = debounce(() => {
      // Only show sticky nav after scrolling past hero section
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 200;
      
      for (let i = navSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(navSections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navSections[i].id);
          break;
        }
      }
    }, 50);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navSections]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 transform">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="overflow-x-auto">
          <nav className={`flex ${dir.spaceDir} gap-2 justify-start items-center`}>
            {navSections.map(section => (
              <Button
                key={section.id}
                variant="ghost"
                size="sm"
                className={`whitespace-nowrap ${
                  activeSection === section.id
                    ? 'text-dental-orange font-medium'
                    : 'text-dental-navy/70'
                }`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default StickyNavigation;
