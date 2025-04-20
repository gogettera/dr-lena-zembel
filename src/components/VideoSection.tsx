
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from '@/components/ui/optimized-image';
import DeferredContent from './deferred-content';
import SectionHeader from '@/components/ui/section-header';
import VideoModal from './video/VideoModal';

const VideoSection = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // In a real application, these would come from a database or CMS
  const videoData = {
    src: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4", // Sample video URL
    poster: "/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg",
    title: t('clinicTourVideo'),
    width: 1280,
    height: 720
  };

  const openVideoModal = () => {
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-dental-beige/30 to-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title={t('watchOurClinic')}
          subtitle={t('clinicTourDescription')}
        />

        <div className="max-w-4xl mx-auto">
          <DeferredContent>
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white rounded-2xl">
              <div 
                className="relative aspect-video group cursor-pointer"
                onClick={openVideoModal}
              >
                <OptimizedImage
                  src={videoData.poster}
                  alt={t('clinicTourThumbnail')}
                  width={videoData.width}
                  height={videoData.height}
                  className="w-full h-full object-cover"
                  priority={true} // This is likely an LCP element
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

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeVideoModal}
        videoSrc={videoData.src}
        posterSrc={videoData.poster}
        title={videoData.title}
      />
    </section>
  );
};

export default VideoSection;
