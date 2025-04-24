
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
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  uploading,
  selectedFile,
  fileInputRef,
  handleFileChange,
  handleUpload,
  errorMsg,
  previewUrl,
  bucketExists
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
