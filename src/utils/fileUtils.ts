import fs from 'fs'
import path from 'path'
import { docsDirectory } from './constants'

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