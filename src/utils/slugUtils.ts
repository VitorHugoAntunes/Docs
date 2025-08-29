import { getDocSlugs } from './fileUtils'

export function cleanSlug(slug: string): string {
  return slug
    .split('/')
    .map(segment =>
      segment
        .replace(/^\d+[A-Za-z]?[_-]/, '') // Remove prefixos como "01_", "16A-", "13B_"
        .replace(/[_]/g, '-')             // Converte underscores para hífens
        .toLowerCase()                    // Minúsculas
    )
    .join('/')
}

export function findFileByCleanSlug(cleanedSlug: string): string | null {
  const allSlugs = getDocSlugs()
  return allSlugs.find(slug => cleanSlug(slug) === cleanedSlug) || null
}

export function generateSlugForDoc(originalSlug: string, isMainCategory: boolean): string {
  if (isMainCategory) {
    const pathParts = originalSlug.split('/')
    if (pathParts.length > 1) {
      const folderName = pathParts[pathParts.length - 2]
      return cleanSlug(folderName)
    }
  }

  return cleanSlug(originalSlug)
}