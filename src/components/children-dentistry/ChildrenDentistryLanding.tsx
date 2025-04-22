
import React, { useEffect } from "react";
import { Section } from "@/components/ui/section";
import Hero from "./Hero";
import DoctorStory from "./DoctorStory";
import VisitSteps from "./VisitSteps";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import QuickContactForm from "./QuickContactForm";
import BookVisitAnchor from "./BookVisitAnchor";
import StickyNavigation from "./StickyNavigation";

const ChildrenDentistryLanding: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Skip to content link for accessibility */}
      <a href="#hero" className="skip-to-content">דלג לתוכן העיקרי</a>

      {/* Sticky Navigation */}
      <StickyNavigation />

      {/* HERO at very top as page opener */}
      <Section background="none" spacing="none" containerClass="px-0">
        <Hero />
      </Section>

      <Section background="none" spacing="none" containerClass="px-0">
        <DoctorStory />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0">
        <VisitSteps />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0">
        <Testimonials />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0">
        <FAQ />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0">
        <QuickContactForm />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0">
        <BookVisitAnchor />
      </Section>
    </div>
  );
};

export default ChildrenDentistryLanding;
