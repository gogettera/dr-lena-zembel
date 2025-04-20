
import React from 'react';
import { Play, Pause, Volume2, VolumeX, Fullscreen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import VolumeControl from './VolumeControl';
import ProgressBar from './ProgressBar';

interface VideoControlsProps {
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  showControls: boolean;
  onPlayPause: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMuteToggle: () => void;
  onFullscreen: () => void;
}

const VideoControls = ({
  isPlaying,
  progress,
  duration,
  volume,
  isMuted,
  showControls,
  onPlayPause,
  onVolumeChange,
  onProgressChange,
  onMuteToggle,
  onFullscreen,
}: VideoControlsProps) => {
  const { t } = useLanguage();

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
      <ProgressBar
        progress={progress}
        duration={duration}
        formatTime={formatTime}
        onChange={onProgressChange}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onPlayPause} 
            className="text-white hover:text-dental-orange transition-colors"
            aria-label={isPlaying ? t('pause') : t('play')}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onMuteToggle={onMuteToggle}
          />
        </div>
        
        <button 
          onClick={onFullscreen}
          className="text-white hover:text-dental-orange transition-colors"
          aria-label={t('fullscreen')}
        >
          <Fullscreen className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default VideoControls;
