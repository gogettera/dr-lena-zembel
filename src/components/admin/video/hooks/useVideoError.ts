
import { useState } from 'react';

export const useVideoError = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.message);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    handleError,
    clearError
  };
};
