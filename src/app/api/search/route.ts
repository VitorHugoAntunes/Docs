import { getAllDocs } from '@/lib/docs'
import fs from 'fs'
import matter from 'gray-matter'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

interface SearchResult {
  id: string
  title: string
  content: string
  category: string
  href: string
  type: 'page' | 'heading'
  excerpt?: string
}

interface ExtractedHeading {
  id: string
  title: string
  level: number
  content: string
}

function cleanMarkdownContent(content: string): string {
  return content
    // Remove frontmatter
    .replace(/^---[\s\S]*?---/, '')
    // Remove código
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    // Remove links markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Remove imagens
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Remove headers markdown
    .replace(/^#{1,6}\s+/gm, '')
    // Remove emphasis
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    .replace(/__([^_]*)__/g, '$1')
    .replace(/_([^_]*)_/g, '$1')
    // Remove quebras de linha extras
    .replace(/\n\s*\n/g, '\n')
    .trim()
}

function extractHeadings(content: string): ExtractedHeading[] {
  const headings: ExtractedHeading[] = []
  const lines = content.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/)

    if (headerMatch) {
      const level = headerMatch[1].length
      const title = headerMatch[2].trim()

      const id = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')

      let content = ''
      let j = i + 1
      while (j < lines.length && !lines[j].match(/^#{1,6}\s+/)) {
        content += lines[j] + '\n'
        j++
      }

      headings.push({
        id,
        title,
        level,
        content: cleanMarkdownContent(content.trim())
      })
    }
  }

  return headings
}

function createExcerpt(content: string, query: string, maxLength = 150): string {
  const queryLower = query.toLowerCase()
  const contentLower = content.toLowerCase()
  const queryIndex = contentLower.indexOf(queryLower)

  if (queryIndex === -1) {
    return content.slice(0, maxLength) + (content.length > maxLength ? '...' : '')
  }

  const start = Math.max(0, queryIndex - 50)
  const end = Math.min(content.length, queryIndex + query.length + 50)

  let excerpt = content.slice(start, end)
  if (start > 0) excerpt = '...' + excerpt
  if (end < content.length) excerpt = excerpt + '...'

  return excerpt
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query?.trim()) {
    return NextResponse.json([])
  }

  try {
    const allResults: SearchResult[] = []
    const docs = getAllDocs()

    for (const doc of docs) {
      try {
        const relativePath = `${doc.originalSlug}.mdx`
        const filePath = path.join(process.cwd(), 'src/docs', relativePath)
        const normalizedPath = path.normalize(filePath)

        if (!fs.existsSync(normalizedPath)) {
          console.warn(`File not found during search: ${normalizedPath}`)
          continue
        }

        const fileContent = fs.readFileSync(normalizedPath, 'utf8')
        const { content: rawContent } = matter(fileContent)

        const baseHref = `/docs/${doc.originalSlug}`
        const cleanContent = cleanMarkdownContent(rawContent)

        allResults.push({
          id: doc.originalSlug,
          title: doc.title,
          content: cleanContent,
          category: doc.category || 'Geral',
          href: baseHref,
          type: 'page',
          excerpt: createExcerpt(cleanContent, query)
        })

        const headings = extractHeadings(rawContent)

        for (const heading of headings) {

          if (heading.content.length > 20) {
            allResults.push({
              id: `${doc.originalSlug}#${heading.id}`,
              title: heading.title,
              content: heading.content,
              category: doc.category || 'Geral',
              href: `${baseHref}#${heading.id}`,
              type: 'heading',
              excerpt: createExcerpt(heading.content, query)
            })
          }
        }

      } catch (error) {
        console.error(`Error processing doc ${doc.originalSlug}:`, error)
        continue
      }
    }

    const queryLower = query.toLowerCase()
    const filtered = allResults.filter(item => {
      return (
        item.title.toLowerCase().includes(queryLower) ||
        item.content.toLowerCase().includes(queryLower) ||
        item.category.toLowerCase().includes(queryLower)
      )
    })

    const sorted = filtered.sort((a, b) => {
      const aTitle = a.title.toLowerCase()
      const bTitle = b.title.toLowerCase()
      const aContent = a.content.toLowerCase()
      const bContent = b.content.toLowerCase()

      if (a.type !== b.type) {
        return a.type === 'page' ? -1 : 1
      }

      const aExactTitle = aTitle === queryLower
      const bExactTitle = bTitle === queryLower
      if (aExactTitle && !bExactTitle) return -1
      if (!aExactTitle && bExactTitle) return 1

      const aStartsWithQuery = aTitle.startsWith(queryLower)
      const bStartsWithQuery = bTitle.startsWith(queryLower)
      if (aStartsWithQuery && !bStartsWithQuery) return -1
      if (!aStartsWithQuery && bStartsWithQuery) return 1

      const aTitleIncludes = aTitle.includes(queryLower)
      const bTitleIncludes = bTitle.includes(queryLower)
      if (aTitleIncludes && !bTitleIncludes) return -1
      if (!aTitleIncludes && bTitleIncludes) return 1

      const aMatches = (aContent.match(new RegExp(queryLower, 'g')) || []).length
      const bMatches = (bContent.match(new RegExp(queryLower, 'g')) || []).length
      if (aMatches !== bMatches) return bMatches - aMatches

      return aTitle.localeCompare(bTitle)
    })

    const limitedResults = sorted.slice(0, 50)

    return NextResponse.json(limitedResults)

  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}