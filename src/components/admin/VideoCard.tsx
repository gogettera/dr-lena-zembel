
import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import type { VideoData } from './useVideos';

interface VideoCardProps {
  video: VideoData;
  onUpdate: (id: string, field: keyof VideoData, value: string | number) => void;
  onRemove: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onUpdate, onRemove }) => {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium">
          {video.title || 'Untitled Video'}
        </h3>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onRemove(video.id)}
        >
          Remove
        </Button>
      </div>
      <div className="grid gap-4">
        <div>
          <Label htmlFor={`title-${video.id}`}>Title</Label>
          <Input
            id={`title-${video.id}`}
            value={video.title}
            onChange={(e) => onUpdate(video.id, 'title', e.target.value)}
            placeholder="Enter video title"
          />
        </div>
        <div>
          <Label htmlFor={`src-${video.id}`}>Video Source (URL or YouTube link)</Label>
          <Input
            id={`src-${video.id}`}
            value={video.src}
            onChange={(e) => onUpdate(video.id, 'src', e.target.value)}
            placeholder="Enter video URL or YouTube link"
          />
        </div>
        <div>
          <Label htmlFor={`poster-${video.id}`}>Cover Image URL</Label>
          <div className="flex gap-2">
            <Input
              id={`poster-${video.id}`}
              value={video.poster}
              onChange={(e) => onUpdate(video.id, 'poster', e.target.value)}
              placeholder="Enter cover image URL"
            />
            <Button variant="outline" size="icon" tabIndex={-1}>
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;
