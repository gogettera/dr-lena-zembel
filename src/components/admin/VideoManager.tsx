
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileVideo2, Upload } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

interface VideoData {
  id: string;
  src: string;
  poster: string;
  title: string;
  width: number;
  height: number;
}

const VideoManager = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setVideos(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching videos",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoUpdate = async (id: string, field: keyof VideoData, value: string | number) => {
    try {
      const { error } = await supabase
        .from('videos')
        .update({ [field]: value, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setVideos(videos.map(video => 
        video.id === id ? { ...video, [field]: value } : video
      ));

      toast({
        title: "Video updated",
        description: "The video has been successfully updated."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating video",
        description: error.message
      });
    }
  };

  const handleAddVideo = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .insert({
          src: "",
          poster: "",
          title: "",
          width: 1280,
          height: 720
        })
        .select()
        .single();

      if (error) throw error;

      setVideos([data, ...videos]);

      toast({
        title: "Video added",
        description: "A new video entry has been created."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding video",
        description: error.message
      });
    }
  };

  const handleRemoveVideo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setVideos(videos.filter(video => video.id !== id));

      toast({
        title: "Video removed",
        description: "The video has been successfully removed."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error removing video",
        description: error.message
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-dental-orange border-t-transparent rounded-full"></div>
      </div>
    );
  }

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
        {videos.map((video) => (
          <Card key={video.id} className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">
                {video.title || 'Untitled Video'}
              </h3>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveVideo(video.id)}
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
                  onChange={(e) => handleVideoUpdate(video.id, 'title', e.target.value)}
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <Label htmlFor={`src-${video.id}`}>Video Source (URL or YouTube link)</Label>
                <Input
                  id={`src-${video.id}`}
                  value={video.src}
                  onChange={(e) => handleVideoUpdate(video.id, 'src', e.target.value)}
                  placeholder="Enter video URL or YouTube link"
                />
              </div>

              <div>
                <Label htmlFor={`poster-${video.id}`}>Cover Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id={`poster-${video.id}`}
                    value={video.poster}
                    onChange={(e) => handleVideoUpdate(video.id, 'poster', e.target.value)}
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
