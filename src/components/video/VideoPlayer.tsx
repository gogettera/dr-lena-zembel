
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Fullscreen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface VideoPlayerProps {
  src: string;
  poster: string;
  title?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
}

const VideoPlayer = ({
  src,
  poster,
  title,
  onPlay,
  onPause,
  onEnd,
  autoPlay = false,
  controls = true,
  className = '',
}: VideoPlayerProps) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle initial video metadata loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Handle time update during playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setProgress(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnd) onEnd();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onEnd]);

  // Hide controls after inactivity
  useEffect(() => {
    if (!controls) return;

    const hideControls = () => {
      setShowControls(false);
    };

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(hideControls, 3000);
    } else {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, controls]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      if (onPause) onPause();
    } else {
      video.play().catch(error => {
        console.error("Error playing video:", error);
      });
      setIsPlaying(true);
      if (onPlay) onPlay();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      video.volume = volume;
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    video.volume = newVolume;
    
    if (newVolume === 0) {
      setIsMuted(true);
      video.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      video.muted = false;
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setProgress(newTime);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    } else {
      video.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      className={`relative group overflow-hidden ${className}`}
      onMouseMove={() => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
        if (isPlaying) {
          controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
        }
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
        src={src}
        poster={poster}
        onClick={togglePlay}
        preload="metadata"
        playsInline
        autoPlay={autoPlay}
      />

      {title && (
        <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-md text-sm">
          {title}
        </div>
      )}

      {/* Custom video controls */}
      {controls && (
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Progress bar */}
          <div className="flex items-center mb-2">
            <span className="text-white text-xs mr-2">{formatTime(progress)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={handleProgressChange}
              className="flex-grow h-1 rounded-full bg-white/30 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-dental-orange"
            />
            <span className="text-white text-xs ml-2">{formatTime(duration)}</span>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlay} 
                className="text-white hover:text-dental-orange transition-colors"
                aria-label={isPlaying ? t('pause') : t('play')}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMute}
                  className="text-white hover:text-dental-orange transition-colors"
                  aria-label={isMuted ? t('unmute') : t('mute')}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 rounded-full bg-white/30 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-dental-orange"
                />
              </div>
            </div>
            
            <button 
              onClick={handleFullscreen}
              className="text-white hover:text-dental-orange transition-colors"
              aria-label={t('fullscreen')}
            >
              <Fullscreen className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      
      {/* Play/Pause overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <button 
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-dental-orange flex items-center justify-center transform hover:scale-110 transition-transform"
            aria-label={t('play')}
          >
            <Play className="w-10 h-10 text-white fill-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
