import CategoryPages from '@/components/CategoryPages'
import EditOnGitHub from '@/components/EditPage'
import Layout from '@/components/Layout'
import { mdxComponents } from '@/components/MDX'
import NavigationLinks from '@/components/NavigationLinks'
import PageFeedback from '@/components/PageFeedback'
import {
  getCategoryPages,
  getDocBySlug,
  getDocSlugs,
  getNavigation,
  getNavigationLinks,
  getTableOfContents,
} from '@/lib/docs'
import fs from 'fs'
import matter from 'gray-matter'
import { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

type DocPageProps = {
  params: Promise<{ slug: string[] }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export function generateStaticParams(): Array<{ slug: string[] }> {
  const slugs = getDocSlugs()
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }))
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const doc = getDocBySlug(slug)

  if (!doc) {
    return { title: 'Página não encontrada' }
  }

  return {
    title: doc.title,
    description: doc.description,
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const doc = getDocBySlug(slug)

  if (!doc) notFound()

  const filePath = doc.path

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    notFound()
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { content: rawContent } = matter(fileContent)

  const { content } = await compileMDX({
    source: rawContent,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: { remarkPlugins: [], rehypePlugins: [] },
    },
  })

  const navigation = getNavigation()
  const tableOfContents = getTableOfContents(rawContent)
  const navigationLinks = getNavigationLinks(slug)

  const categoryPages = doc.isMainCategory
    ? getCategoryPages(doc.category || 'Geral', true)
    : []

  return (
    <Layout
      navigation={navigation}
      tableOfContents={tableOfContents}
      currentSlug={slug}
    >
      <article className="prose prose-lg max-w-none">{content}</article>

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
      <PageFeedback slug={slug} className="mt-12" />
      <EditOnGitHub slug={slug} className="mt-12" />
    </Layout>
  )
}