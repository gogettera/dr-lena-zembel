
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ImageCardProps {
  image: {
    name: string;
    url: string;
    updated_at: string | null;
  };
  onDelete?: (name: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDeleteClick = async () => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    setDeleting(true);
    if (onDelete) {
      await onDelete(image.name);
    }
    setDeleting(false);
  };

  return (
    <Card className="relative rounded-lg overflow-hidden shadow max-w-xs hover:shadow-lg transition-all group">
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
        <img
          src={image.url}
          alt={image.name}
          className={`w-full h-40 object-cover rounded-t-lg ${imageError ? 'hidden' : ''}`}
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div className="text-xs text-gray-500 p-2 text-center">
            Image preview unavailable
          </div>
        )}
      </div>
      {onDelete && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 end-2 z-10 opacity-80 hover:opacity-100"
          onClick={handleDeleteClick}
          disabled={deleting}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
      <div className="px-3 py-2">
        <span className="block text-xs truncate font-medium text-gray-600" title={image.name}>
          {image.name}
        </span>
        <span className="block text-[10px] text-gray-400 mt-1">
          {image.updated_at ? new Date(image.updated_at).toLocaleString() : ""}
        </span>
      </div>
    </Card>
  );
};

export default ImageCard;
