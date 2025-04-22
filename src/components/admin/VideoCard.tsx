
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Save, X, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { VideoData } from './useVideos';

interface VideoCardProps {
  video: VideoData;
  onUpdate: (id: string, field: keyof VideoData, value: string | number) => void;
  onRemove: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onUpdate, onRemove }) => {
  const [editingField, setEditingField] = useState<null | 'src' | 'poster' | 'title'>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (field: 'src' | 'poster' | 'title') => {
    setEditingField(field);
    setEditValue(video[field] || '');
    setError(null);
  };

  const handleSave = async () => {
    if (editingField && editValue.trim() !== video[editingField]) {
      setIsSaving(true);
      try {
        await onUpdate(video.id, editingField, editValue.trim());
        setEditingField(null);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsSaving(false);
      }
    } else {
      setEditingField(null);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setError(null);
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
                required
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSave}
                disabled={isSaving || !editValue.trim()}
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
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

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        <div>
          <Label htmlFor={`src-${video.id}`}>Video Source URL</Label>
          <div className="flex gap-2 items-center">
            {editingField === "src" ? (
              <>
                <Input
                  id={`src-edit-${video.id}`}
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  autoFocus
                  className="flex-1"
                  placeholder="Enter video URL"
                  required
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleSave}
                  disabled={isSaving || !editValue.trim()}
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
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
                  value={video.src || ''}
                  disabled
                  className="flex-1 bg-gray-100"
                  placeholder="No video source set"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit('src')}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

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
                  placeholder="Enter poster image URL"
                  required
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleSave}
                  disabled={isSaving || !editValue.trim()}
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
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
                  value={video.poster || ''}
                  disabled
                  className="flex-1 bg-gray-100"
                  placeholder="No poster image set"
                />
                <Button
                  variant="ghost"
                  size="icon"
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
