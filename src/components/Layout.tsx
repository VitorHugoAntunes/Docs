import Breadcrumb from '@/components/Breadcrumb'
import { getNavigation } from '@/lib/docs'
import { BreadcrumbItem } from '@/utils/breadcrumb'
import { ReactNode } from 'react'
import ConditionalDocsLayout from './ConditionalDocsLayout'
import ImprovedTableOfContents from './TableOfContents'

interface LayoutProps {
  children: ReactNode
  tableOfContents?: Array<{
    id: string
    title: string
    level: number
  }>
  breadcrumbs?: BreadcrumbItem[]
}

export default function Layout({
  children,
  tableOfContents,
  breadcrumbs
}: LayoutProps) {
  const navigation = getNavigation();
  return (
    <ConditionalDocsLayout navigation={navigation}>
      <div className="flex">
        <div className="flex-1 px-4 pt-6 pb-12 md:px-8 lg:px-12 2xl:px-16 min-w-0 overflow-x-hidden">
          {breadcrumbs && (
            <Breadcrumb items={breadcrumbs} className="mb-6" />
          )}
          <div className="min-w-0 overflow-x-hidden">
            <div className="prose prose-lg overflow-x-hidden">
              {children}
            </div>
          </div>
        </div>

        {tableOfContents && tableOfContents.length > 0 && (
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-[65px] overflow-y-auto py-6 max-h-[calc(100vh-65px)]">
              <ImprovedTableOfContents items={tableOfContents} />
            </div>
          </aside>
        )}
      </div>
    </ConditionalDocsLayout>
  )
}