
import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search, Filter, SortAsc, SortDesc } from "lucide-react";
import en from '@/translations/en.json';
import he from '@/translations/he.json';
import de from '@/translations/de.json';
import ru from '@/translations/ru.json';
import ar from '@/translations/ar.json';
import { translationMetadata } from '@/config/translationMetadata';

type Translation = {
  key: string;
  en: string;
  he: string;
  de: string;
  ru: string;
  ar: string;
  maxLength: number;
  location: string;
};

type SortConfig = {
  key: keyof Translation;
  direction: 'asc' | 'desc';
};

const TranslationsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'key', direction: 'asc' });

  const translations: Translation[] = useMemo(() => {
    const allKeys = new Set([
      ...Object.keys(en || {}),
      ...Object.keys(he || {}),
      ...Object.keys(de || {}),
      ...Object.keys(ru || {}),
      ...Object.keys(ar || {})
    ]);
    
    return Array.from(allKeys).map(key => ({
      key,
      en: (en as any)[key] || '',
      he: (he as any)[key] || '',
      de: (de as any)[key] || '',
      ru: (ru as any)[key] || '',
      ar: (ar as any)[key] || '',
      maxLength: translationMetadata[key]?.maxLength || 0,
      location: translationMetadata[key]?.location || 'Unknown'
    }));
  }, []);

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
    let filtered = translations.filter(translation =>
      (translation.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
       Object.values(translation).some(value =>
         typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
       )) &&
      (!locationFilter || translation.location === locationFilter)
    );

    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
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

  // Helper function to safely check string length
  const getLength = (str: string | undefined): number => {
    return str ? str.length : 0;
  };

  // Helper function to check if string exceeds max length
  const exceedsMaxLength = (str: string | undefined, maxLength: number): boolean => {
    return getLength(str) > maxLength && maxLength > 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search translations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="w-64">
            <select
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
        <Button onClick={handleDownload} variant="outline" className="whitespace-nowrap">
          <Download className="mr-2 h-4 w-4" />
          Download Translations
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort('key')}>
                <div className="flex items-center gap-2">
                  Key
                  {sortConfig.key === 'key' && (
                    sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>English</TableHead>
              <TableHead>Hebrew</TableHead>
              <TableHead>German</TableHead>
              <TableHead>Russian</TableHead>
              <TableHead>Arabic</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('maxLength')}>
                <div className="flex items-center gap-2">
                  Max Length
                  {sortConfig.key === 'maxLength' && (
                    sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('location')}>
                <div className="flex items-center gap-2">
                  Location
                  {sortConfig.key === 'location' && (
                    sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredTranslations.map((translation) => (
              <TableRow key={translation.key}>
                <TableCell className="font-medium">{translation.key}</TableCell>
                <TableCell>
                  <div className={exceedsMaxLength(translation.en, translation.maxLength) ? "text-red-500" : ""}>
                    {translation.en}
                    {exceedsMaxLength(translation.en, translation.maxLength) && (
                      <div className="text-xs">
                        Exceeds limit by {getLength(translation.en) - translation.maxLength} characters
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={exceedsMaxLength(translation.he, translation.maxLength) ? "text-red-500" : ""}>
                    {translation.he}
                    {exceedsMaxLength(translation.he, translation.maxLength) && (
                      <div className="text-xs">
                        Exceeds limit by {getLength(translation.he) - translation.maxLength} characters
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={exceedsMaxLength(translation.de, translation.maxLength) ? "text-red-500" : ""}>
                    {translation.de}
                    {exceedsMaxLength(translation.de, translation.maxLength) && (
                      <div className="text-xs">
                        Exceeds limit by {getLength(translation.de) - translation.maxLength} characters
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={exceedsMaxLength(translation.ru, translation.maxLength) ? "text-red-500" : ""}>
                    {translation.ru}
                    {exceedsMaxLength(translation.ru, translation.maxLength) && (
                      <div className="text-xs">
                        Exceeds limit by {getLength(translation.ru) - translation.maxLength} characters
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={exceedsMaxLength(translation.ar, translation.maxLength) ? "text-red-500" : ""}>
                    {translation.ar}
                    {exceedsMaxLength(translation.ar, translation.maxLength) && (
                      <div className="text-xs">
                        Exceeds limit by {getLength(translation.ar) - translation.maxLength} characters
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{translation.maxLength}</TableCell>
                <TableCell>{translation.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TranslationsTable;
