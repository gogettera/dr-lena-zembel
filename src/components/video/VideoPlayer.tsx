import React from 'react';
import VideoControls from './controls/VideoControls';
import VideoOverlay from './VideoOverlay';
import VideoContainer from './VideoContainer';
import VideoElement from './VideoElement';
import { useVideoPlayer360 } from '@/hooks/useVideoPlayer360';

interface VideoPlayerProps {
  src: string;
  poster: string;
  autoPlay?: boolean;
  title?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
  title,
  onPlay,
  onPause,
  onEnd,
  className,
}) => {
  const {
    videoRef,
    isPlaying,
    showControls,
    setShowControls,
    controlsTimeoutRef,
    togglePlay,
    duration,
    currentTime,
    bufferedTime,
    volume,
    isMuted,
    isFullscreen,
    handleTimeUpdate,
    handleVolumeChange,
    handleMuteToggle,
    handleFullscreenToggle,
    handleSeek,
  } = useVideoPlayer360({ onPlay, onPause, onEnd });

  // Mouse movement logic for showing/hiding controls
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  return (
    <VideoContainer className={className} onMouseMove={handleMouseMove}>
      <VideoElement
        videoRef={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        onClick={togglePlay}
      />
      <VideoOverlay isPlaying={isPlaying} title={title} onPlay={togglePlay} />
      <VideoControls
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
        bufferedTime={bufferedTime}
        volume={volume}
        isMuted={isMuted}
        isFullscreen={isFullscreen}
        showControls={showControls}
        onPlayToggle={togglePlay}
        onVolumeChange={handleVolumeChange}
        onMuteToggle={handleMuteToggle}
        onFullscreenToggle={handleFullscreenToggle}
        onSeek={handleSeek}
      />
    </VideoContainer>
  );
};

export default VideoPlayer;
