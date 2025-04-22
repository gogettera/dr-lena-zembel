
import React, { useEffect } from "react";
import { Section } from "@/components/ui/section";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import DoctorStory from "./DoctorStory";
import VisitSteps from "./VisitSteps";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import BookVisitAnchor from "./BookVisitAnchor";
import { useLanguage } from "@/contexts/LanguageContext";

const RootCanalLanding: React.FC = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <a href="#hero" className="skip-to-content">
        {t("accessibility.skipToContent", "Skip to main content")}
      </a>
      
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
