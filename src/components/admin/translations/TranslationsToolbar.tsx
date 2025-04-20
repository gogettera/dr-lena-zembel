
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";

interface TranslationsToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  locationFilter: string;
  onLocationFilterChange: (value: string) => void;
  uniqueLocations: string[];
  onDownload: () => void;
}

export const TranslationsToolbar: React.FC<TranslationsToolbarProps> = ({
  searchQuery,
  onSearchChange,
  locationFilter,
  onLocationFilterChange,
  uniqueLocations,
  onDownload
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
      <div className="flex gap-4 flex-1">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search translations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="w-64">
          <select
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
            value={locationFilter}
            onChange={(e) => onLocationFilterChange(e.target.value)}
          >
            <option value="">All Locations</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
      <Button onClick={onDownload} variant="outline" className="whitespace-nowrap">
        <Download className="mr-2 h-4 w-4" />
        Download Translations
      </Button>
    </div>
  );
};
