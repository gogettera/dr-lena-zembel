import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import ImageCard from './ImageCard';
import { validateImageFile, createFilePreview } from '@/utils/fileUtils';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const BUCKET = 'site-images';

type Img = {
  name: string;
  url: string;
  updated_at: string | null;
};

const ImageLibrary: React.FC = () => {
  const [images, setImages] = useState<Img[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [bucketExists, setBucketExists] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const checkBucket = async () => {
    try {
      const { data, error } = await supabase.storage.getBucket(BUCKET);
      if (error) {
        console.error('Bucket check error:', error.message);
        setBucketExists(false);
        setErrorMsg(`Storage bucket "${BUCKET}" not found. Please ensure it exists in your Supabase project.`);
        return false;
      }
      setBucketExists(true);
      return true;
    } catch (error) {
      console.error('Bucket check exception:', error);
      setBucketExists(false);
      setErrorMsg(`Error checking bucket "${BUCKET}". Please ensure Supabase is properly configured.`);
      return false;
    }
  };

  const fetchImages = async () => {
    setLoading(true);
    const bucketOk = await checkBucket();
    if (!bucketOk) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .storage
        .from(BUCKET)
        .list('', { limit: 200, offset: 0, sortBy: { column: 'updated_at', order: 'desc' } });

      if (error) {
        console.error('Error listing images:', error.message);
        setImages([]);
        setErrorMsg(`Could not fetch images: ${error.message}`);
      } else if (data) {
        const imgs: Img[] = data
          .filter(file => file && !file.name.endsWith('/'))
          .map(file => {
            const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(file.name);
            return {
              name: file.name,
              url: publicUrlData.publicUrl,
              updated_at: file.updated_at ?? null,
            };
          });
        setImages(imgs);
        setErrorMsg("");
      }
    } catch (error) {
      console.error('Exception fetching images:', error);
      setErrorMsg("An unexpected error occurred while fetching images.");
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

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
    if (file) {
      const preview = await createFilePreview(file);
      setPreviewUrl(preview);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMsg("Select an image to upload first.");
      return;
    }

    if (!bucketExists) {
      const bucketOk = await checkBucket();
      if (!bucketOk) {
        toast({ 
          title: "Upload failed", 
          description: `Storage bucket "${BUCKET}" not found. Please ensure it exists in your Supabase project.`, 
          variant: "destructive" 
        });
        return;
      }
    }

    setUploading(true);
    setErrorMsg("");
    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Date.now()}_${selectedFile.name.replace(/\s+/g, '_')}`;
    const filePath = fileName;

    try {
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, selectedFile, {
          upsert: false,
        });

      if (uploadError) {
        setErrorMsg(uploadError.message || "Failed to upload.");
        toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      } else {
        toast({ title: "Image uploaded successfully", variant: "default" });
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchImages();
      }
    } catch (error) {
      console.error('Upload exception:', error);
      toast({ 
        title: "Upload failed", 
        description: "An unexpected error occurred during upload", 
        variant: "destructive" 
      });
    }
    
    setUploading(false);
  };

  const handleDelete = async (name: string) => {
    if (!bucketExists) {
      const bucketOk = await checkBucket();
      if (!bucketOk) {
        toast({ 
          title: "Delete failed", 
          description: `Storage bucket "${BUCKET}" not found`, 
          variant: "destructive" 
        });
        return;
      }
    }

    setLoading(true);
    try {
      const { error } = await supabase.storage
        .from(BUCKET)
        .remove([name]);
      if (error) {
        toast({ title: "Failed to delete", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Image deleted" });
        fetchImages();
      }
    } catch (error) {
      console.error('Delete exception:', error);
      toast({ 
        title: "Delete failed", 
        description: "An unexpected error occurred", 
        variant: "destructive" 
      });
    }
    
    setLoading(false);
  };

  const handleCreateBucket = async () => {
    setErrorMsg("Creating a storage bucket requires administrator access to your Supabase project. Please create a bucket named 'site-images' in the Supabase dashboard.");
    toast({ 
      title: "Action required", 
      description: "Please create a 'site-images' bucket in your Supabase dashboard", 
      variant: "default" 
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Image Library</h2>

      {!bucketExists && (
        <div className="mb-6 p-4 border border-red-300 bg-red-50 rounded-md">
          <h3 className="text-red-700 font-medium mb-2">Storage Bucket Not Found</h3>
          <p className="text-red-600 mb-3">
            The storage bucket "{BUCKET}" was not found in your Supabase project.
          </p>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleCreateBucket}
          >
            How to Fix
          </Button>
        </div>
      )}

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            onChange={handleFileChange}
            className="block border p-2 rounded w-full sm:max-w-xs"
            disabled={uploading || !bucketExists}
          />
          <Button
            variant="orange"
            size="default"
            onClick={handleUpload}
            disabled={!selectedFile || uploading || !bucketExists}
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
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-dental-orange border-t-transparent rounded-full"></div>
        </div>
      ) : bucketExists && images.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          No images found in bucket.
        </div>
      ) : bucketExists ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.map(img => (
            <ImageCard
              key={img.name}
              image={img}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ImageLibrary;
