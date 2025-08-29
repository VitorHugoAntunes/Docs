import { ReactNode } from 'react';

export interface NavItem {
  id: string;
  title: string;
  href: string;
  slug: string;
  children?: Array<{
    id: string;
    title: string;
    slug: string;
    href: string;
    order?: number;
    description?: string;
  }>;
}

export interface DocPage {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  content: string | ReactNode;
  extraContent?: ReactNode;
  order?: number;
  isIndexPage?: boolean;
  description?: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  slug: string;
  children?: TableOfContentsItem[];
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  category: string;
  href: string;
  type: 'page' | 'heading';
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DocFrontmatter {
  title: string
  description?: string
  order?: number
  category?: string
  isMainCategory?: boolean
}

export interface DocMeta extends DocFrontmatter {
  slug: string
  originalSlug: string
  path: string
}

export interface NavigationItem {
  title: string
  slug: string
  order: number
}

export interface NavigationSection {
  category: string
  mainSlug?: string
  items: NavigationItem[]
}

export interface NavigationLink {
  title: string
  slug: string
  description?: string
}

export interface DocumentOrderItem {
  title: string
  slug: string
  originalSlug: string
  category: string
  isMain: boolean
  order: number
  index: number
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
}