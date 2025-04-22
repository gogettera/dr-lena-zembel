
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from '@/components/ui/optimized-image';
import DeferredContent from './deferred-content';
import SectionHeader from '@/components/ui/section-header';
import VideoModal from './video/VideoModal';
import { supabase } from '@/integrations/supabase/client';

type VideoData = {
  id: string;
  src: string | null; // Changed to allow null
  poster: string | null; // Changed to allow null
  title: string;
  width: number;
  height: number;
};

const VideoSection = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoData | null>(null);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching videos:', error);
          return;
        }

        setVideos(data || []);
      } catch (error) {
        console.error('Error in video fetch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const openVideoModal = (video: VideoData) => {
    setActiveVideo(video);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setActiveVideo(null);
  };

  // Helper to check if the src is YouTube - UPDATED with null check
  const isYouTubeUrl = (url: string | null): boolean => {
    if (!url) return false;
    return url.includes('youtube.com/watch') || url.includes('youtu.be/');
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-dental-beige/30 to-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title={t('watchOurClinic')}
            subtitle={t('clinicTourDescription')}
          />
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-dental-orange border-t-transparent rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  // If no videos are found, don't render the section
  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-dental-beige/30 to-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title={t('watchOurClinic')}
          subtitle={t('clinicTourDescription')}
        />

        <div className="max-w-4xl mx-auto">
          <DeferredContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {videos.map((video) => (
                <Card
                  className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white rounded-2xl"
                  key={video.id}
                >
                  <div 
                    className="relative aspect-video group cursor-pointer"
                    onClick={() => openVideoModal(video)}
                    aria-label={video.title}
                    tabIndex={0}
                  >
                    <OptimizedImage
                      src={video.poster}
                      alt={t('clinicTourThumbnail') + ` ${video.title}`}
                      width={video.width}
                      height={video.height}
                      className="w-full h-full object-cover"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-dental-orange flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <h3 className="text-lg font-semibold text-dental-navy">{video.title}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </DeferredContent>
        </div>
      </div>

      {/* Video Modal (handles both YouTube and file videos) */}
      {activeVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeVideoModal}
          videoSrc={activeVideo.src || ''} // Provide default empty string if null
          posterSrc={activeVideo.poster || ''} // Provide default empty string if null
          title={activeVideo.title}
          isYouTube={isYouTubeUrl(activeVideo.src)}
        />
      )}
    </section>
  );
};

export default VideoSection;
