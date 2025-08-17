import { SearchResult } from '@/types';

export interface GroupedSearchResult {
  category: string;
  results: SearchResult[];
  totalMatches: number;
}

export function groupSearchResults(results: SearchResult[]): GroupedSearchResult[] {
  if (!results || results.length === 0) {
    return [];
  }

  const pages = results.filter(r => r.type === 'page');
  const headings = results.filter(r => r.type === 'heading');

  const pageGroups = pages.reduce((acc, result) => {
    const mainCategory = result.category.split('›')[0].trim();

    if (!acc[mainCategory]) {
      acc[mainCategory] = [];
    }

    acc[mainCategory].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const headingGroups = headings.reduce((acc, result) => {
    const fullCategory = result.category;

    if (!acc[fullCategory]) {
      acc[fullCategory] = [];
    }

    acc[fullCategory].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const allGroups: GroupedSearchResult[] = [];

  Object.entries(pageGroups).forEach(([category, categoryResults]) => {
    allGroups.push({
      category,
      results: categoryResults.sort((a, b) => a.title.localeCompare(b.title)),
      totalMatches: categoryResults.length
    });
  });

  Object.entries(headingGroups).forEach(([category, categoryResults]) => {
    allGroups.push({
      category,
      results: categoryResults.sort((a, b) => a.title.localeCompare(b.title)),
      totalMatches: categoryResults.length
    });
  });

  return allGroups.sort((a, b) => {
    const aIsPageGroup = !a.category.includes('›');
    const bIsPageGroup = !b.category.includes('›');

    if (aIsPageGroup && !bIsPageGroup) return -1;
    if (!aIsPageGroup && bIsPageGroup) return 1;

    if (a.totalMatches !== b.totalMatches) {
      return b.totalMatches - a.totalMatches;
    }

    return a.category.localeCompare(b.category);
  });
}

export function groupSearchResultsByPage(results: SearchResult[]): GroupedSearchResult[] {
  if (!results || results.length === 0) {
    return [];
  }

  const getPageName = (href: string): string => {
    const parts = href.split('/');
    const lastPart = parts[parts.length - 1] || parts[parts.length - 2];
    return lastPart || 'Página';
  };

  const grouped = results.reduce((acc, result) => {
    const pageKey = `${result.category}::${getPageName(result.href)}`;

    if (!acc[pageKey]) {
      acc[pageKey] = {
        category: result.category,
        pageName: getPageName(result.href),
        results: []
      };
    }

    acc[pageKey].results.push(result);
    return acc;
  }, {} as Record<string, { category: string; pageName: string; results: SearchResult[] }>);

  const groupedArray: GroupedSearchResult[] = Object.values(grouped)
    .map(({ category, pageName, results: pageResults }) => ({
      category: `${category} - ${pageName}`,
      results: pageResults.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'page' ? -1 : 1;
        }
        return a.title.localeCompare(b.title);
      }),
      totalMatches: pageResults.length
    }))
    .sort((a, b) => b.totalMatches - a.totalMatches);

  return groupedArray;
}