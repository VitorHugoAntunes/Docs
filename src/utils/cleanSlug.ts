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