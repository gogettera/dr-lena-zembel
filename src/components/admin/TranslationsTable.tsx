
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import en from '@/translations/en.json';
import he from '@/translations/he.json';
import de from '@/translations/de.json';
import ru from '@/translations/ru.json';
import ar from '@/translations/ar.json';

type Translation = {
  key: string;
  en: string;
  he: string;
  de: string;
  ru: string;
  ar: string;
};

const TranslationsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const translations: Translation[] = Object.keys(en).map(key => ({
    key,
    en: en[key as keyof typeof en],
    he: he[key as keyof typeof he],
    de: de[key as keyof typeof de],
    ru: ru[key as keyof typeof ru],
    ar: ar[key as keyof typeof ar],
  }));

  const filteredTranslations = translations.filter(translation =>
    translation.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    Object.values(translation).some(value =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDownload = () => {
    const jsonString = JSON.stringify(translations, null, 2);
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search translations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={handleDownload} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Translations
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Key</TableHead>
              <TableHead>English</TableHead>
              <TableHead>Hebrew</TableHead>
              <TableHead>German</TableHead>
              <TableHead>Russian</TableHead>
              <TableHead>Arabic</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTranslations.map((translation) => (
              <TableRow key={translation.key}>
                <TableCell className="font-medium">{translation.key}</TableCell>
                <TableCell>{translation.en}</TableCell>
                <TableCell>{translation.he}</TableCell>
                <TableCell>{translation.de}</TableCell>
                <TableCell>{translation.ru}</TableCell>
                <TableCell>{translation.ar}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TranslationsTable;
