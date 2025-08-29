import { DocumentOrderItem, NavigationLink, NavigationSection } from '@/types'
import { getCategoryOrder } from './constants'
import { getAllDocs } from './docAggregator'

export function getNavigation(): NavigationSection[] {
  const docs = getAllDocs()
  const grouped = docs.reduce((acc, doc) => {
    const category = doc.category || 'Geral'
    if (!acc[category]) {
      acc[category] = {
        category,
        items: [],
        mainSlug: undefined,
      }
    }

    if (doc.isMainCategory) {
      acc[category].mainSlug = doc.slug
    } else {
      acc[category].items.push({
        title: doc.title,
        slug: doc.slug,
        order: doc.order ?? 999,
      })
    }

    return acc
  }, {} as Record<string, NavigationSection>)

  return Object.values(grouped)
    .map(section => ({
      ...section,
      items: section.items.sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => {
      return getCategoryOrder(a.category) - getCategoryOrder(b.category)
    })
}

export function getNavigationLinks(currentSlug: string): {
  previous: NavigationLink | null
  next: NavigationLink | null
} {
  const allDocs = getAllDocs()

  const grouped = allDocs.reduce((acc, doc) => {
    const category = doc.category || 'Geral'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(doc)
    return acc
  }, {} as Record<string, typeof allDocs>)

  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    return getCategoryOrder(a) - getCategoryOrder(b)
  })

  const orderedDocs: typeof allDocs = []

  for (const category of sortedCategories) {
    const categoryDocs = grouped[category].sort((a, b) => {
      if (a.isMainCategory && !b.isMainCategory) return -1
      if (!a.isMainCategory && b.isMainCategory) return 1

      return (a.order ?? 999) - (b.order ?? 999)
    })

    orderedDocs.push(...categoryDocs)
  }

  const currentIndex = orderedDocs.findIndex(doc => doc.slug === currentSlug)

  if (currentIndex === -1) {
    return { previous: null, next: null }
  }

  const previous = currentIndex > 0 ? {
    title: orderedDocs[currentIndex - 1].title,
    slug: orderedDocs[currentIndex - 1].slug,
    description: orderedDocs[currentIndex - 1].description
  } : null

  const next = currentIndex < orderedDocs.length - 1 ? {
    title: orderedDocs[currentIndex + 1].title,
    slug: orderedDocs[currentIndex + 1].slug,
    description: orderedDocs[currentIndex + 1].description
  } : null

  return { previous, next }
}

export function getCategoryPages(category: string, excludeMainCategory = true): NavigationLink[] {
  const allDocs = getAllDocs()

  return allDocs
    .filter(doc => {
      if (doc.category !== category) return false
      if (excludeMainCategory && doc.isMainCategory) return false
      return true
    })
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .map(doc => ({
      title: doc.title,
      slug: doc.slug,
      description: doc.description
    }))
}

export function getDocumentOrder(): DocumentOrderItem[] {
  const allDocs = getAllDocs()

  const grouped = allDocs.reduce((acc, doc) => {
    const category = doc.category || 'Geral'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(doc)
    return acc
  }, {} as Record<string, typeof allDocs>)

  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    return getCategoryOrder(a) - getCategoryOrder(b)
  })

  const orderedDocs: typeof allDocs = []

  for (const category of sortedCategories) {
    const categoryDocs = grouped[category].sort((a, b) => {
      if (a.isMainCategory && !b.isMainCategory) return -1
      if (!a.isMainCategory && b.isMainCategory) return 1

      return (a.order ?? 999) - (b.order ?? 999)
    })

    orderedDocs.push(...categoryDocs)
  }

  return orderedDocs.map((doc, index) => ({
    title: doc.title,
    slug: doc.slug,
    originalSlug: doc.originalSlug,
    category: doc.category || 'Geral',
    isMain: doc.isMainCategory || false,
    order: doc.order ?? 999,
    index
  }))
}