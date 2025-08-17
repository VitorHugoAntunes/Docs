import MobileSidebar from '@/components/SidebarMobile'
import { NavigationSection } from '@/lib/docs'
import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import ImprovedTableOfContents from './TableOfContents'

interface LayoutProps {
  children: ReactNode
  navigation: NavigationSection[]
  tableOfContents?: Array<{
    id: string
    title: string
    level: number
  }>
  currentSlug?: string
}

export default function Layout({
  children,
  navigation,
  tableOfContents,
  currentSlug
}: LayoutProps) {
  return (

    <div className="flex min-h-screen bg-white mx-auto max-w-[1440px] sm:px-6 lg:px-8">
      <MobileSidebar navigation={navigation} currentSlug={currentSlug} />

      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-gray-200 bg-white">
        <div className="sticky top-[65px] h-screen overflow-y-auto">
          <Sidebar navigation={navigation} currentSlug={currentSlug} />
        </div>
      </aside>

      <main className="flex-1 flex min-w-0">
        <div className="px-4 pt-6 pb-12 md:px-8 lg:px-12 2xl:px-16 min-w-0 overflow-x-hidden">
          <div className="min-w-0overflow-x-hidden">
            <div className="prose prose-lg overflow-x-hidden">
              {children}
            </div>
          </div>
        </div>

        {tableOfContents && tableOfContents.length > 0 && (
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-[65px] h-screen overflow-y-auto">
              <ImprovedTableOfContents items={tableOfContents} />
            </div>
          </aside>
        )}
      </main>
    </div>
  )
}