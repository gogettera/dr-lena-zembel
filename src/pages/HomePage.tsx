
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';

const HomePage: React.FC = () => {
  const { language, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-dental-beige to-white py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-dental-navy mb-6">
              <TranslatedText textKey="common.dentistryWithLove" />
            </h1>
            <p className="text-xl text-dental-navy/80 mb-8 max-w-2xl mx-auto">
              <TranslatedText textKey="common.localDental" />
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button 
                variant="orange" 
                size="lg"
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
                asChild
              >
                <Link to={`/${language}/treatments`}>
                  <TranslatedText textKey="common.learnMore" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dental-navy mb-4">
              <TranslatedText textKey="navigation.ourTreatments" />
            </h2>
            <p className="text-lg text-dental-navy/70">
              <TranslatedText textKey="navigation.wideRangeOfTreatments" />
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-dental-navy mb-3">
                  <TranslatedText textKey="navigation.aestheticTreatments" />
                </h3>
                <p className="text-dental-navy/70 mb-4">
                  Modern aesthetic dental solutions for a perfect smile
                </p>
                <Button variant="outline" asChild>
                  <Link to={`/${language}/treatments/aesthetic-treatments/landing`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-dental-navy mb-3">
                  <TranslatedText textKey="navigation.preventiveMedicine" />
                </h3>
                <p className="text-dental-navy/70 mb-4">
                  Preventive care to maintain your oral health
                </p>
                <Button variant="outline" asChild>
                  <Link to={`/${language}/treatments/preventive-medicine/landing`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-dental-navy mb-3">
                  <TranslatedText textKey="navigation.childrenDentistry" />
                </h3>
                <p className="text-dental-navy/70 mb-4">
                  Gentle dental care for children in a friendly environment
                </p>
                <Button variant="outline" asChild>
                  <Link to={`/${language}/treatments/children-dentistry/landing`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-dental-navy mb-3">
                  <TranslatedText textKey="navigation.orthodontics" />
                </h3>
                <p className="text-dental-navy/70 mb-4">
                  Advanced orthodontic treatments for all ages
                </p>
                <Button variant="outline" asChild>
                  <Link to={`/${language}/treatments/orthodontics/landing`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-dental-navy mb-3">
                  <TranslatedText textKey="navigation.rootCanal" />
                </h3>
                <p className="text-dental-navy/70 mb-4">
                  Pain-free root canal treatments with modern technology
                </p>
                <Button variant="outline" asChild>
                  <Link to={`/${language}/treatments/root-canal/landing`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-dental-navy mb-3">
                  <TranslatedText textKey="navigation.botoxTreatments" />
                </h3>
                <p className="text-dental-navy/70 mb-4">
                  Professional botox treatments for facial aesthetics
                </p>
                <Button variant="outline" asChild>
                  <Link to={`/${language}/treatments/botox-treatments`}>
                    <TranslatedText textKey="common.learnMore" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Information */}
      <section className="py-16 bg-dental-beige/30">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dental-navy mb-4">
              <TranslatedText textKey="navigation.contact" />
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-dental-orange mb-4" />
              <h3 className="text-lg font-semibold text-dental-navy mb-2">
                <TranslatedText textKey="common.call" />
              </h3>
              <a 
                href="tel:035666915" 
                className="text-dental-navy/70 hover:text-dental-orange transition-colors"
              >
                03-566-6915
              </a>
            </div>

            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-dental-orange mb-4" />
              <h3 className="text-lg font-semibold text-dental-navy mb-2">
                Location
              </h3>
              <p className="text-dental-navy/70">
                North Jaffa<br />
                Tel Aviv, Israel
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-dental-orange mb-4" />
              <h3 className="text-lg font-semibold text-dental-navy mb-2">
                Hours
              </h3>
              <p className="text-dental-navy/70">
                Sun-Thu: 9:00-18:00<br />
                Friday: 9:00-13:00
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
