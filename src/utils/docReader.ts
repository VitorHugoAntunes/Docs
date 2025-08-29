import { DocMeta } from '@/types'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { docsDirectory } from './constants'
import { getDocSlugs } from './fileUtils'
import { findFileByCleanSlug, generateSlugForDoc } from './slugUtils'

export function getDocBySlug(slug: string): DocMeta | null {
  try {
    let originalSlug = slug

    const slugExists = getDocSlugs().includes(slug)

    if (!slugExists) {
      const foundSlug = findFileByCleanSlug(slug)
      if (!foundSlug) {
        const allSlugs = getDocSlugs()
        for (const testSlug of allSlugs) {
          const fullPath = path.join(docsDirectory, `${testSlug}.mdx`)
          if (fs.existsSync(fullPath)) {
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data } = matter(fileContents)

            if (data.isMainCategory) {
              const generatedSlug = generateSlugForDoc(testSlug, true)
              if (generatedSlug === slug) {
                originalSlug = testSlug
                break
              }
            }
          }
        }

        if (originalSlug === slug) {
          return null
        }
      } else {
        originalSlug = foundSlug
      }
    }

    const relativePath = `${originalSlug}.mdx`
    const fullPath = path.join(docsDirectory, relativePath)
    const normalizedPath = path.normalize(fullPath)

    if (!fs.existsSync(normalizedPath)) {
      return null
    }

    const fileContents = fs.readFileSync(normalizedPath, 'utf8')
    const { data } = matter(fileContents)

    const isMainCategory = data.isMainCategory || false
    const finalSlug = generateSlugForDoc(originalSlug, isMainCategory)

    return {
      slug: finalSlug,
      originalSlug,
      path: normalizedPath,
      title: data.title || path.basename(finalSlug),
      description: data.description || '',
      order: data.order || 999,
      category: data.category || 'Geral',
      isMainCategory,
    }
  } catch (error) {
    console.error(`Error reading doc ${slug}:`, error)
    return null
  }
}