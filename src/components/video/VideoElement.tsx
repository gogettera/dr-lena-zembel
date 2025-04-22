
import React, { useEffect, useRef } from 'react';

interface VideoElementProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string;
  poster: string;
  autoPlay: boolean;
  onClick: () => void;
  preload?: 'auto' | 'metadata' | 'none';
  width?: number;
  height?: number;
}

const VideoElement: React.FC<VideoElementProps> = ({
  videoRef,
  src,
  poster,
  autoPlay,
  onClick,
  preload = 'metadata',
  width,
  height,
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Use intersection observer to only load video when it comes into view
  useEffect(() => {
    if (!videoRef.current || autoPlay || preload === 'auto') return;
    
    const currentVideo = videoRef.current;
    
    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        // When video is in viewport, set preload to auto
        if (currentVideo && currentVideo.preload === 'none') {
          currentVideo.preload = 'auto';
        }
        
        // Disconnect after changing preload
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      }
    }, {
      rootMargin: '200px 0px' // Preload when video is within 200px of viewport
    });
    
    observerRef.current.observe(currentVideo);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [videoRef, autoPlay, preload]);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover cursor-pointer"
      src={src}
      poster={poster}
      onClick={onClick}
      preload={preload}
      playsInline
      autoPlay={autoPlay}
      muted={autoPlay}
      width={width}
      height={height}
      // Add explicit dimensions for better CLS (Cumulative Layout Shift)
      style={{ aspectRatio: width && height ? `${width}/${height}` : '16/9' }}
    />
  );
};

export default VideoElement;
