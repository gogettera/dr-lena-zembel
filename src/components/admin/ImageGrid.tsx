
import React from "react";
import ImageCard from "./ImageCard";
import type { Img } from "./useImageLibrary";

interface ImageGridProps {
  images: Img[];
  onDelete: (name: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onDelete }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {images.map((img) => (
      <ImageCard key={img.name} image={img} onDelete={onDelete} />
    ))}
  </div>
);

export default ImageGrid;
