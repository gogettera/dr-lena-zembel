
import React from "react";
import { Button } from "@/components/ui/button";

interface ImageUploadSectionProps {
  uploading: boolean;
  selectedFile: File | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: (files: FileList | null) => Promise<void>;
  errorMsg: string;
  previewUrl: string | null;
  bucketExists: boolean;
  uploadProgress?: number;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  uploading,
  selectedFile,
  fileInputRef,
  handleFileChange,
  handleUpload,
  errorMsg,
  previewUrl,
  bucketExists,
  uploadProgress = 0
}) => (
  <div className="mb-8">
    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
        onChange={handleFileChange}
        className="block border p-2 rounded w-full sm:max-w-xs"
        disabled={uploading || !bucketExists}
      />
      <Button
        variant="orange"
        size="default"
        onClick={() => selectedFile && handleUpload(fileInputRef.current?.files || null)}
        disabled={!selectedFile || uploading || !bucketExists}
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
    
    {errorMsg ? (
      <div className="text-sm text-red-600 mt-2">{errorMsg}</div>
    ) : null}
    
    {uploading && uploadProgress > 0 && (
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-dental-orange h-2.5 rounded-full" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{uploadProgress}% uploaded</p>
      </div>
    )}
    
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
);

export default ImageUploadSection;
