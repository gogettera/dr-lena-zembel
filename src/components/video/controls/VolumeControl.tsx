
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMuteToggle: () => void;
}

const VolumeControl = ({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
}: VolumeControlProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={onMuteToggle}
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
        onChange={onVolumeChange}
        className="w-20 h-1 rounded-full bg-white/30 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-dental-orange"
      />
    </div>
  );
};

export default VolumeControl;
