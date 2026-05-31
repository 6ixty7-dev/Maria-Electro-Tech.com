/**
 * Unified TypeScript Type Definitions
 * Maria Electro Tech Operations System
 */

export interface Blog {
  id?: string;
  title: string;
  slug: string;
  content: string;
  seo_description: string;
  image_url: string;
  storage_path: string;
  category: string;
  tags: string[];
  is_published: boolean;
  published_at?: string;
  created_at?: string;
}

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category: string;
  created_at?: string;
}

export interface PricingPackage {
  id?: string;
  name: string;
  price: string;
  period: string;
  category: string;
  features: string[];
  is_popular: boolean;
  created_at?: string;
}

export interface GalleryItem {
  id?: string;
  url: string;
  storage_path: string;
  category: string;
  alt_text: string;
  created_at?: string;
}

export interface ServiceProfile {
  key: string;
  name: string;
  category: string;
  title: string;
  description: string;
  startsAt: number;
  icon: string;
  features: string[];
}

export interface Locality {
  key: string;
  name: string;
  landmarks: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}
