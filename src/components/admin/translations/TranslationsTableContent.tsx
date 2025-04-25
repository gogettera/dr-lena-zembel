import React from 'react';
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { SortAsc, SortDesc } from "lucide-react";
import { Translation, SortConfig } from './types';
import { formatTranslationValue } from '@/utils/translation';

interface TranslationsTableContentProps {
  sortConfig: SortConfig;
  onSort: (key: keyof Translation) => void;
  translations: Translation[];
}

const getLength = (str: string | undefined): number => {
  return str ? str.length : 0;
};

const exceedsMaxLength = (str: string | undefined, maxLength: number): boolean => {
  return getLength(str) > maxLength && maxLength > 0;
};

export const TranslationsTableContent: React.FC<TranslationsTableContentProps> = ({
  sortConfig,
  onSort,
  translations
}) => {
  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] cursor-pointer" onClick={() => onSort('key')}>
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
          <TableHead className="cursor-pointer" onClick={() => onSort('maxLength')}>
            <div className="flex items-center gap-2">
              Max Length
              {sortConfig.key === 'maxLength' && (
                sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
              )}
            </div>
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => onSort('location')}>
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
        {translations.map((translation) => (
          <TableRow key={translation.key}>
            <TableCell className="font-medium">{translation.key}</TableCell>
            <TableCell>
              <div className={exceedsMaxLength(translation.en, translation.maxLength) ? "text-red-500" : ""}>
                {formatTranslationValue(translation.en)}
                {exceedsMaxLength(translation.en, translation.maxLength) && (
                  <div className="text-xs">
                    Exceeds limit by {getLength(translation.en) - translation.maxLength} characters
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className={exceedsMaxLength(translation.he, translation.maxLength) ? "text-red-500" : ""}>
                {formatTranslationValue(translation.he)}
                {exceedsMaxLength(translation.he, translation.maxLength) && (
                  <div className="text-xs">
                    Exceeds limit by {getLength(translation.he) - translation.maxLength} characters
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className={exceedsMaxLength(translation.de, translation.maxLength) ? "text-red-500" : ""}>
                {formatTranslationValue(translation.de)}
                {exceedsMaxLength(translation.de, translation.maxLength) && (
                  <div className="text-xs">
                    Exceeds limit by {getLength(translation.de) - translation.maxLength} characters
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className={exceedsMaxLength(translation.ru, translation.maxLength) ? "text-red-500" : ""}>
                {formatTranslationValue(translation.ru)}
                {exceedsMaxLength(translation.ru, translation.maxLength) && (
                  <div className="text-xs">
                    Exceeds limit by {getLength(translation.ru) - translation.maxLength} characters
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className={exceedsMaxLength(translation.ar, translation.maxLength) ? "text-red-500" : ""}>
                {formatTranslationValue(translation.ar)}
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
    </>
  );
};
