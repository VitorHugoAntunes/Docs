import CategoryPages from '@/components/CategoryPages'
import EditOnGitHub from '@/components/EditPage'
import Layout from '@/components/Layout'
import { mdxComponents } from '@/components/MDX'
import NavigationLinks from '@/components/NavigationLinks'
import PageFeedback from '@/components/PageFeedback'
import { generateBreadcrumbs } from '@/utils/breadcrumb'
import {
  getCategoryPages,
  getDocBySlug,
  getDocSlugs,
  getNavigation,
  getNavigationLinks,
  getTableOfContents,
} from '@/utils/docs'
import { extractSEOFromMarkdown } from '@/utils/seoExtractor'
import fs from 'fs'
import matter from 'gray-matter'
import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

type DocPageProps = {
  params: Promise<{ slug: string[] }>
}

export function generateStaticParams(): Array<{ slug: string[] }> {
  const slugs = getDocSlugs()
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }))
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const doc = getDocBySlug(slug)

  if (!doc) {
    return { title: 'Página não encontrada' }
  }

  let fileContent = ''
  try {
    if (fs.existsSync(doc.path)) {
      fileContent = fs.readFileSync(doc.path, 'utf8')
    }
  } catch (error) {
    console.error('Erro ao ler arquivo:', error)
  }

  const seoData = extractSEOFromMarkdown(fileContent)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000'
  const pageUrl = `${baseUrl}/docs/${slug}`
  const description = doc.description

  const keywords = [
    ...seoData.keywords,
    doc.category,
    'estruturas de dados',
    'algoritmos',
    'tutorial'
  ].filter(Boolean).join(', ')

  const ogImage = seoData.images.length > 0
    ? (seoData.images[0].startsWith('http') ? seoData.images[0] : `${baseUrl}${seoData.images[0]}`)
    : `${baseUrl}/og-default.png`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: doc.title,
    description,
    url: pageUrl,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Seu Nome'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Meu Site de Tutoriais',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl
    },
    ...(doc.category && { articleSection: doc.category }),
    ...(seoData.keywords.length && { keywords: seoData.keywords }),
    ...(seoData.images.length && {
      image: seoData.images.map(img => ({
        '@type': 'ImageObject',
        url: img.startsWith('http') ? img : `${baseUrl}${img}`
      }))
    })
  }

  return {
    title: doc.title,
    description,
    keywords,

    openGraph: {
      title: doc.title,
      description,
      url: pageUrl,
      siteName: 'DocSite - Documentação de Estruturas de Dados',
      type: 'article',
      locale: 'pt_BR',
      images: seoData.images.length > 0
        ? seoData.images.map(img => ({
          url: img.startsWith('http') ? img : `${baseUrl}${img}`,
          width: 1200,
          height: 630,
          alt: doc.title,
        }))
        : [{
          url: `${baseUrl}/og-default.png`,
          width: 1200,
          height: 630,
          alt: doc.title,
        }],
    },

    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description,
      images: [ogImage],
    },

    authors: [{ name: 'Vitor Hugo Antunes' }],
    category: doc.category,

    other: {
      'script:ld+json': JSON.stringify(structuredData)
    },

    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const doc = getDocBySlug(slug)

  if (!doc) return notFound()

  const filePath = doc.path
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    return notFound()
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { content: rawContent } = matter(fileContent)

  const seoData = extractSEOFromMarkdown(fileContent)

  const navigation = getNavigation()
  const tableOfContents = getTableOfContents(rawContent)
  const navigationLinks = getNavigationLinks(doc.slug)
  const categoryPages = doc.isMainCategory
    ? getCategoryPages(doc.category || 'Geral', true)
    : []
  const breadcrumbs = generateBreadcrumbs(navigation, doc.slug)

  return (
    <Layout
      tableOfContents={tableOfContents}
      breadcrumbs={breadcrumbs}
    >
      <article className="prose prose-lg max-w-none">
        <MDXRemote
          source={rawContent}
          components={mdxComponents}
          options={{
            parseFrontmatter: false,
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [rehypePrettyCode, { theme: 'one-light' }],
              ],
            },
          }}
        />
      </article>

      {doc.isMainCategory && categoryPages.length > 0 && (
        <CategoryPages
          pages={categoryPages}
          categoryName={doc.category || 'Capítulo'}
        />
      )}

      <NavigationLinks
        previous={navigationLinks.previous}
        next={navigationLinks.next}
      />

      <PageFeedback slug={doc.originalSlug} className="mt-12" />
      <EditOnGitHub slug={doc.originalSlug} className="mt-12" />
    </Layout>
  )
}