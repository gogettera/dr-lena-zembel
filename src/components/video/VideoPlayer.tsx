
import React from 'react';
import VideoControls from './controls/VideoControls';
import PlayOverlay from './PlayOverlay';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';

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
  const {
    videoRef,
    isPlaying,
    isMuted,
    progress,
    duration,
    volume,
    showControls,
    setShowControls,
    controlsTimeoutRef,
    togglePlay,
    handleVolumeChange,
    toggleMute,
    handleProgressChange,
    handleFullscreen
  } = useVideoPlayer({ onPlay, onPause, onEnd });

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
