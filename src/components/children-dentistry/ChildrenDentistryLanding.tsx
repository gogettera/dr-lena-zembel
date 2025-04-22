
import React, { useEffect } from "react";
import { Section } from "@/components/ui/section";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import DoctorStory from "./DoctorStory";
import VisitSteps from "./VisitSteps";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import QuickContactForm from "./QuickContactForm";
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

      {/* Why Us Section - premium feel */}
      <Section background="beige" spacing="md" maxWidth="xl">
        <WhyUs />
      </Section>

      {/* Doctor Story */}
      <Section background="none" spacing="none" containerClass="px-0">
        <DoctorStory />
      </Section>
      
      {/* Visit Steps */}
      <Section background="none" spacing="none" containerClass="px-0">
        <VisitSteps />
      </Section>
      
      {/* Testimonials */}
      <Section background="none" spacing="none" containerClass="px-0">
        <Testimonials />
      </Section>

      {/* Clinic Expertise / Credentials */}
      <Section background="white" spacing="md" maxWidth="lg">
        <ClinicExpertise />
      </Section>
      
      {/* FAQ */}
      <Section background="none" spacing="none" containerClass="px-0">
        <FAQ />
      </Section>
      
      {/* Quick Contact Form */}
      <Section background="none" spacing="none" containerClass="px-0">
        <QuickContactForm />
      </Section>
      
      {/* Book Visit/Info Anchor */}
      <Section background="none" spacing="none" containerClass="px-0">
        <BookVisitAnchor />
      </Section>
    </div>
  );
};

export default ChildrenDentistryLanding;
