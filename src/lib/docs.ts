import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export interface DocFrontmatter {
  title: string
  description?: string
  order?: number
  category?: string
  isMainCategory?: boolean
}

export interface DocMeta extends DocFrontmatter {
  slug: string
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

const docsDirectory = path.join(process.cwd(), 'src/docs')

function getAllMdxFiles(dir: string, baseDir: string, slugs: string[] = []): string[] {
  try {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        getAllMdxFiles(filePath, baseDir, slugs)
      } else if (file.endsWith('.mdx')) {
        const relativePath = path.relative(baseDir, filePath)
        const slug = relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/')
        slugs.push(slug)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }

  return slugs
}

export function getDocSlugs(): string[] {
  if (!fs.existsSync(docsDirectory)) {
    console.warn('Docs directory not found:', docsDirectory)
    return []
  }

  return getAllMdxFiles(docsDirectory, docsDirectory)
}

export function getDocBySlug(slug: string): DocMeta | null {
  try {
    const relativePath = `${slug}.mdx`
    const fullPath = path.join(docsDirectory, relativePath)
    const normalizedPath = path.normalize(fullPath)

    if (!fs.existsSync(normalizedPath)) {
      return null
    }

    const fileContents = fs.readFileSync(normalizedPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      path: normalizedPath,
      title: data.title || path.basename(slug),
      description: data.description || '',
      order: data.order || 999,
      category: data.category || 'Geral',
      isMainCategory: data.isMainCategory || false,
    }
  } catch (error) {
    console.error(`Error reading doc ${slug}:`, error)
    return null
  }
}

export function getAllDocs(): DocMeta[] {
  const slugs = getDocSlugs()
  return slugs
    .map(slug => getDocBySlug(slug))
    .filter((doc): doc is DocMeta => doc !== null)
    .sort((a, b) => {
      if (a.category !== b.category) {
        if (a.category === 'Introdução') return -1
        if (b.category === 'Introdução') return 1
        return (a.category || '').localeCompare(b.category || '')
      }

      if (a.isMainCategory && !b.isMainCategory) return -1
      if (!a.isMainCategory && b.isMainCategory) return 1

      return (a.order ?? 999) - (b.order ?? 999)
    })
}

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
      // Coloca "Introdução" primeiro
      if (a.category === 'Introdução') return -1
      if (b.category === 'Introdução') return 1
      return a.category.localeCompare(b.category)
    })
}

export function getTableOfContents(content: string): Array<{
  id: string
  title: string
  level: number
}> {
  const headings = content.match(/^#{1,6}\s+.+$/gm) || []
  return headings.map(heading => {
    const level = heading.match(/^#+/)?.[0].length || 1
    const title = heading.replace(/^#+\s+/, '').replace(/\{#[\w-]+\}$/, '')
    const id = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    return { id, title, level }
  })
}

export interface NavigationLink {
  title: string
  slug: string
  description?: string
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
    if (a === 'Introdução') return -1
    if (b === 'Introdução') return 1
    return a.localeCompare(b)
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

export function getDocumentOrder(): Array<{ title: string, slug: string, category: string, isMain: boolean, order: number, index: number }> {
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
    if (a === 'Introdução') return -1
    if (b === 'Introdução') return 1
    return a.localeCompare(b)
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
    category: doc.category || 'Geral',
    isMain: doc.isMainCategory || false,
    order: doc.order ?? 999,
    index
  }))
}