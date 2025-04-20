
import React, { useState, useRef, useEffect } from 'react';
import VideoControls from './controls/VideoControls';
import PlayOverlay from './PlayOverlay';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (!controls) return;

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
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
        console.error(`Error exiting fullscreen: ${err.message}`);
      });
    } else {
      video.requestFullscreen().catch(err => {
        console.error(`Error enabling fullscreen: ${err.message}`);
      });
    }
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

      {controls && (
        <VideoControls
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          showControls={showControls}
          onPlayPause={togglePlay}
          onVolumeChange={handleVolumeChange}
          onProgressChange={handleProgressChange}
          onMuteToggle={toggleMute}
          onFullscreen={handleFullscreen}
        />
      )}
      
      <PlayOverlay isPlaying={isPlaying} onPlay={togglePlay} />
    </div>
  );
};

export default VideoPlayer;
