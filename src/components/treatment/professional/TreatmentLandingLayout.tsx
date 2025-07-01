
import React from 'react';
import { Section } from '@/components/ui/section';

interface TreatmentLandingLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const TreatmentLandingLayout: React.FC<TreatmentLandingLayoutProps> = ({ 
  children, 
  className = "overflow-x-hidden" 
}) => {
  return (
    <div className={className}>
      <a href="#hero" className="skip-to-content">דלג לתוכן העיקרי</a>
      
      {React.Children.map(children, (child, index) => (
        <Section key={index} background="none" spacing="none" containerClass="px-0">
          {child}
        </Section>
      ))}
    </div>
  );
};

export default TreatmentLandingLayout;
