import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface VideoData {
  id: string;
  src: string | null;
  poster: string | null;
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
          title: "New Video",
          src: null,
          poster: null,
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
        // Validate required fields
        if ((field === 'src' || field === 'poster') && !value) {
          throw new Error(`${field} cannot be empty`);
        }

        // If updating src or poster, make sure both are updated together
        let updateData: Partial<VideoData> = { [field]: value };
        if (field === 'src') {
          // Find the current video to get the poster
          const video = videos.find(v => v.id === id);
          if (!video?.poster) {
            throw new Error('Please set both video source and poster image');
          }
        } else if (field === 'poster') {
          // Find the current video to get the src
          const video = videos.find(v => v.id === id);
          if (!video?.src) {
            throw new Error('Please set both video source and poster image');
          }
        }

        const { error } = await supabase
          .from('videos')
          .update(updateData)
          .eq('id', id);

        if (error) throw error;

        setVideos(prev =>
          prev.map(video =>
            video.id === id ? { ...video, [field]: value } : video
          )
        );

        toast({
          title: "Video updated",
          description: `The ${field} has been successfully updated.`
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
    [toast, videos]
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
