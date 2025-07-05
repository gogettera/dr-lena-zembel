
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Star, Users, Shield, Heart, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import HeroSection from '@/components/HeroSection';
import ProfessionalCredentials from '@/components/trust/ProfessionalCredentials';
import TrustBadges from '@/components/trust/TrustBadges';
import EnhancedTestimonials from '@/components/trust/EnhancedTestimonials';
import DoctorStorySection from '@/components/trust/DoctorStorySection';

const HomePage: React.FC = () => {
  const { language, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Advanced Hero Section */}
      <HeroSection />

      {/* Trust Badges - Premium Stats */}
      <TrustBadges />

      {/* Services Overview - Enhanced */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dental-navy mb-6">
              <TranslatedText textKey="navigation.ourTreatments" />
            </h2>
            <p className="text-xl text-dental-navy/70 max-w-3xl mx-auto">
              <TranslatedText textKey="navigation.wideRangeOfTreatments" />
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-dental-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-dental-orange/20 transition-colors">
                  <Heart className="w-10 h-10 text-dental-orange" />
                </div>
                <h3 className="text-2xl font-semibold text-dental-navy mb-4">
                  <TranslatedText textKey="navigation.childrenDentistry" />
                </h3>
                <p className="text-dental-navy/70 mb-6">
                  Gentle dental care for children in a friendly environment with specialized pediatric techniques.
                </p>
                <Button variant="outline" asChild className="group-hover:bg-dental-orange group-hover:text-white transition-colors">
                  <Link to={`/${language}/treatments/children-dentistry/landing`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-dental-sky/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-dental-sky/20 transition-colors">
                  <Shield className="w-10 h-10 text-dental-sky" />
                </div>
                <h3 className="text-2xl font-semibold text-dental-navy mb-4">
                  <TranslatedText textKey="navigation.preventiveMedicine" />
                </h3>
                <p className="text-dental-navy/70 mb-6">
                  Comprehensive preventive care to maintain optimal oral health and prevent dental issues.
                </p>
                <Button variant="outline" asChild className="group-hover:bg-dental-sky group-hover:text-white transition-colors">
                  <Link to={`/${language}/treatments/preventive-medicine/landing`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-dental-azure/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-dental-azure/20 transition-colors">
                  <Star className="w-10 h-10 text-dental-azure" />
                </div>
                <h3 className="text-2xl font-semibold text-dental-navy mb-4">
                  <TranslatedText textKey="navigation.aestheticTreatments" />
                </h3>
                <p className="text-dental-navy/70 mb-6">
                  Modern aesthetic dental solutions for a perfect smile including veneers and whitening.
                </p>
                <Button variant="outline" asChild className="group-hover:bg-dental-azure group-hover:text-white transition-colors">
                  <Link to={`/${language}/treatments/aesthetic-treatments/landing`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-dental-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-dental-accent/20 transition-colors">
                  <Users className="w-10 h-10 text-dental-accent" />
                </div>
                <h3 className="text-2xl font-semibold text-dental-navy mb-4">
                  <TranslatedText textKey="navigation.orthodontics" />
                </h3>
                <p className="text-dental-navy/70 mb-6">
                  Advanced orthodontic treatments including Invisalign and traditional braces for all ages.
                </p>
                <Button variant="outline" asChild className="group-hover:bg-dental-accent group-hover:text-white transition-colors">
                  <Link to={`/${language}/treatments/orthodontics/landing`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-dental-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-dental-orange/20 transition-colors">
                  <Award className="w-10 h-10 text-dental-orange" />
                </div>
                <h3 className="text-2xl font-semibold text-dental-navy mb-4">
                  <TranslatedText textKey="navigation.rootCanal" />
                </h3>
                <p className="text-dental-navy/70 mb-6">
                  Pain-free root canal treatments using the latest endodontic technology and techniques.
                </p>
                <Button variant="outline" asChild className="group-hover:bg-dental-orange group-hover:text-white transition-colors">
                  <Link to={`/${language}/treatments/root-canal/landing`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-dental-sky/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-dental-sky/20 transition-colors">
                  <Heart className="w-10 h-10 text-dental-sky" />
                </div>
                <h3 className="text-2xl font-semibold text-dental-navy mb-4">
                  <TranslatedText textKey="navigation.botoxTreatments" />
                </h3>
                <p className="text-dental-navy/70 mb-6">
                  Professional botox treatments for facial aesthetics and therapeutic dental applications.
                </p>
                <Button variant="outline" asChild className="group-hover:bg-dental-sky group-hover:text-white transition-colors">
                  <Link to={`/${language}/treatments/botox-treatments`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Doctor Story - Enhanced Trust Section */}
      <DoctorStorySection />

      {/* Professional Credentials */}
      <ProfessionalCredentials />

      {/* Enhanced Testimonials with Trust Elements */}
      <EnhancedTestimonials />

      {/* Emergency & Contact Section */}
      <section className="py-20 bg-dental-beige/30">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dental-navy mb-4">
              Ready to Schedule Your Visit?
            </h2>
            <p className="text-xl text-dental-navy/70 max-w-2xl mx-auto">
              Contact us today to book your appointment or learn more about our comprehensive dental services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Phone className="w-12 h-12 text-dental-orange mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-dental-navy mb-4">Call Us</h3>
                <p className="text-dental-navy/70 mb-4">03-566-6915</p>
                <p className="text-sm text-dental-navy/60">Available for appointments and emergencies</p>
                <Button variant="outline" className="mt-4" asChild>
                  <a href="tel:035666915">Call Now</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <MapPin className="w-12 h-12 text-dental-sky mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-dental-navy mb-4">Visit Us</h3>
                <p className="text-dental-navy/70 mb-4">North Jaffa<br />Tel Aviv, Israel</p>
                <p className="text-sm text-dental-navy/60">Convenient city center location</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to={`/${language}/contact`}>Get Directions</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-dental-azure mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-dental-navy mb-4">Hours</h3>
                <div className="text-dental-navy/70 mb-4">
                  <p>Sun-Thu: 9:00-18:00</p>
                  <p>Friday: 9:00-13:00</p>
                  <p>Saturday: Closed</p>
                </div>
                <Button variant="outline" className="mt-4" asChild>
                  <a href="https://wa.me/972566691503" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-dental-orange text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Experience Professional Dental Care Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust Dr. Zembel for their dental health needs.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white text-dental-orange hover:bg-dental-beige border-white"
                asChild
              >
                <a href="tel:035666915">
                  <Phone className="w-5 h-5 mr-2" />
                  <TranslatedText textKey="common.bookVisit" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-dental-orange"
                asChild
              >
                <Link to={`/${language}/contact`}>
                  <Calendar className="w-5 h-5 mr-2" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
