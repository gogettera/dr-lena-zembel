
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
    progress, // Using progress instead of currentTime
    volume,
    isMuted,
    handleVolumeChange, // <-- Added this line to fix the error
    toggleMute, // Using toggleMute instead of handleMuteToggle
    handleFullscreen, // Using handleFullscreen instead of handleFullscreenToggle
    handleProgressChange, // Using handleProgressChange instead of handleSeek
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
    </VideoContainer>
  );
};

export default VideoPlayer;

