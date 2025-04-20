
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileVideo2, Upload } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { Label } from "@/components/ui/label";

interface VideoData {
  src: string;
  poster: string;
  title: string;
  width: number;
  height: number;
}

const VideoManager = () => {
  const { t } = useLanguage();
  const [videos, setVideos] = useState<VideoData[]>([
    {
      src: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
      poster: "/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg",
      title: t('clinicTourVideo'),
      width: 1280,
      height: 720
    },
    {
      src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      poster: "/lovable-uploads/461f9da9-a7b8-4127-9111-c45b5742bdcf.png",
      title: t('sampleYouTubeVideo'),
      width: 1280,
      height: 720
    }
  ]);

  const handleVideoUpdate = (index: number, field: keyof VideoData, value: string | number) => {
    const updatedVideos = [...videos];
    updatedVideos[index] = {
      ...updatedVideos[index],
      [field]: value,
    };
    setVideos(updatedVideos);
  };

  const handleAddVideo = () => {
    setVideos([...videos, {
      src: "",
      poster: "",
      title: "",
      width: 1280,
      height: 720
    }]);
  };

  const handleRemoveVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Video Management</h2>
        <Button onClick={handleAddVideo} variant="outline">
          <FileVideo2 className="w-4 h-4 mr-2" />
          Add New Video
        </Button>
      </div>

      <div className="space-y-6">
        {videos.map((video, index) => (
          <Card key={index} className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">Video {index + 1}</h3>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveVideo(index)}
              >
                Remove
              </Button>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor={`title-${index}`}>Title</Label>
                <Input
                  id={`title-${index}`}
                  value={video.title}
                  onChange={(e) => handleVideoUpdate(index, 'title', e.target.value)}
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <Label htmlFor={`src-${index}`}>Video Source (URL or YouTube link)</Label>
                <Input
                  id={`src-${index}`}
                  value={video.src}
                  onChange={(e) => handleVideoUpdate(index, 'src', e.target.value)}
                  placeholder="Enter video URL or YouTube link"
                />
              </div>

              <div>
                <Label htmlFor={`poster-${index}`}>Cover Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id={`poster-${index}`}
                    value={video.poster}
                    onChange={(e) => handleVideoUpdate(index, 'poster', e.target.value)}
                    placeholder="Enter cover image URL"
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoManager;
