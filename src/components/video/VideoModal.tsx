
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
  isYouTube?: boolean; // NEW: Support YouTube embeds
}

// Parses YouTube video ID from a URL
function getYouTubeId(url: string) {
  const match = url.match(
    /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

const VideoModal = ({ isOpen, onClose, videoSrc, posterSrc, title, isYouTube }: VideoModalProps) => {
  const { t } = useLanguage();

  // Lock body scroll when modal is open
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

  // Close on escape key
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

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-7xl max-h-full relative">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-dental-orange transition-colors z-10"
          aria-label={t('close')}
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="w-full max-h-[calc(100vh-120px)] aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
          {!isYouTube ? (
            <VideoPlayer
              src={videoSrc}
              poster={posterSrc}
              title={title}
              autoPlay={true}
              className="w-full h-full"
              onEnd={onClose}
            />
          ) : (
            // Embed YouTube player
            <iframe
              width="100%"
              height="100%"
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${getYouTubeId(videoSrc)}?autoplay=1&rel=0`}
              title={title || 'YouTube video'}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

