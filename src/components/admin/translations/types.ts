
export type Translation = {
  key: string;
  en: string;
  he: string;
  de: string;
  ru: string;
  ar: string;
  maxLength: number;
  location: string;
};

export type SortConfig = {
  key: keyof Translation;
  direction: 'asc' | 'desc';
};
