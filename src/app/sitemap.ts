import { getAllDocs, getDocBySlug } from '@/utils/docs'
import fs from 'fs'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000'
  const docs = getAllDocs().map(doc => doc.slug)

  const docUrls = docs.map((slug) => {
    const doc = getDocBySlug(slug)
    let lastModified = new Date()

    try {
      if (doc?.path && fs.existsSync(doc.path)) {
        const stats = fs.statSync(doc.path)
        lastModified = stats.mtime
      }
    } catch (error) {
      console.error('Erro ao obter data de modificação:', error)
    }

    return {
      url: `${baseUrl}/docs/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: doc?.isMainCategory ? 0.9 : 0.7,
    }
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...docUrls
  ]
}