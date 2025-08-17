import { SearchResult } from '@/types';

export interface ExtractedHeading {
  id: string;
  title: string;
  level: number;
  content: string;
  anchor: string;
}

export function extractHeadings(markdownContent: string): ExtractedHeading[] {
  if (!markdownContent || typeof markdownContent !== 'string') {
    return [];
  }

  const headings: ExtractedHeading[] = [];
  const lines = markdownContent.split('\n');

  let currentHeading: ExtractedHeading | null = null;
  let currentContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      if (currentHeading) {
        currentHeading.content = currentContent.join('\n').trim();
        headings.push(currentHeading);
      }

      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      const anchor = createAnchor(title);

      currentHeading = {
        id: `heading-${i}-${anchor}`,
        title,
        level,
        content: '',
        anchor
      };

      currentContent = [];
    } else {
      if (currentHeading) {
        currentContent.push(line);
      }
    }
  }

  if (currentHeading) {
    currentHeading.content = currentContent.join('\n').trim();
    headings.push(currentHeading);
  }

  return headings;
}

function createAnchor(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function headingsToSearchResults(
  headings: ExtractedHeading[],
  pageId: string,
  pageTitle: string,
  pageCategory: string,
  baseHref: string,
  cleanContent: (content: string) => string
): SearchResult[] {
  return headings
    .filter(heading => heading.title && heading.content.trim().length > 10)
    .map(heading => ({
      id: `${pageId}-${heading.id}`,
      title: heading.title,
      content: cleanContent(heading.content),
      category: `${pageCategory} › ${pageTitle}`,
      href: `${baseHref}#${heading.anchor}`,
      type: 'heading' as const
    }));
}