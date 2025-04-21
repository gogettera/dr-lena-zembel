
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDirectionalStyles } from '@/utils/direction';
import { Section, useActiveSection } from '@/hooks/use-active-section';
import { Button } from '@/components/ui/button';
import { NavigationButton } from '@/components/ui/navigation-button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronUp, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StickyNavigationProps {
  sections: Section[];
  /** Callback for the main CTA button (optional) */
  ctaButton?: {
    label: string;
    onClick: () => void;
    href?: string;
  };
  /** The offset from the top of the page when navigation becomes visible */
  scrollOffset?: number;
  /** CSS class to apply to the container */
  className?: string;
  /** Whether to show a back-to-top button */
  showBackToTop?: boolean;
}

export const BaseStickyNavigation: React.FC<StickyNavigationProps> = ({
  sections,
  ctaButton,
  scrollOffset = 300,
  className,
  showBackToTop = true,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const { t, isRTL } = useLanguage();
  const styles = useDirectionalStyles();
  
  const { activeSection, isVisible, scrollToSection } = useActiveSection({
    sections,
    offset: scrollOffset,
  });

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed top-4 left-0 right-0 z-40 px-4 transition-all duration-300 ease-in-out",
        className
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-white/90 shadow-soft backdrop-blur-sm rounded-full max-w-3xl mx-auto border border-dental-beige/30">
        {isMobile ? (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className={cn("flex items-center justify-between px-4 py-2", styles.flexDir)}>
              {ctaButton && (
                <Button 
                  variant="orange" 
                  size="sm" 
                  className="rounded-full text-sm font-bold"
                  onClick={ctaButton.onClick}
                  asChild={!!ctaButton.href}
                >
                  {ctaButton.href ? (
                    <a href={ctaButton.href}>{ctaButton.label}</a>
                  ) : (
                    ctaButton.label
                  )}
                </Button>
              )}
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="py-2 px-4 space-y-2">
                {sections.map((section) => (
                  <NavigationButton
                    key={section.id}
                    variant="ghost"
                    className="w-full justify-start"
                    isActive={activeSection === section.id}
                    onClick={() => {
                      scrollToSection(section.id);
                      setIsOpen(false);
                    }}
                  >
                    {section.label}
                  </NavigationButton>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <div className={cn("flex items-center justify-between px-4 py-2", styles.flexDir)}>
            <div className={cn("flex items-center space-x-1", styles.spaceDir)}>
              {sections.map((section) => (
                <NavigationButton
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  className="px-3 rounded-full"
                  isActive={activeSection === section.id}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </NavigationButton>
              ))}
            </div>
            
            <div className={cn("flex items-center space-x-2", styles.spaceDir)}>
              {ctaButton && (
                <Button 
                  variant="orange" 
                  size="sm" 
                  className="rounded-full text-sm font-bold"
                  onClick={ctaButton.onClick}
                  asChild={!!ctaButton.href}
                >
                  {ctaButton.href ? (
                    <a href={ctaButton.href}>{ctaButton.label}</a>
                  ) : (
                    ctaButton.label
                  )}
                </Button>
              )}
              
              {showBackToTop && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-dental-orange/10 hover:bg-dental-orange/20 p-2 rounded-full my-1"
                  onClick={handleBackToTop}
                  aria-label={t('backToTop', 'Back to top')}
                >
                  <ChevronUp className="h-5 w-5 text-dental-orange" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseStickyNavigation;
