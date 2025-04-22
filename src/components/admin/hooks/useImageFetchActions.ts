
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import type { Img } from "../useImageLibraryActions";

const BUCKET = "site-images";

export function useImageFetchActions(checkBucket: () => Promise<boolean>) {
  const [images, setImages] = useState<Img[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const bucketOk = await checkBucket();
    if (!bucketOk) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .list("", { limit: 200, offset: 0, sortBy: { column: "updated_at", order: "desc" } });

      if (error) {
        setImages([]);
        setErrorMsg(`Could not fetch images: ${error.message}`);
      } else if (data) {
        const imgs: Img[] = data
          .filter(file => file && !file.name.endsWith("/"))
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
    } catch {
      setErrorMsg("An unexpected error occurred while fetching images.");
    }
    setLoading(false);
  }, [checkBucket]);

  return {
    images,
    setImages,
    loading,
    setLoading,
    errorMsg,
    setErrorMsg,
    fetchImages,
  };
}
