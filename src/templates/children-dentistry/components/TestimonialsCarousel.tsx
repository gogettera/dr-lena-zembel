
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { EnhancedCarousel, CarouselItem } from '@/components/ui/enhanced-carousel';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const TestimonialsCarousel: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<any>(null);
  
  const testimonials = [
    {
      content: t('childrenAdLanding.trust.testimonial1.text'),
      author: t('childrenAdLanding.trust.testimonial1.author'),
      rating: 5,
      imageUrl: '/lovable-uploads/5f625d79-c4c0-4279-8df1-06890084db8c.png'
    },
    {
      content: t('childrenAdLanding.trust.testimonial2.text'),
      author: t('childrenAdLanding.trust.testimonial2.author'),
      rating: 5,
      imageUrl: '/lovable-uploads/4a7a5648-9bbd-4a37-9d06-04531fc920b3.png'
    },
    {
      content: t('childrenAdLanding.trust.testimonial3.text'),
      author: t('childrenAdLanding.trust.testimonial3.author'),
      rating: 5,
      imageUrl: '/lovable-uploads/5f625d79-c4c0-4279-8df1-06890084db8c.png'
    }
  ];
  
  // Listen to slide changes when the API is available
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  
  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-[#F1F0FB]/40 to-white">
      <div className="container mx-auto">
        <EnhancedCarousel 
          setApi={setApi}
          className="max-w-3xl mx-auto"
          autoplay={6000}
          // Remove the loop prop since it's not supported by the component type
        >
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <div className="p-6 md:p-8 bg-white rounded-2xl shadow-soft">
                <div className="flex justify-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-dental-orange text-dental-orange" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-dental-navy/80 italic text-center mb-6">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img 
                    src={testimonial.imageUrl}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-semibold text-dental-navy">{testimonial.author}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </EnhancedCarousel>
        
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full mx-1 transition-all",
                currentSlide === index ? "bg-dental-orange" : "bg-dental-navy/20"
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
