
import React from "react";
import OralRehabilitationConversionHero from "./OralRehabilitationConversionHero";
import OralRehabilitationBookingCTA from "./OralRehabilitationBookingCTA";
import OralRehabilitationWhatIs from "./OralRehabilitationWhatIs";
import OralRehabilitationBenefits from "./OralRehabilitationBenefits";
import OralRehabilitationProcess from "./OralRehabilitationProcess";
import OralRehabilitationBeforeAfter from "./OralRehabilitationBeforeAfter";
import OralRehabilitationSocialProof from "./OralRehabilitationSocialProof";
import OralRehabilitationTrustDoctor from "./OralRehabilitationTrustDoctor";
import FAQ from "./FAQ";

const OralRehabilitationLanding = () => (
  <div>
    {/* Hero section with CTAs and immediate hook */}
    <OralRehabilitationConversionHero />
    <div className="sticky top-0 z-40 bg-dental-orange/90">
      {/* Always-visible WhatsApp/phone CTA (mobile-friendly) */}
      <OralRehabilitationBookingCTA />
    </div>
    {/* Nuvia-style explanation: What is Oral Rehabilitation? */}
    <OralRehabilitationWhatIs />
    <OralRehabilitationBenefits />
    <OralRehabilitationProcess />
    {/* Strong Before/After visual storytelling */}
    <OralRehabilitationBeforeAfter />
    {/* Why choose us? Trust Doctor */}
    <OralRehabilitationTrustDoctor />
    {/* Patient Stories / Testimonials */}
    <OralRehabilitationSocialProof />
    {/* FAQ section */}
    <FAQ />
    <div className="mb-6" />
    {/* Final CTA */}
    <OralRehabilitationBookingCTA />
  </div>
);

export default OralRehabilitationLanding;
