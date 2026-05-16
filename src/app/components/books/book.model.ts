export interface Translation {
  de: string;
  en: string;
}

export interface Book {
  id: number;
  title: string;
  subtitle?: string;
  genre: string;
  image: string;
  description: Translation;
  blurb: string;
}