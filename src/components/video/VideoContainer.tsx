
import React from 'react';

interface VideoContainerProps {
  className?: string;
  onMouseMove: () => void;
  children: React.ReactNode;
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  className = '',
  onMouseMove,
  children,
}) => (
  <div
    className={`relative group overflow-hidden ${className}`}
    onMouseMove={onMouseMove}
  >
    {children}
  </div>
);

export default VideoContainer;
