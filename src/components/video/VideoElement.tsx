
import React from 'react';

interface VideoElementProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string;
  poster: string;
  autoPlay: boolean;
  onClick: () => void;
}

const VideoElement: React.FC<VideoElementProps> = ({
  videoRef,
  src,
  poster,
  autoPlay,
  onClick,
}) => (
  <video
    ref={videoRef}
    className="w-full h-full object-cover cursor-pointer"
    src={src}
    poster={poster}
    onClick={onClick}
    preload="metadata"
    playsInline
    autoPlay={autoPlay}
  />
);

export default VideoElement;
