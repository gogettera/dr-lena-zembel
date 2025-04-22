
import React, { useEffect } from "react";
import { Section } from "@/components/ui/section";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import DoctorStory from "./DoctorStory";
import VisitSteps from "./VisitSteps";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import BookVisitAnchor from "./BookVisitAnchor";

const RootCanalLanding: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <a href="#hero" className="skip-to-content">דלג לתוכן העיקרי</a>
      
      <Section background="none" spacing="none" containerClass="px-0">
        <Hero />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0">
        <WhyUs />
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
        <BookVisitAnchor />
      </Section>
    </div>
  );
};

export default RootCanalLanding;
