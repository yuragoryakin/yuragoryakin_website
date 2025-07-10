export type EducationItem = {
  institute: string;
  degree: string;
};

export type ImageItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  'data-ai-hint': string;
};

export type SectionData = {
  id: number;
  name: string;
  type?: 'education';
  heading?: {
    brand: string;
    date: string;
    title: string;
  };
  content: string | string[] | string[][] | EducationItem[];
  images?: ImageItem[];
}; 