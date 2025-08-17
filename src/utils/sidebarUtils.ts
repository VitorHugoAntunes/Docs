import { NavItem } from '@/types';

export function getInitialSidebarState(navigation: NavItem[], pathname: string) {
  const expandedItems: string[] = [];

  function findActiveItem(items: NavItem[], parentTitles: string[] = []): NavItem | null {
    for (const item of items) {
      if (item.href && (pathname === item.href || pathname.startsWith(item.href + '/'))) {
        expandedItems.push(...parentTitles, item.title);
        return item;
      }

      if (item.children) {
        const activeChild = findActiveItem(item.children, [...parentTitles, item.title]);
        if (activeChild) {
          return activeChild;
        }
      }
    }
    return null;
  }

  findActiveItem(navigation);

  return {
    currentPath: pathname,
    expandedItems: Array.from(new Set(expandedItems)), // Remove duplicates
  };
}