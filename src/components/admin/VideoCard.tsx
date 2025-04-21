
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
  // Which field is being edited: "src" | "poster" | "title" | null
  const [editingField, setEditingField] = useState<null | 'src' | 'poster' | 'title'>(null);
  // Value being edited
  const [editValue, setEditValue] = useState<string>("");
  // Track saving state
  const [isSaving, setIsSaving] = useState(false);

  // Start editing a field
  const handleEdit = (field: 'src' | 'poster' | 'title') => {
    setEditingField(field);
    setEditValue(video[field] as string);
  };

  // Save the edit
  const handleSave = async () => {
    if (editingField && editValue !== video[editingField]) {
      setIsSaving(true);
      try {
        await onUpdate(video.id, editingField, editValue);
      } finally {
        setIsSaving(false);
        setEditingField(null);
      }
    } else {
      // If no changes or no editing field, just close the edit mode
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
          {editingField === 'title' ? (
            <div className="flex gap-2 items-center">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
                className="flex-1"
                placeholder="Enter video title"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Save"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Cancel"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>{video.title || 'Untitled Video'}</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Edit title"
                onClick={() => handleEdit('title')}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          )}
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Save" 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Cancel" 
                  onClick={handleCancel}
                  disabled={isSaving}
                >
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Save" 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Cancel" 
                  onClick={handleCancel}
                  disabled={isSaving}
                >
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
