
import React, { useEffect } from "react";
import { Section } from "@/components/ui/section";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import StoryBlock from "./StoryBlock";
import VisitSteps from "./VisitSteps";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import DoctorSpotlight from "./DoctorSpotlight";
import BookVisitAnchor from "./BookVisitAnchor";
import StickyNavigation from "./StickyNavigation";
import ClinicExpertise from "./ClinicExpertise";

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

      {/* HERO */}
      <Section background="none" spacing="none" containerClass="px-0">
        <Hero />
      </Section>

      {/* Story Block - NEW UPDATED */}
      <Section background="none" spacing="none" containerClass="px-0">
        <StoryBlock />
      </Section>

      {/* Why Us Section - premium feel */}
      <Section background="beige" spacing="md" maxWidth="xl">
        <WhyUs />
      </Section>
      
      {/* Visit Steps - REDESIGNED */}
      <Section background="none" spacing="none" containerClass="px-0">
        <VisitSteps />
      </Section>
      
      {/* Doctor Spotlight - ENHANCED */}
      <Section background="none" spacing="none" containerClass="px-0">
        <DoctorSpotlight />
      </Section>

      {/* Testimonials */}
      <Section background="white" spacing="none" containerClass="px-0">
        <Testimonials />
      </Section>

      {/* Clinic Expertise / Credentials */}
      <Section background="white" spacing="md" maxWidth="lg">
        <ClinicExpertise />
      </Section>
      
      {/* FAQ - IMPROVED */}
      <Section background="none" spacing="none" containerClass="px-0">
        <FAQ />
      </Section>
      
      {/* Book Visit/Info Anchor - ENHANCED */}
      <Section background="none" spacing="none" containerClass="px-0">
        <BookVisitAnchor />
      </Section>
    </div>
  );
};

export default ChildrenDentistryLanding;
