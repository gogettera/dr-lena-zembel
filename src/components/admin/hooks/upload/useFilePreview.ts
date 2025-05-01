
import { useCallback } from "react";

export function useFilePreview() {
  const createPreview = useCallback((file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  return {
    createPreview
  };
}
