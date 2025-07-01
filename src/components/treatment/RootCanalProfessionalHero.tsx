
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronLeft, ChevronRight, Phone, Clock, Award, Users, Shield, Calendar, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { createLocalizedPath } from '@/utils/languageRoutes';
import { TranslatedText } from '@/components/ui/translated-text';
import DoctorPortrait from '@/components/shared/DoctorPortrait';

const RootCanalProfessionalHero: React.FC = () => {
  const { t, language, isRTL } = useLanguage();

  const handleBooking = () => {
    const phone = "03-566-6915";
    const whatsapp = `https://wa.me/972515666915?text=${encodeURIComponent('שלום! אני מעוניין/ת בטיפול שורש עם ד"ר לנה זמבל')}`;
    
    if (window.innerWidth <= 768) {
      window.open(whatsapp, '_blank');
    } else {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleEmergencyCall = () => {
    window.location.href = `tel:03-566-6915`;
  };

  return (
    <section className="relative bg-gradient-to-br from-white via-dental-beige/30 to-dental-pink/20 py-8 md:py-12 lg:py-16">
      {/* Medical background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231E3A8A' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <Breadcrumb className="whitespace-nowrap min-w-fit">
            <BreadcrumbList className="flex items-center gap-1 md:gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link 
                    to={createLocalizedPath(language, '/')} 
                    className="text-dental-navy/70 hover:text-dental-orange transition-colors duration-300 text-sm md:text-base font-medium"
                  >
                    <TranslatedText textKey="home" defaultText="בית" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-dental-navy/40">
                {isRTL ? <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" /> : <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />}
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link 
                    to={createLocalizedPath(language, '/#treatments')} 
                    className="text-dental-navy/70 hover:text-dental-orange transition-colors duration-300 text-sm md:text-base font-medium"
                  >
                    <TranslatedText textKey="treatments" defaultText="טיפולים" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-dental-navy/40">
                {isRTL ? <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" /> : <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />}
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <span className="text-dental-orange font-semibold text-sm md:text-base">
                  טיפולי שורש
                </span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dental-navy leading-tight mb-4">
                טיפולי שורש ללא כאב
              </h1>
              <p className="text-lg md:text-xl text-dental-navy/80 leading-relaxed mb-4">
                מציל שיניים, מחזיר ביטחון
              </p>
              <p className="text-base md:text-lg text-dental-navy/70 leading-relaxed">
                עם הטכנולוגיה המתקדמת ביותר אנחנו הופכים טיפול שורש למהיר, יעיל ונוח
              </p>
            </div>

            {/* Professional Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Award className="h-5 w-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80 font-medium">
                  13+ שנות ניסיון
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Users className="h-5 w-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80 font-medium">
                  מאות טיפולים
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Shield className="h-5 w-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80 font-medium">
                  ציוד מתקדם
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Stethoscope className="h-5 w-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80 font-medium">
                  טיפול מקצועי
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleBooking}
                variant="orange" 
                size="lg" 
                className="flex items-center gap-2 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="h-5 w-5" />
                ייעוץ ראשוני חינם
              </Button>
              
              <Button 
                onClick={handleEmergencyCall}
                variant="outline" 
                size="lg" 
                className="flex items-center gap-2 text-lg px-8 py-4 rounded-full border-2 border-dental-orange text-dental-orange hover:bg-dental-orange hover:text-white transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                03-566-6915
              </Button>
            </div>

            <p className="text-sm text-dental-navy/60">
              ייעוץ ראשוני ללא התחייבות • זמינים לחירום 24/7
            </p>
          </div>

          {/* Doctor Profile Card */}
          <div className="lg:col-span-5">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-32 h-32 md:w-40 md:h-40">
                    <DoctorPortrait 
                      style="medical"
                      width={160}
                      height={160}
                      rounded="full"
                      border={true}
                      priority={true}
                      className="mx-auto"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-dental-navy mb-2">
                      ד״ר לנה זמבל
                    </h3>
                    <p className="text-dental-navy/70 mb-4">
                      רופאת שיניים מומחית
                    </p>
                    <div className="space-y-2 text-sm text-dental-navy/60">
                      <p>בוגרת אוניברסיטת קלן, גרמניה</p>
                      <p>מומחית ברפואת שיניים משקמת</p>
                      <p>חברה באיגוד רופאי השיניים</p>
                      <p>מתמחה בטיפולי שורש ללא כאב</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-dental-beige/30">
                    <p className="text-sm text-dental-navy/70 leading-relaxed">
                      "אני מתמחה בטיפולי שורש מתקדמים עם דגש על נוחות המטופל. המטרה שלי היא להציל שיניים ולהחזיר ביטחון בחיוך."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="mt-8 bg-gradient-to-r from-dental-orange/10 to-dental-pink/10 rounded-xl p-4 border border-dental-orange/20">
          <div className="flex items-center justify-center gap-4 text-center">
            <Clock className="h-6 w-6 text-dental-orange flex-shrink-0" />
            <p className="text-dental-navy font-medium">
              זמינים לטיפול חירום 24/7
              <span className="mx-2">•</span>
              <a href="tel:03-566-6915" className="text-dental-orange hover:underline font-bold">
                03-566-6915
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RootCanalProfessionalHero;
