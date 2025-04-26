
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { NavigationButton } from '@/components/ui/navigation-button';
import { useDirectionalStyles } from '@/utils/direction';

const StickyNavigation: React.FC = () => {
  const { t } = useLanguage();
  const dirStyles = useDirectionalStyles();
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { id: 'treatment-types', label: t('treatments') },
    { id: 'benefits', label: t('botoxTreatments.benefitsTitle') },
    { id: 'process', label: t('botoxTreatments.processTitle') },
    { id: 'before-after', label: t('botoxTreatments.beforeAfterTitle') },
    { id: 'doctor', label: t('botoxTreatments.doctorTitle') },
    { id: 'safety', label: t('botoxTreatments.safetyTitle') },
    { id: 'comparison', label: t('botoxTreatments.treatmentComparison.title') },
    { id: 'testimonials', label: t('testimonials') },
    { id: 'faq', label: t('faq') },
    { id: 'booking', label: t('bookVisit') }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentActiveSection = '';
      const scrollPosition = window.scrollY + 300;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');

        if (
          sectionId &&
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentActiveSection = sectionId;
        }
      });

      setActiveSection(currentActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="sticky top-20 z-30 bg-white shadow-md py-2 border-b border-dental-beige/20">
      <div className="container mx-auto overflow-x-auto">
        <div className={`flex gap-2 ${dirStyles.flexDir}`}>
          {navItems.map((item) => (
            <NavigationButton
              key={item.id}
              isActive={activeSection === item.id}
              variant={activeSection === item.id ? 'active' : 'ghost'}
              className="whitespace-nowrap text-sm"
              onClick={() => {
                const element = document.getElementById(item.id);
                if (element) {
                  const topOffset = element.offsetTop - 120;
                  window.scrollTo({
                    top: topOffset,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              {item.label}
            </NavigationButton>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default StickyNavigation;
