
import React from "react";
import { Card } from "@/components/ui/card";

interface ImageCardProps {
  image: {
    name: string;
    url: string;
    updated_at: string | null;
  };
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <Card className="relative rounded-lg overflow-hidden shadow max-w-xs hover:shadow-lg transition-all">
      <img
        src={image.url}
        alt={image.name}
        className="w-full h-40 object-cover rounded-t-lg"
        style={{ background: "#f8fafc" }}
      />
      <div className="px-3 py-2">
        <span className="block text-xs truncate font-medium text-gray-600" title={image.name}>
          {image.name}
        </span>
        <span className="block text-[10px] text-gray-400 mt-1">{image.updated_at ? new Date(image.updated_at).toLocaleString() : ""}</span>
      </div>
    </Card>
  );
};

export default ImageCard;
