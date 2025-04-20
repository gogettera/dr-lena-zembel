import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from '@/components/ui/optimized-image';
import DeferredContent from './deferred-content';
import SectionHeader from '@/components/ui/section-header';
import VideoModal from './video/VideoModal';

type VideoData = {
  src: string; // Direct video file URL or YouTube link
  poster: string; // Cover photo URL
  title: string;
  width: number;
  height: number;
};

const VideoSection = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoData | null>(null);

  // HOW TO CHANGE VIDEOS:
  // To update, just modify/add items in this array.
  // If src is a YouTube link (e.g., 'https://www.youtube.com/watch?v=abc...'), it will be embedded.
  // Otherwise, the direct video file will be used.
  const videos: VideoData[] = [
    {
      src: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
      poster: "/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg", // CHANGE THIS to change cover photo
      title: t('clinicTourVideo'),
      width: 1280,
      height: 720
    },
    {
      src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // YouTube demo video
      poster: "/lovable-uploads/461f9da9-a7b8-4127-9111-c45b5742bdcf.png", // CHANGE THIS to set a thumbnail for this video
      title: t('sampleYouTubeVideo'),
      width: 1280,
      height: 720
    },
    // Add more videos here!
  ];

  const openVideoModal = (video: VideoData) => {
    setActiveVideo(video);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setActiveVideo(null);
  };

  // Helper to check if the src is YouTube
  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com/watch') || url.includes('youtu.be/');
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {videos.map((video, i) => (
                <Card
                  className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white rounded-2xl"
                  key={i}
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
                      priority={i === 0}
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
          videoSrc={activeVideo.src}
          posterSrc={activeVideo.poster}
          title={activeVideo.title}
          isYouTube={isYouTubeUrl(activeVideo.src)}
        />
      )}
    </section>
  );
};

export default VideoSection;
