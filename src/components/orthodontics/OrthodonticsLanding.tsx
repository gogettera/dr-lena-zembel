
import React, { useEffect } from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import DoctorStory from "./DoctorStory";
import VisitSteps from "./VisitSteps";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import BookVisitAnchor from "./BookVisitAnchor";

const OrthodonticsLanding: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#E5DEFF]/40 via-[#F1F0FB]/20 to-[#FDF4F0]/50 overflow-x-hidden">
      <a href="#hero" className="skip-to-content">דלג לתוכן העיקרי</a>
      <Hero />
      <WhyUs />
      <DoctorStory />
      <VisitSteps />
      <Testimonials />
      <FAQ />
      <BookVisitAnchor />
    </div>
  );
};

export default OrthodonticsLanding;
