
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save, X, Edit } from "lucide-react";

interface EditableFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onSave: (value: string) => Promise<void>;
  disabled?: boolean;
}

const EditableField = ({ id, label, value, placeholder, onSave, disabled }: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (editValue.trim() !== value) {
      setIsSaving(true);
      try {
        await onSave(editValue.trim());
        setIsEditing(false);
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value || '');
  };

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2 items-center">
        {isEditing ? (
          <>
            <Input
              id={`${id}-edit`}
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              autoFocus
              className="flex-1"
              placeholder={placeholder}
              required
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSave}
              disabled={isSaving || !editValue.trim()}
            >
              <Save className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Input
              id={id}
              value={value || ''}
              disabled
              className="flex-1 bg-gray-100"
              placeholder={placeholder}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              disabled={disabled}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditableField;
