
import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { PhoneOutgoing, MessageCircle, Check, Shield, Heart, Smile } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";
import { EnhancedImage } from "@/components/ui/enhanced-image";

const ChildrenDentistryAdLandingPage: React.FC = () => {
  const { t } = useLanguage();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle booking button click
  const handleBookAppointment = () => {
    // Basic implementation - could be extended with analytics tracking
    const phoneNumber = "03-566-6915";
    window.location.href = `tel:${phoneNumber}`;
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(t('whatsappMessage'));
    window.open(`https://wa.me/972535669150?text=${message}`, '_blank');
  };

  return (
    <div className="overflow-x-hidden">
      {/* Skip to content link for accessibility */}
      <a href="#hero" className="skip-to-content">דלג לתוכן העיקרי</a>

      {/* Sticky CTA for mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg p-3 z-50">
        <Button 
          variant="orange" 
          size="lg"
          className="w-full rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300"
          onClick={handleBookAppointment}
        >
          {t('childrenAdLanding.bookNow')}
        </Button>
      </div>
      
      {/* HERO SECTION */}
      <section id="hero" className="bg-gradient-to-br from-[#FFDEE2]/80 via-[#FFDEE2]/40 to-white py-8 md:py-12 lg:py-16 px-4 scroll-mt-16">
        <div className="container mx-auto">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2 pt-6 md:pt-0 md:pr-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dental-navy mb-4 leading-tight opacity-0 animate-[fade-in_0.8s_ease-out_forwards]">
                {t('childrenAdLanding.hero.title')}
              </h1>
              
              <p className="text-dental-navy/80 text-lg md:text-xl mb-6 opacity-0 animate-[fade-in_0.8s_ease-out_0.2s_forwards]">
                {t('childrenAdLanding.hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fade-in_0.8s_ease-out_0.4s_forwards]">
                <Button 
                  variant="orange" 
                  size="lg"
                  className="rounded-full px-6 py-6 text-lg shadow-lg hover:shadow-glow transition-all duration-300"
                  onClick={handleBookAppointment}
                >
                  {t('childrenAdLanding.hero.cta')}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-dental-navy/60 text-dental-navy hover:bg-dental-navy/5 transition-all duration-300 flex items-center gap-2"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t('childrenAdLanding.hero.secondaryCta')}</span>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 overflow-hidden rounded-2xl md:rounded-3xl">
              <EnhancedImage
                src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
                alt={t('childrenAdLanding.hero.imageAlt')}
                width={600}
                height={500}
                aspectRatio={1.2}
                objectFit="cover"
                className="rounded-2xl md:rounded-3xl transform transition-transform duration-700 hover:scale-105"
                rounded="2xl"
                hover="zoom"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-white py-10 md:py-14 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-dental-orange text-2xl">★</span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                text: t('childrenAdLanding.trust.testimonial1.text'),
                author: t('childrenAdLanding.trust.testimonial1.author')
              },
              {
                text: t('childrenAdLanding.trust.testimonial2.text'),
                author: t('childrenAdLanding.trust.testimonial2.author')
              },
              {
                text: t('childrenAdLanding.trust.testimonial3.text'),
                author: t('childrenAdLanding.trust.testimonial3.author')
              }
            ].map((testimonial, i) => (
              <div 
                key={i} 
                className="bg-dental-beige/20 p-5 rounded-xl text-center relative opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${0.2 * i}s` }}
              >
                <p className="text-dental-navy/80 italic mb-3">"{testimonial.text}"</p>
                <p className="text-dental-navy font-medium">{testimonial.author}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <span className="bg-dental-beige/30 text-dental-navy/80 text-sm font-medium px-4 py-2 rounded-full">
              {t('childrenAdLanding.trust.certification')}
            </span>
          </div>
        </div>
      </section>

      {/* PROBLEM/SOLUTION SECTION */}
      <section className="bg-gradient-to-br from-white to-[#D3E4FD]/30 py-10 md:py-14 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-dental-navy text-center mb-8">
            {t('childrenAdLanding.problem.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                problem: t('childrenAdLanding.problem.item1.problem'),
                solution: t('childrenAdLanding.problem.item1.solution'),
              },
              {
                problem: t('childrenAdLanding.problem.item2.problem'),
                solution: t('childrenAdLanding.problem.item2.solution'),
              },
              {
                problem: t('childrenAdLanding.problem.item3.problem'),
                solution: t('childrenAdLanding.problem.item3.solution'),
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-xl shadow-soft opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${0.2 * i}s` }}
              >
                <p className="text-dental-navy font-bold mb-3">{item.problem}</p>
                <div className="w-6 h-6 bg-dental-orange/10 flex items-center justify-center rounded-full mb-3">
                  <span className="text-dental-orange">➔</span>
                </div>
                <p className="text-dental-navy/80">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY STEPS */}
      <section className="bg-white py-10 md:py-14 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-dental-navy text-center mb-8">
            {t('childrenAdLanding.journey.title')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🧸",
                title: t('childrenAdLanding.journey.step1.title'),
                desc: t('childrenAdLanding.journey.step1.desc')
              },
              {
                icon: "👋",
                title: t('childrenAdLanding.journey.step2.title'),
                desc: t('childrenAdLanding.journey.step2.desc')
              },
              {
                icon: "🔍",
                title: t('childrenAdLanding.journey.step3.title'),
                desc: t('childrenAdLanding.journey.step3.desc')
              },
              {
                icon: "🎁",
                title: t('childrenAdLanding.journey.step4.title'),
                desc: t('childrenAdLanding.journey.step4.desc')
              }
            ].map((step, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center text-center opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${0.15 * i}s` }}
              >
                <div className="w-16 h-16 bg-dental-beige/30 rounded-full flex items-center justify-center text-2xl mb-4">
                  <span>{step.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-dental-navy mb-2">{step.title}</h3>
                <p className="text-dental-navy/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR SPOTLIGHT */}
      <section className="bg-gradient-to-br from-dental-pink/30 to-white py-10 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/5">
              <div className="rounded-full overflow-hidden border-4 border-white shadow-soft">
                <EnhancedImage
                  src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
                  alt={t('childrenAdLanding.doctor.imageAlt')}
                  width={300}
                  height={300}
                  rounded="full"
                  objectFit="cover"
                  aspectRatio={1}
                />
              </div>
            </div>
            
            <div className="md:w-3/5">
              <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-4">
                {t('childrenAdLanding.doctor.title')}
              </h2>
              
              <p className="text-lg text-dental-navy/80 mb-6">
                {t('childrenAdLanding.doctor.message')}
              </p>
              
              <div className="opacity-80">
                <OptimizedImage
                  src="/lovable-uploads/5f625d79-c4c0-4279-8df1-06890084db8c.png" 
                  alt={t('childrenAdLanding.doctor.signatureAlt')}
                  width={180}
                  height={60}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY & COMFORT SECTION */}
      <Section background="white" spacing="md" maxWidth="xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dental-navy">
            {t('childrenAdLanding.safety.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: <Heart className="h-6 w-6 text-dental-orange" />,
              title: t('childrenAdLanding.safety.item1')
            },
            {
              icon: <Shield className="h-6 w-6 text-dental-ocean" />,
              title: t('childrenAdLanding.safety.item2')
            },
            {
              icon: <Smile className="h-6 w-6 text-dental-orange" />,
              title: t('childrenAdLanding.safety.item3')
            }
          ].map((item, i) => (
            <div 
              key={i}
              className="flex flex-col items-center text-center p-5 opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
              style={{ animationDelay: `${0.2 * i}s` }}
            >
              <div className="bg-dental-beige/30 rounded-full p-4 mb-4">
                {item.icon}
              </div>
              <p className="text-dental-navy">{item.title}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA SECTION */}
      <section className="bg-gradient-to-br from-[#FFDEE2]/70 via-[#FFDEE2]/30 to-white py-10 md:py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            {t('childrenAdLanding.finalCta.title')}
          </h2>
          
          <p className="text-lg md:text-xl text-dental-navy/80 mb-8">
            {t('childrenAdLanding.finalCta.subtitle')}
          </p>
          
          <div className="flex justify-center">
            <Button 
              variant="orange" 
              size="lg"
              className="rounded-full px-8 py-7 text-xl shadow-lg hover:shadow-glow transition-all duration-300"
              onClick={handleBookAppointment}
            >
              {t('childrenAdLanding.finalCta.cta')}
            </Button>
          </div>
          
          <p className="mt-6 text-dental-navy/60 text-sm">
            <a href="tel:03-566-6915" className="hover:text-dental-orange transition-colors">
              {t('childrenAdLanding.finalCta.phone')}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ChildrenDentistryAdLandingPage;
