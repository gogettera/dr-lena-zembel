
import React from 'react';
import { Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PlayOverlayProps {
  isPlaying: boolean;
  onPlay: () => void;
}

const PlayOverlay = ({ isPlaying, onPlay }: PlayOverlayProps) => {
  const { t } = useLanguage();

  if (isPlaying) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
      <button 
        onClick={onPlay}
        className="w-20 h-20 rounded-full bg-dental-orange flex items-center justify-center transform hover:scale-110 transition-transform"
        aria-label={t('play')}
      >
        <Play className="w-10 h-10 text-white fill-white" />
      </button>
    </div>
  );
};

export default PlayOverlay;
