
import React, { useEffect } from "react";
import { Section } from "@/components/ui/section";
import EnhancedHero from "./EnhancedHero";
import EnhancedWhyUs from "./EnhancedWhyUs";
import DoctorStory from "./DoctorStory";
import VisitSteps from "./VisitSteps";
import EnhancedTestimonials from "./EnhancedTestimonials";
import FAQ from "./FAQ";
import QuickContactForm from "./QuickContactForm";
import BookVisitAnchor from "./BookVisitAnchor";
import StickyNavigation from "./StickyNavigation";
import ClinicExpertise from "./ClinicExpertise";

const ChildrenDentistryLanding: React.FC = () => {
  useEffect(() => {
    console.log('ChildrenDentistryLanding component mounted');
    window.scrollTo(0, 0);
    
    // Update page title and meta description
    document.title = "רפואת שיניים לילדים - החוויה הטובה ביותר | ד״ר לנה זמבל";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'טיפולי שיניים מקצועיים לילדים עם צוות מומחה שיודע לגרום לכל ילד להרגיש בטוח ושמח. 13+ שנות ניסיון, 98% שביעות רצון הורים.');
    }
  }, []);

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
          <EnhancedHero />
        </Section>

        {/* Why Us Section - Enhanced */}
        <Section background="none" spacing="none" containerClass="px-0">
          <EnhancedWhyUs />
        </Section>

        {/* Doctor Story */}
        <Section background="none" spacing="none" containerClass="px-0">
          <DoctorStory />
        </Section>
        
        {/* Visit Steps */}
        <Section background="none" spacing="none" containerClass="px-0">
          <VisitSteps />
        </Section>
        
        {/* Enhanced Testimonials */}
        <Section background="none" spacing="none" containerClass="px-0">
          <EnhancedTestimonials />
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
