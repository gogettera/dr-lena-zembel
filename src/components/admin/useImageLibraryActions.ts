
import { useBucketCheckActions } from "./hooks/useBucketCheckActions";
import { useImageFetchActions } from "./hooks/useImageFetchActions";
import { useImageUploadActions } from "./hooks/useImageUploadActions";
import { useImageDeleteActions } from "./hooks/useImageDeleteActions";

export type Img = {
  name: string;
  url: string;
  updated_at: string | null;
};

export function useImageLibraryActions() {
  const bucketCheck = useBucketCheckActions();
  const fetcher = useImageFetchActions(bucketCheck.checkBucket);

  const upload = useImageUploadActions(
    bucketCheck.bucketExists,
    bucketCheck.checkBucket,
    fetcher.fetchImages
  );
  const { handleDelete } = useImageDeleteActions(
    bucketCheck.bucketExists,
    bucketCheck.checkBucket,
    fetcher.fetchImages
  );

  return {
    // bucket check state
    bucketExists: bucketCheck.bucketExists,
    checkInProgress: bucketCheck.checkInProgress,
    bucketErrorMsg: bucketCheck.errorMsg,
    handleRetry: async () => {
      await bucketCheck.handleRetry(fetcher.fetchImages);
    },
    handleCreateBucket: bucketCheck.handleCreateBucket,

    // image list state
    images: fetcher.images,
    loading: fetcher.loading,
    fetchImages: fetcher.fetchImages,

    // upload section state
    uploading: upload.uploading,
    selectedFile: upload.selectedFile,
    fileInputRef: upload.fileInputRef,
    handleFileChange: upload.handleFileChange,
    handleUpload: upload.handleUpload,
    uploadErrorMsg: upload.errorMsg,
    previewUrl: upload.previewUrl,

    // delete action
    handleDelete,
  };
}
