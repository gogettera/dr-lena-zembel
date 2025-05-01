
import { useCallback } from "react";
import { useImageDelete } from "./image-delete/useImageDelete";
import { toast } from "@/components/ui/use-toast";

export function useImageDeleteActions(
  bucketExists: boolean, 
  checkBucket: () => Promise<boolean>, 
  fetchImages: () => Promise<void>,
  sharedState: ReturnType<typeof import('./useImageLibraryState').useImageLibraryState>
) {
  const { setLoading } = sharedState;
  const { deleteImage } = useImageDelete();

  const handleDelete = useCallback(async (name: string) => {
    if (!bucketExists) {
      const bucketOk = await checkBucket();
      if (!bucketOk) {
        toast({
          title: "Delete failed",
          description: `Storage bucket "site-images" not found`,
          variant: "destructive"
        });
        return;
      }
    }
    
    setLoading(true);
    
    const result = await deleteImage(name);
    
    if (result.success) {
      await fetchImages();
    }
    
    setLoading(false);
  }, [bucketExists, checkBucket, fetchImages, setLoading, deleteImage]);
  
  return { handleDelete };
}
