'use client'

import { NavigationSection } from '@/utils/docs'
import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import MobileSidebar from './SidebarMobile'

interface DocsLayoutProps {
  children: ReactNode
  navigation: NavigationSection[]
  currentSlug?: string
}

export default function DocsLayout({ children, navigation, currentSlug }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white mx-auto max-w-[1440px] sm:px-6 lg:px-8">
      <MobileSidebar navigation={navigation} currentSlug={currentSlug} />

      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-gray-200 bg-white">
        <div className="sticky top-[65px] overflow-y-auto  py-6 max-h-[calc(100vh-65px)]">
          <Sidebar navigation={navigation} currentSlug={currentSlug} />
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  )
}