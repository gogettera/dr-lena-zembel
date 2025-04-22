
import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card } from '@/components/ui/card';
import ImageCard from './ImageCard';
import { validateImageFile, createFilePreview } from '@/utils/fileUtils';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

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
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabaseClient
      .storage
      .from(BUCKET)
      .list('', { limit: 200, offset: 0, sortBy: { column: 'updated_at', order: 'desc' } });

    if (error) {
      console.error('Error listing images:', error.message);
      setImages([]);
    } else if (data) {
      const imgs: Img[] = data
        .filter(file => file && !file.name.endsWith('/'))
        .map(file => ({
          name: file.name,
          url: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${file.name}`,
          updated_at: file.updated_at ?? null,
        }));
      setImages(imgs);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle file input change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setErrorMsg("");
    setPreviewUrl(null);

    const { valid, message } = validateImageFile(file, 5);
    if (!valid) {
      setErrorMsg(message || "Invalid file.");
      setSelectedFile(null);
      return;
    }
    // Create preview
    if (file) {
      const preview = await createFilePreview(file);
      setPreviewUrl(preview);
    }
  };

  // Upload image to Supabase
  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMsg("Select an image to upload first.");
      return;
    }
    setUploading(true);
    setErrorMsg("");
    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Date.now()}_${selectedFile.name.replace(/\s+/g, '_')}`;
    const filePath = fileName;

    // Upload file
    const { error } = await supabaseClient.storage
      .from(BUCKET)
      .upload(filePath, selectedFile, {
        upsert: false, // Don't overwrite existing files
      });

    if (error) {
      setErrorMsg(error.message || "Failed to upload.");
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Image uploaded successfully", variant: "default" });
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchImages();
    }
    setUploading(false);
  };

  // Remove image (called by card)
  const handleDelete = async (name: string) => {
    setLoading(true);
    const { error } = await supabaseClient.storage
      .from(BUCKET)
      .remove([name]);
    if (error) {
      toast({ title: "Failed to delete", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Image deleted" });
      fetchImages();
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Image Library</h2>

      {/* Upload section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            onChange={handleFileChange}
            className="block border p-2 rounded w-full sm:max-w-xs"
            disabled={uploading}
          />
          <Button
            variant="orange"
            size="default"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
        {errorMsg ? (
          <div className="text-sm text-red-600 mt-2">{errorMsg}</div>
        ) : null}
        {previewUrl && (
          <div className="mt-4">
            <span className="block mb-1 text-xs text-gray-500">Preview:</span>
            <img
              src={previewUrl}
              alt="Preview"
              className="h-32 border rounded shadow bg-gray-50 object-contain"
            />
          </div>
        )}
      </div>
      
      {/* Images grid */}
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
            <ImageCard
              key={img.name}
              image={img}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageLibrary;
