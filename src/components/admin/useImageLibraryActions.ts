
import { useImageLibraryState } from "./hooks/useImageLibraryState";
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
  // Create shared state
  const state = useImageLibraryState();
  
  // Extract needed state values for passing to child hooks
  const { bucketExists } = state;
  
  // Initialize all action hooks with shared state
  const bucketCheck = useBucketCheckActions(state);
  const fetcher = useImageFetchActions(bucketCheck.checkBucket, state);
  
  const upload = useImageUploadActions(
    bucketExists,
    bucketCheck.checkBucket,
    fetcher.fetchImages,
    state
  );
  
  const imageDelete = useImageDeleteActions(
    bucketExists,
    bucketCheck.checkBucket,
    fetcher.fetchImages,
    state
  );

  return {
    // Expose state
    ...state,
    
    // Expose bucket check actions
    handleRetry: async () => {
      await bucketCheck.handleRetry(fetcher.fetchImages);
    },
    handleCreateBucket: bucketCheck.handleCreateBucket,
    
    // Expose image fetch actions
    fetchImages: fetcher.fetchImages,
    
    // Expose upload actions
    fileInputRef: upload.fileInputRef,
    handleFileChange: upload.handleFileChange,
    handleUpload: upload.handleUpload,
    
    // Expose delete actions
    handleDelete: imageDelete.handleDelete,
  };
}
