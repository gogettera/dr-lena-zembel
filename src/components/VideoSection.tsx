import React from 'react';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from '@/components/ui/optimized-image';
import DeferredContent from './deferred-content';

const VideoSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';

  return (
    <section className="py-24 bg-gradient-to-b from-dental-beige/30 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            {t('watchOurClinic')}
          </h2>
          <p className="text-lg text-dental-navy/80 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            {t('clinicTourDescription')}
          </p>
          <div className="w-24 h-1 bg-dental-orange mx-auto mt-6 rounded-full opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <DeferredContent>
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white rounded-2xl">
              <div className="relative aspect-video group cursor-pointer">
                <OptimizedImage
                  src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
                  alt={t('clinicTourThumbnail')}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-dental-orange flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-white fill-white" />
                  </div>
                </div>
              </div>
            </Card>
          </DeferredContent>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
