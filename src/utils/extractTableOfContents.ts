import { TableOfContentsItem } from '../types';
import { normalizeSlug } from './normalize';

export function extractTableOfContents(markdownContent: string): TableOfContentsItem[] {

  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const slug = normalizeSlug(title);

    const id = normalizeSlug(title);
    headings.push({
      id,
      title,
      level,
      slug
    });
  }

  return headings;
}

export function extractTableOfContentsFromHTML(htmlContent: string): TableOfContentsItem[] {
  const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>([^<]+)<\/h[1-6]>/gi;
  const headings: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const title = match[3].trim();
    const slug = normalizeSlug(title);

    headings.push({
      id,
      title,
      level,
      slug
    });
  }

  return headings;
}