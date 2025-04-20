
import React from 'react';

interface ProgressBarProps {
  progress: number;
  duration: number;
  formatTime: (time: number) => string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProgressBar = ({
  progress,
  duration,
  formatTime,
  onChange,
}: ProgressBarProps) => {
  return (
    <div className="flex items-center mb-2">
      <span className="text-white text-xs mr-2">{formatTime(progress)}</span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={progress}
        onChange={onChange}
        className="flex-grow h-1 rounded-full bg-white/30 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-dental-orange"
      />
      <span className="text-white text-xs ml-2">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
