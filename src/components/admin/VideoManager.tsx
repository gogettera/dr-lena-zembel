
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import AddVideoButton from './AddVideoButton';
import VideoCard from './VideoCard';

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
      const updateData: Record<string, any> = {
        [field]: value,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('videos')
        .update(updateData)
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
          title: "New Video",
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
        <AddVideoButton onAdd={handleAddVideo} />
      </div>
      <div className="space-y-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onUpdate={handleVideoUpdate}
            onRemove={handleRemoveVideo}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoManager;
