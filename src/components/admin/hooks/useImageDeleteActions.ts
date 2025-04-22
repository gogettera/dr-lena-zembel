
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const BUCKET = "site-images";

export function useImageDeleteActions(bucketExists: boolean, checkBucket: () => Promise<boolean>, fetchImages: () => Promise<void>) {
  const handleDelete = useCallback(async (name: string) => {
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
    try {
      const { error } = await supabase.storage.from(BUCKET).remove([name]);
      if (error) {
        toast({ title: "Failed to delete", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Image deleted" });
        await fetchImages();
      }
    } catch {
      toast({
        title: "Delete failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  }, [bucketExists, checkBucket, fetchImages]);
  return { handleDelete };
}
