export type ProjectCategory =
  | "industrial"
  | "office"
  | "residential"
  | "villa";

export type ProjectStatus =
  | "completed"
  | "concept"
  | "ongoing";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: number;
  location: string;
  client?: string;
  area?: number;
  status: string;
  hero: string;
  gallery: string[];
  plans?: string[];
  description: string;
  services: string[];
  featured: boolean;
}