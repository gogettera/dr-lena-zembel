
import { useEffect } from 'react';

export const usePreloadImages = (imagePaths: string[]) => {
  useEffect(() => {
    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }, [imagePaths]);
};
