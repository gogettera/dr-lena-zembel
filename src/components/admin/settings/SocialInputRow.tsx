
import React from "react";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SocialInputRowProps {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  field: any;
  loading?: boolean;
}

const SocialInputRow: React.FC<SocialInputRowProps> = ({
  icon,
  label,
  placeholder,
  field,
  loading = false,
}) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <div className="flex items-center">
        {icon}
        <Input
          {...field}
          placeholder={placeholder}
          disabled={loading}
        />
      </div>
    </FormControl>
  </FormItem>
);

export default SocialInputRow;
