
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import type { VideoData } from './useVideos';

interface VideoCardProps {
  video: VideoData;
  onUpdate: (id: string, field: keyof VideoData, value: string | number) => void;
  onRemove: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onUpdate, onRemove }) => {
  // Which field is being edited: "src" | "poster" | null
  const [editingField, setEditingField] = useState<null | 'src' | 'poster'>(null);
  // Value being edited
  const [editValue, setEditValue] = useState<string>("");

  // Start editing a field
  const handleEdit = (field: 'src' | 'poster') => {
    setEditingField(field);
    setEditValue(video[field] ?? "");
  };

  // Save the edit
  const handleSave = () => {
    if (editingField) {
      onUpdate(video.id, editingField, editValue);
      setEditingField(null);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingField(null);
  };

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
        {/* Title (can edit inline) */}
        <div>
          <Label htmlFor={`title-${video.id}`}>Title</Label>
          <Input
            id={`title-${video.id}`}
            value={video.title}
            onChange={(e) => onUpdate(video.id, 'title', e.target.value)}
            placeholder="Enter video title"
            disabled={!!editingField}
          />
        </div>
        {/* Video source field */}
        <div>
          <Label htmlFor={`src-${video.id}`}>Video Source (URL or YouTube link)</Label>
          <div className="flex gap-2 items-center">
            {editingField === "src" ? (
              <>
                <Input
                  id={`src-edit-${video.id}`}
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  autoFocus
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" aria-label="Save" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Cancel" onClick={handleCancel}>
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Input
                  id={`src-${video.id}`}
                  value={video.src}
                  disabled
                  className="flex-1 bg-gray-100 cursor-not-allowed"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Edit"
                  onClick={() => handleEdit('src')}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
        {/* Poster (image) field */}
        <div>
          <Label htmlFor={`poster-${video.id}`}>Cover Image URL</Label>
          <div className="flex gap-2 items-center">
            {editingField === "poster" ? (
              <>
                <Input
                  id={`poster-edit-${video.id}`}
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  autoFocus
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" aria-label="Save" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Cancel" onClick={handleCancel}>
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Input
                  id={`poster-${video.id}`}
                  value={video.poster}
                  disabled
                  className="flex-1 bg-gray-100 cursor-not-allowed"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Edit"
                  onClick={() => handleEdit('poster')}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;
