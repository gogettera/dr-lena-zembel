
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card } from '@/components/ui/card';
import ImageCard from './ImageCard';

const SUPABASE_URL = "https://uhsswtixtrurxpsrduus.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoc3N3dGl4dHJ1cnhwc3JkdXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5ODk1NzYsImV4cCI6MjA2MDU2NTU3Nn0.apQbIt-eN9U6yJeL7zPVyodecxbDFUymFtFVkQzOmsI";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type Img = {
  name: string;
  url: string;
  updated_at: string | null;
};

const BUCKET = 'site-images';

const ImageLibrary: React.FC = () => {
  const [images, setImages] = useState<Img[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function listImages() {
      setLoading(true);
      const { data, error } = await supabaseClient
        .storage
        .from(BUCKET)
        .list('', { limit: 200, offset: 0, sortBy: { column: 'updated_at', order: 'desc' } });
      
      if (error) {
        console.error('Error listing images:', error.message);
        setImages([]);
      } else if (data) {
        // Generate public URLs
        const imgs: Img[] = data
          .filter(file => file && !file.name.endsWith('/')) // Exclude folders
          .map(file => ({
            name: file.name,
            url: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${file.name}`,
            updated_at: file.updated_at ?? null,
          }));
        setImages(imgs);
      }
      setLoading(false);
    }

    listImages();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Image Library</h2>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-dental-orange border-t-transparent rounded-full"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          No images found in bucket.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.map(img => (
            <ImageCard key={img.name} image={img} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageLibrary;
