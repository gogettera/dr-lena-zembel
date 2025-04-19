
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackToTop from '@/components/BackToTop';

// Define the treatment types and their data
const treatmentTypes = {
  'children-dentistry': {
    icon: 'children.jpg',
    imageUrl: '/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg'
  },
  'aesthetic-treatments': {
    icon: 'aesthetic.jpg',
    imageUrl: '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg'
  },
  'preventive-medicine': {
    icon: 'preventive.jpg',
    imageUrl: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg'
  },
  'root-canal': {
    icon: 'root-canal.jpg',
    imageUrl: '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg'
  },
  'oral-rehabilitation': {
    icon: 'rehabilitation.jpg',
    imageUrl: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg'
  },
  'orthodontics': {
    icon: 'orthodontics.jpg',
    imageUrl: '/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg'
  }
};

type TreatmentKey = keyof typeof treatmentTypes;

const TreatmentPage: React.FC = () => {
  const { treatmentType } = useParams<{ treatmentType: string }>();
  const { t, language } = useLanguage();
  
  // Get the treatment data based on the URL parameter
  const treatment = treatmentType && treatmentTypes[treatmentType as TreatmentKey];
  
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [treatmentType]);
  
  // Check if this is a valid treatment type
  if (!treatment) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-dental-navy">{t('treatmentNotFound')}</h1>
          <Link to="/">
            <Button className="mt-4">{t('backToHome')}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Get the treatment name translation key based on the treatmentType
  const getTreatmentNameKey = () => {
    switch(treatmentType) {
      case 'children-dentistry': return 'childrenDentistry';
      case 'aesthetic-treatments': return 'aestheticTreatments';
      case 'preventive-medicine': return 'preventiveMedicine';
      case 'root-canal': return 'rootCanal';
      case 'oral-rehabilitation': return 'oralRehabilitation';
      case 'orthodontics': return 'orthodontics';
      default: return '';
    }
  };

  // Get the treatment description translation key based on the treatmentType
  const getTreatmentDescKey = () => {
    switch(treatmentType) {
      case 'children-dentistry': return 'childrenDentistryDesc';
      case 'aesthetic-treatments': return 'aestheticTreatmentsDesc';
      case 'preventive-medicine': return 'preventiveMedicineDesc';
      case 'root-canal': return 'rootCanalDesc';
      case 'oral-rehabilitation': return 'oralRehabilitationDesc';
      case 'orthodontics': return 'orthodonticsDesc';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-dental-beige via-dental-pink to-dental-beige py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: `url(${treatment.imageUrl})` }}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-dental-navy hover:text-dental-orange">
                    {t('home')}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  {language === 'he' || language === 'ar' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/#treatments" className="text-dental-navy hover:text-dental-orange">
                    {t('treatments')}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  {language === 'he' || language === 'ar' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <span className="text-dental-orange font-medium">
                    {t(getTreatmentNameKey())}
                  </span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dental-navy mb-6 leading-tight opacity-0 animate-[fade-in_0.8s_ease-out_forwards]">
                {t(getTreatmentNameKey())}
              </h1>
              
              <p className="text-xl md:text-2xl text-dental-navy mb-10 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
                {t(getTreatmentDescKey())}
              </p>
              
              <div className="space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse md:flex md:justify-center md:items-center opacity-0 animate-[fade-in_0.5s_ease-out_0.6s_forwards]">
                <Button 
                  variant="orange" 
                  size="lg" 
                  className="rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg w-full md:w-auto"
                >
                  {t('bookVisit')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Content Section - This would be expanded with real content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-dental-beige/20 p-8 rounded-xl mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-4">
                  {t(getTreatmentNameKey())}
                </h2>
                <p className="text-lg text-dental-navy/80 mb-6">
                  {t(getTreatmentDescKey())}
                </p>
                <p className="text-lg text-dental-navy/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui. Curabitur et odio vel orci scelerisque malesuada.
                </p>
              </div>
              
              {/* Placeholder for treatment-specific content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={treatment.imageUrl} 
                    alt={t(getTreatmentNameKey())} 
                    className="rounded-xl shadow-lg w-full h-auto"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dental-navy mb-4">
                    {t('ourApproach')}
                  </h3>
                  <p className="text-dental-navy/80 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros.
                  </p>
                  <h3 className="text-xl font-bold text-dental-navy mb-4 mt-6">
                    {t('benefits')}
                  </h3>
                  <ul className="list-disc list-inside text-dental-navy/80 space-y-2">
                    <li>Benefit 1</li>
                    <li>Benefit 2</li>
                    <li>Benefit 3</li>
                    <li>Benefit 4</li>
                  </ul>
                </div>
              </div>
              
              {/* Call to action */}
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold text-dental-navy mb-6">
                  {t('readyToStart')}
                </h3>
                <Button 
                  variant="orange" 
                  size="lg" 
                  className="rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  {t('bookVisit')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default TreatmentPage;
