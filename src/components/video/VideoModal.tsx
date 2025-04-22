
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { useLanguage } from '@/contexts/LanguageContext';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  posterSrc: string;
  title?: string;
  isYouTube?: boolean;
}

// Parses YouTube video ID from a URL
function getYouTubeId(url: string) {
  if (!url) return null;
  
  const match = url.match(
    /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

const VideoModal = ({
  isOpen,
  onClose,
  videoSrc,
  posterSrc,
  title,
  isYouTube,
}: VideoModalProps) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // If no video source is provided, show an error message
  const hasValidSource = Boolean(videoSrc);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-0 sm:p-8">
      <div
        className="
          w-full h-full max-w-none max-h-none flex items-center justify-center relative
          sm:max-w-7xl sm:max-h-full sm:p-0
        "
        style={{
          maxWidth: '100vw',
          maxHeight: '100dvh',
        }}
      >
        {/* Close Button: absolute and always accessible */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 sm:-top-12 sm:right-0
            text-white hover:text-dental-orange transition-colors z-20
            bg-black/50 rounded-full p-2 sm:bg-transparent sm:rounded-none sm:p-0
          "
          aria-label={t('close')}
        >
          <X className="w-8 h-8" />
        </button>

        {/* Video Container */}
        <div
          className="
            w-screen h-screen max-w-full max-h-[100dvh] flex items-center justify-center
            aspect-video bg-black rounded-none overflow-hidden
            sm:aspect-video sm:rounded-lg sm:w-full sm:h-auto
          "
        >
          {!hasValidSource ? (
            <div className="text-white text-center p-8">
              <p>{t('videoNotAvailable') || 'Video not available'}</p>
            </div>
          ) : !isYouTube ? (
            <VideoPlayer
              src={videoSrc}
              poster={posterSrc}
              title={title}
              autoPlay={true}
              className="w-full h-full"
              onEnd={onClose}
            />
          ) : (
            <iframe
              width="100%"
              height="100%"
              className="w-full h-full rounded-none sm:rounded-lg"
              src={`https://www.youtube.com/embed/${getYouTubeId(videoSrc)}?autoplay=1&rel=0`}
              title={title || 'YouTube video'}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{
                aspectRatio: '16/9',
                maxHeight: '100%',
                maxWidth: '100%',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
