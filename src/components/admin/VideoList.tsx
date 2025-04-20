
import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import AddVideoButton from "./AddVideoButton";
import { useVideos, VideoData } from "./useVideos";

const VideoList: React.FC = () => {
  const {
    videos,
    isLoading,
    fetchVideos,
    addVideo,
    updateVideo,
    removeVideo,
  } = useVideos();

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

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
        <AddVideoButton onAdd={addVideo} />
      </div>
      <div className="space-y-6">
        {videos.map((video: VideoData) => (
          <VideoCard
            key={video.id}
            video={video}
            onUpdate={updateVideo}
            onRemove={removeVideo}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
