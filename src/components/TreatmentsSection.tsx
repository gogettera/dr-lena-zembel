
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Smile, Heart, Shield, Stethoscope, PieChart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TreatmentsSection = () => {
  const isMobile = useIsMobile();
  const treatments = [
    {
      icon: Smile,
      title: 'טיפולי שיניים לילדים',
      description: 'טיפול ייחודי ועדין לילדים בסביבה נעימה ומרגיעה'
    },
    {
      icon: Star,
      title: 'טיפולים אסתטיים',
      description: 'הלבנת שיניים, ציפויי חרסינה, והשתלות שיניים מתקדמות'
    },
    {
      icon: Shield,
      title: 'רפואה מונעת',
      description: 'ניקוי אבנית, בדיקות תקופתיות וטיפול במחלות חניכיים'
    },
    {
      icon: Stethoscope,
      title: 'טיפולי שורש',
      description: 'טיפולי שורש מתקדמים עם טכנולוגיה חדישה ומינימום כאב'
    },
    {
      icon: PieChart,
      title: 'שיקום הפה',
      description: 'כתרים, גשרים ותותבות באיכות גבוהה ובהתאמה אישית'
    },
    {
      icon: Heart,
      title: 'יישור שיניים',
      description: 'טיפולי יישור שיניים שקופים ומסורתיים לכל הגילאים'
    }
  ];

  return (
    <section id="treatments" className="py-24 bg-dental-beige/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            הטיפולים שלנו
          </h2>
          <p className="text-lg text-dental-navy/80 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            אנו מציעים מגוון רחב של טיפולי שיניים מתקדמים
          </p>
          <div className="w-24 h-1 bg-dental-orange mx-auto mt-6 rounded-full opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]"></div>
        </div>

        {isMobile ? (
          <div className="w-full overflow-x-auto pb-6">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {treatments.map((treatment, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3">
                    <Card 
                      className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl overflow-hidden opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="bg-dental-pink/30 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <treatment.icon className="h-8 w-8 text-dental-orange" />
                        </div>
                        <h3 className="text-xl font-bold text-dental-navy mb-3 text-center">{treatment.title}</h3>
                        <p className="text-dental-navy/70 text-center">{treatment.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="static mx-2 transform-none bg-white shadow-md hover:bg-dental-beige hover:scale-110 transition-all" />
                <CarouselNext className="static mx-2 transform-none bg-white shadow-md hover:bg-dental-beige hover:scale-110 transition-all" />
              </div>
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment, index) => (
              <Card 
                key={index} 
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl overflow-hidden opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="bg-dental-pink/30 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <treatment.icon className="h-8 w-8 text-dental-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-dental-navy mb-3 text-center">{treatment.title}</h3>
                  <p className="text-dental-navy/70 text-center">{treatment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TreatmentsSection;
