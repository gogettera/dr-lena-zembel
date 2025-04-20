
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface VideoData {
  id: string;
  src: string;
  poster: string;
  title: string;
  width: number;
  height: number;
}

export const useVideos = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
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
  }, [toast]);

  const addVideo = useCallback(async () => {
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
      setVideos(prev => [data, ...prev]);
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
  }, [toast]);

  const updateVideo = useCallback(
    async (id: string, field: keyof VideoData, value: string | number) => {
      try {
        // Use direct assignment for the field to update to avoid any ambiguity
        const { error } = await supabase
          .from('videos')
          .update({ [field]: value, updated_at: new Date().toISOString() })
          .eq('id', id);

        if (error) throw error;

        // Update the local state to reflect the change
        setVideos(prev =>
          prev.map(video =>
            video.id === id ? { ...video, [field]: value } : video
          )
        );

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
        console.error("Update error:", error);
      }
    },
    [toast]
  );

  const removeVideo = useCallback(
    async (id: string) => {
      try {
        const { error } = await supabase
          .from('videos')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setVideos(prev => prev.filter(video => video.id !== id));

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
    },
    [toast]
  );

  return {
    videos,
    isLoading,
    fetchVideos,
    addVideo,
    updateVideo,
    removeVideo,
    setVideos,
  };
};
