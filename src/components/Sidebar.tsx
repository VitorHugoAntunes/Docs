'use client'

import { NavigationSection } from '@/utils/docs'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface SidebarProps {
  navigation: NavigationSection[]
  currentSlug?: string
}

export default function Sidebar({ navigation, currentSlug }: SidebarProps) {
  const isSectionActive = (section: NavigationSection) => {
    return section.mainSlug === currentSlug ||
      section.items.some(item => item.slug === currentSlug)
  }

  return (
    <div className="px-0 md:px-6 2xl:px-0 2xl:pr-6">
      <nav className="space-y-4">
        {navigation.map((section) => {
          const isActive = isSectionActive(section)
          const hasItems = section.items.length > 0

          return (
            <div key={section.category}>
              {section.mainSlug ? (
                <Link
                  href={`/docs/${section.mainSlug}`}
                  className={`flex items-center space-x-2 text font-semibold tracking-wide transition-colors ${currentSlug === section.mainSlug
                    ? 'text-blue-600 hover:opacity-80'
                    : 'text-gray-500 hover:text-blue-600'
                    }`}
                >
                  <span>{section.category}</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              ) : (
                <h3 className={`text-sm font-semibold uppercase tracking-wide py-2 ${isActive ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                  {section.category}
                </h3>
              )}

              {hasItems && isActive && (
                <ul className="space-y-1 ml-4 border-l border-gray-200 pl-4 mt-1">
                  {section.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/docs/${item.slug}`}
                        className={`block text-sm py-1.5 px-2 rounded-md transition-all duration-150 ${currentSlug === item.slug
                          ? 'text-blue-700 bg-blue-50 font-medium'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}