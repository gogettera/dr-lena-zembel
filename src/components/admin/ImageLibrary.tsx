
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useImageLibraryActions } from './useImageLibraryActions';
import ImageUploadSection from './ImageUploadSection';
import ImageGrid from './ImageGrid';
import BucketErrorAlert from './BucketErrorAlert';

const ImageLibrary: React.FC = () => {
  const {
    // State
    images,
    loading,
    bucketExists,
    bucketErrorMsg,
    checkInProgress,
    uploading,
    previewUrl,
    selectedFile,
    uploadErrorMsg,
    fileInputRef,
    
    // Actions
    fetchImages,
    handleRetry,
    handleCreateBucket,
    handleFileChange,
    handleUpload,
    handleDelete
  } = useImageLibraryActions();

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Image Library</h2>

      <BucketErrorAlert
        bucketExists={bucketExists}
        checkInProgress={checkInProgress}
        handleRetry={handleRetry}
        handleCreateBucket={handleCreateBucket}
        errorMsg={bucketErrorMsg}
      />

      <ImageUploadSection
        uploading={uploading}
        selectedFile={selectedFile}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        handleUpload={() => selectedFile && handleUpload(new DataTransfer().files)}
        errorMsg={uploadErrorMsg}
        previewUrl={previewUrl}
        bucketExists={bucketExists}
      />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-dental-orange border-t-transparent rounded-full"></div>
        </div>
      ) : bucketExists && images.length === 0 ? (
        <div className="text-gray-400 text-center py-8">No images found in bucket.</div>
      ) : bucketExists ? (
        <ImageGrid images={images} onDelete={handleDelete} />
      ) : null}
    </div>
  );
};

export default ImageLibrary;
