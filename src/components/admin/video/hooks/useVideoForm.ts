
import { useState } from 'react';
import type { VideoData } from '../../useVideos';

interface UseVideoFormProps {
  video: VideoData;
  onUpdate: (id: string, field: keyof VideoData, value: string | number) => Promise<void>;
  onError: (error: any) => void;
  onSuccess: () => void;
}

export const useVideoForm = ({ video, onUpdate, onError, onSuccess }: UseVideoFormProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = (field: keyof VideoData) => {
    return async (value: string) => {
      setIsSaving(true);
      try {
        await onUpdate(video.id, field, value);
        onSuccess();
      } catch (err) {
        onError(err);
      } finally {
        setIsSaving(false);
      }
    };
  };

  return {
    isSaving,
    handleUpdate
  };
};
