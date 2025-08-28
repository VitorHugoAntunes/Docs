'use client'

import { NavigationSection } from '@/lib/docs'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import DocsLayout from './DocsLayout'

interface ConditionalDocsLayoutProps {
  children: ReactNode
  navigation: NavigationSection[]
}

export default function ConditionalDocsLayout({
  children,
  navigation
}: ConditionalDocsLayoutProps) {
  const pathname = usePathname()

  const isDocsPage = pathname.startsWith('/docs/')

  if (isDocsPage) {
    const currentSlug = pathname.replace('/docs/', '')

    return (
      <DocsLayout navigation={navigation} currentSlug={currentSlug}>
        {children}
      </DocsLayout>
    )
  }

  return <>{children}</>
}