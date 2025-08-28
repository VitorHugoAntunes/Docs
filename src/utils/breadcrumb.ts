import { getDocBySlug, NavigationSection } from '@/lib/docs'

interface BreadcrumbItem {
  title: string
  href?: string
  isActive?: boolean
}

export function generateBreadcrumbs(
  navigation: NavigationSection[],
  currentSlug: string,
  includeHome = true
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = []

  if (includeHome) {
    breadcrumbs.push({
      title: 'Início',
      href: '/'
    })
  }

  const currentDoc = getDocBySlug(currentSlug)
  if (!currentDoc) {
    return breadcrumbs
  }

  const currentSection = navigation.find(section =>
    section.category === currentDoc.category
  )

  if (currentSection) {
    if (currentSection.mainSlug) {
      breadcrumbs.push({
        title: currentSection.category,
        href: `/${currentSection.mainSlug}`
      })
    } else {
      breadcrumbs.push({
        title: currentSection.category
      })
    }

    if (currentDoc.slug !== currentSection.mainSlug) {
      breadcrumbs.push({
        title: currentDoc.title,
        isActive: true
      })
    } else {
      breadcrumbs[breadcrumbs.length - 1].isActive = true
    }
  } else {
    breadcrumbs.push({
      title: currentDoc.title,
      isActive: true
    })
  }

  return breadcrumbs
}

export function generateBreadcrumbsFromSlug(
  slug: string,
  includeHome = true
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = []

  if (includeHome) {
    breadcrumbs.push({
      title: 'Início',
      href: '/'
    })
  }

  const doc = getDocBySlug(slug)

  if (doc) {
    breadcrumbs.push({
      title: doc.title,
      isActive: true
    })
  } else {
    const slugParts = slug.split('/').filter(Boolean)

    slugParts.forEach((part, index) => {
      const isLast = index === slugParts.length - 1
      const href = '/' + slugParts.slice(0, index + 1).join('/')

      breadcrumbs.push({
        title: formatSlugPart(part),
        href: isLast ? undefined : href,
        isActive: isLast
      })
    })
  }

  return breadcrumbs
}

function formatSlugPart(part: string): string {
  return part
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function generateBreadcrumbsFromDocOrder(
  currentSlug: string,
  includeHome = true
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = []

  if (includeHome) {
    breadcrumbs.push({
      title: 'Início',
      href: '/'
    })
  }

  const currentDoc = getDocBySlug(currentSlug)
  if (!currentDoc) {
    return breadcrumbs
  }

  if (currentDoc.category && currentDoc.category !== 'Geral') {
    breadcrumbs.push({
      title: currentDoc.category
    })
  }

  breadcrumbs.push({
    title: currentDoc.title,
    isActive: true
  })

  return breadcrumbs
}

export type { BreadcrumbItem }
