
import React from 'react';
import { Card } from "@/components/ui/card";
import type { VideoData } from './useVideos';
import EditableField from './video/EditableField';
import VideoActions from './video/VideoActions';
import ErrorAlert from './video/ErrorAlert';
import { useVideoError } from './video/hooks/useVideoError';
import { useVideoForm } from './video/hooks/useVideoForm';

interface VideoCardProps {
  video: VideoData;
  onUpdate: (id: string, field: keyof VideoData, value: string | number) => Promise<void>;
  onRemove: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onUpdate, onRemove }) => {
  const { error, handleError, clearError } = useVideoError();
  const { isSaving, handleUpdate } = useVideoForm({
    video,
    onUpdate,
    onError: handleError,
    onSuccess: clearError
  });

  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium">
          <EditableField
            id={`title-${video.id}`}
            label=""
            value={video.title}
            placeholder="Enter video title"
            onSave={handleUpdate('title')}
            disabled={isSaving}
          />
        </h3>
        <VideoActions 
          onRemove={() => onRemove(video.id)} 
          disabled={isSaving}
        />
      </div>

      {error && <ErrorAlert message={error} />}

      <div className="grid gap-4">
        <EditableField
          id={`src-${video.id}`}
          label="Video Source URL"
          value={video.src || ''}
          placeholder="Enter video URL"
          onSave={handleUpdate('src')}
          disabled={isSaving}
        />

        <EditableField
          id={`poster-${video.id}`}
          label="Cover Image URL"
          value={video.poster || ''}
          placeholder="Enter poster image URL"
          onSave={handleUpdate('poster')}
          disabled={isSaving}
        />
      </div>
    </Card>
  );
};

export default VideoCard;
