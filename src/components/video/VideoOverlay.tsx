
import React from 'react';

interface VideoOverlayProps {
  isPlaying: boolean;
  title?: string;
  onPlay: () => void;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ isPlaying, title, onPlay }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity pointer-events-none group-hover:opacity-100 opacity-0">
    {!isPlaying && (
      <button 
        type="button"
        aria-label="Play video"
        className="bg-white/70 rounded-full p-4 shadow-md pointer-events-auto focus:outline-none transition hover:bg-white"
        onClick={onPlay}
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-dental-navy" fill="currentColor" aria-hidden="true">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </button>
    )}
    {title && (
      <span className="mt-6 bg-black/60 text-white rounded px-4 py-2 text-lg font-semibold pointer-events-none">
        {title}
      </span>
    )}
  </div>
);

export default VideoOverlay;
