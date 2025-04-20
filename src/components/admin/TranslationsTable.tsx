
import React, { useState, useMemo } from 'react';
import { Table } from "@/components/ui/table";
import { Translation, SortConfig } from './translations/types';
import { useTranslations } from './translations/useTranslations';
import { TranslationsToolbar } from './translations/TranslationsToolbar';
import { TranslationsTableContent } from './translations/TranslationsTableContent';
import { Skeleton } from "@/components/ui/skeleton";
import { formatTranslationValue, isNestedObject } from '@/utils/translation-helpers';

const LoadingState = () => (
  <div className="space-y-4">
    <div className="flex gap-4">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="border rounded-lg">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b p-4">
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  </div>
);

// Helper function to stringify nested objects for display/searching
const stringifyNestedObject = (obj: any): string => {
  if (!isNestedObject(obj)) return String(obj);
  return formatTranslationValue(obj);
};

const TranslationsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'key', direction: 'asc' });
  
  const { translations, isLoading } = useTranslations();

  const uniqueLocations = useMemo(() => {
    const locations = new Set(translations.map(t => t.location));
    return Array.from(locations).sort();
  }, [translations]);

  const handleSort = (key: keyof Translation) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedAndFilteredTranslations = useMemo(() => {
    let filtered = translations.filter(translation => {
      // Filter by search query
      const searchInTranslation = (obj: any): boolean => {
        if (typeof obj === 'string') {
          return obj.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (isNestedObject(obj)) {
          // Search in nested object values
          return Object.values(obj).some(value => searchInTranslation(value));
        }
        return false;
      };

      return (
        (translation.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Object.entries(translation).some(([key, value]) => {
          if (key === 'key') return false; // Already checked above
          return searchInTranslation(value);
        })) &&
        (!locationFilter || translation.location === locationFilter)
      );
    });

    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // For nested objects, convert to string for comparison
      const aStr = isNestedObject(aValue) ? stringifyNestedObject(aValue) : String(aValue);
      const bStr = isNestedObject(bValue) ? stringifyNestedObject(bValue) : String(bValue);
      
      return sortConfig.direction === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [translations, searchQuery, locationFilter, sortConfig]);

  const handleDownload = () => {
    const exportData = sortedAndFilteredTranslations.map(({ key, en, he, de, ru, ar, maxLength, location }) => ({
      key,
      en,
      he,
      de,
      ru,
      ar,
      maxLength,
      location
    }));

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translations.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      <TranslationsToolbar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        locationFilter={locationFilter}
        onLocationFilterChange={setLocationFilter}
        uniqueLocations={uniqueLocations}
        onDownload={handleDownload}
      />

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TranslationsTableContent 
            sortConfig={sortConfig}
            onSort={handleSort}
            translations={sortedAndFilteredTranslations}
          />
        </Table>
      </div>
    </div>
  );
};

export default TranslationsTable;
