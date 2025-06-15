
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
import SiteAuditDashboard from "@/components/admin/SiteAuditDashboard";

const ChildrenDentistryLanding: React.FC = () => {
  // Debug logging
  useEffect(() => {
    console.log('ChildrenDentistryLanding component mounted');
    window.scrollTo(0, 0);
  }, []);

  // Add error boundary for this component
  try {
    console.log('Rendering ChildrenDentistryLanding');
    
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
        
        {/* Site Audit Dashboard */}
        <div className="my-16 border-t-4 border-dashed border-dental-orange pt-16">
          <Section background="white" spacing="md" maxWidth="full" id="site-audit">
            <h2 className="text-3xl font-bold text-center text-dental-navy mb-12">Site Health Audit (For Admin Review)</h2>
            <SiteAuditDashboard />
          </Section>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in ChildrenDentistryLanding:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-dental-beige">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-dental-navy mb-4">
            Children Dentistry Page Error
          </h1>
          <p className="text-dental-navy/80">
            There was an error loading this page. Please check the console for details.
          </p>
        </div>
      </div>
    );
  }
};

export default ChildrenDentistryLanding;
