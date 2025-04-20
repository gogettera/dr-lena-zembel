
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileVideo2 } from "lucide-react";

interface AddVideoButtonProps {
  onAdd: () => void;
}

const AddVideoButton: React.FC<AddVideoButtonProps> = ({ onAdd }) => {
  return (
    <Button onClick={onAdd} variant="outline">
      <FileVideo2 className="w-4 h-4 mr-2" />
      Add New Video
    </Button>
  );
};

export default AddVideoButton;
