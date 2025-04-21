
import React from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import DoctorStory from "./DoctorStory";
import VisitSteps from "./VisitSteps";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Plans from "./Plans";
import QuickContactForm from "./QuickContactForm";
import BookVisitAnchor from "./BookVisitAnchor";

const ChildrenDentistryLanding: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#FFDEE2]/40 via-[#D3E4FD]/20 to-[#F1F0FB]/50">
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
