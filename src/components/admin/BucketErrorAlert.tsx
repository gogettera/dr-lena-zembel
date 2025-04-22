
import React from "react";
import { Button } from "@/components/ui/button";

interface BucketErrorAlertProps {
  bucketExists: boolean;
  checkInProgress: boolean;
  handleRetry: () => void;
  handleCreateBucket: () => void;
  errorMsg: string;
}

const BucketErrorAlert: React.FC<BucketErrorAlertProps> = ({
  bucketExists,
  checkInProgress,
  handleRetry,
  handleCreateBucket,
  errorMsg
}) =>
  !bucketExists ? (
    <div className="mb-6 p-4 border border-red-300 bg-red-50 rounded-md flex flex-col gap-2">
      <h3 className="text-red-700 font-medium mb-2">Storage Bucket Not Found</h3>
      <p className="text-red-600 mb-1">
        {errorMsg || 'The storage bucket was not found in your Supabase project.'}
      </p>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleRetry}
        disabled={checkInProgress}
        className="w-fit"
      >
        {checkInProgress ? "Checking..." : "Retry Now"}
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleCreateBucket}
        className="w-fit"
      >
        How to Fix
      </Button>
    </div>
  ) : null;

export default BucketErrorAlert;
