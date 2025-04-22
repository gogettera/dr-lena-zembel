
import React, { useEffect } from "react";
import { Section } from "@/components/ui/section";
import Hero from "./Hero";
import DoctorStory from "./DoctorStory";
import WhyUs from "./WhyUs";
import VisitSteps from "./VisitSteps";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import QuickContactForm from "./QuickContactForm";
import BookVisitAnchor from "./BookVisitAnchor";
import StickyNavigation from "./StickyNavigation";
import Plans from "./Plans";

const ChildrenDentistryLanding: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden relative bg-[#FFF1F2] min-h-screen">
      {/* Decorative playful background shapes */}
      <div className="absolute top-[-80px] left-[-70px] w-[200px] h-[200px] bg-gradient-to-tr from-[#FFDEE2] via-[#D3E4FD] to-[#FDF4F0] rounded-full opacity-70 blur-2xl z-0" aria-hidden />
      <div className="absolute bottom-[-100px] right-[-80px] w-[260px] h-[180px] bg-gradient-to-br from-[#D3E4FD] via-[#FFDEE2]/80 to-[#FDF4F0] rounded-[100px] opacity-60 blur-2xl z-0" aria-hidden />
      {/* Skip to content link for accessibility */}
      <a href="#hero" className="skip-to-content z-20">דלג לתוכן העיקרי</a>
      {/* Sticky Navigation */}
      <StickyNavigation />

      {/* HERO at very top as page opener */}
      <Section background="none" spacing="none" containerClass="px-0">
        <Hero />
      </Section>

      {/* Why Us: main premium kid-friendly features */}
      <Section background="none" spacing="none" containerClass="px-0">
        <WhyUs />
      </Section>

      {/* Doctor Story section */}
      <Section background="none" spacing="none" containerClass="px-0">
        <DoctorStory />
      </Section>
      
      {/* Playful process: Visit steps */}
      <Section background="none" spacing="none" containerClass="px-0">
        <VisitSteps />
      </Section>
      
      {/* Happy parent testimonials */}
      <Section background="none" spacing="none" containerClass="px-0">
        <Testimonials />
      </Section>
      
      {/* Highlight insurance & payment plans */}
      <Section background="none" spacing="none" containerClass="px-0">
        <Plans />
      </Section>
      
      {/* FAQ section */}
      <Section background="none" spacing="none" containerClass="px-0">
        <FAQ />
      </Section>
      
      {/* Quick contact form - playful, inviting */}
      <Section background="none" spacing="none" containerClass="px-0">
        <QuickContactForm />
      </Section>
      
      {/* Final call to action */}
      <Section background="none" spacing="none" containerClass="px-0">
        <BookVisitAnchor />
      </Section>
    </div>
  );
};

export default ChildrenDentistryLanding;

