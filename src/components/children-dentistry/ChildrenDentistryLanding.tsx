
import React, { useEffect } from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import DoctorStory from "./DoctorStory";
import VisitSteps from "./VisitSteps";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Plans from "./Plans";
import QuickContactForm from "./QuickContactForm";
import BookVisitAnchor from "./BookVisitAnchor";
import StickyNavigation from "./StickyNavigation";

const ChildrenDentistryLanding: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#FFDEE2]/40 via-[#D3E4FD]/20 to-[#F1F0FB]/50 overflow-x-hidden">
      {/* Skip to content link for accessibility */}
      <a href="#hero" className="skip-to-content">דלג לתוכן העיקרי</a>
      
      {/* Sticky Navigation */}
      <StickyNavigation />
      
      {/* Main content */}
      <Hero />
      <WhyUs />
      <DoctorStory />
      <VisitSteps />
      <Testimonials />
      <FAQ />
      <Plans />
      <QuickContactForm />
      <BookVisitAnchor />
    </div>
  );
};

export default ChildrenDentistryLanding;
