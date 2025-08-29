import { DocMeta } from '@/types'
import { getCategoryOrder } from './constants'
import { getDocBySlug } from './docReader'
import { getDocSlugs } from './fileUtils'

export function getAllDocs(): DocMeta[] {
  const slugs = getDocSlugs()
  return slugs
    .map(slug => getDocBySlug(slug))
    .filter((doc): doc is DocMeta => doc !== null)
    .sort((a, b) => {
      const categoryOrderA = getCategoryOrder(a.category || 'Geral')
      const categoryOrderB = getCategoryOrder(b.category || 'Geral')

      if (categoryOrderA !== categoryOrderB) {
        return categoryOrderA - categoryOrderB
      }

      if (a.isMainCategory && !b.isMainCategory) return -1
      if (!a.isMainCategory && b.isMainCategory) return 1

      return (a.order ?? 999) - (b.order ?? 999)
    })
}