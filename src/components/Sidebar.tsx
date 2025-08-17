import { NavigationSection } from '@/lib/docs'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface SidebarProps {
  navigation: NavigationSection[]
  currentSlug?: string
}

export default function Sidebar({ navigation, currentSlug }: SidebarProps) {
  return (
    <div className="py-6 px-0 md:px-6 2xl:px-0 2xl:pr-6">
      {/* Navigation */}
      <nav className="space-y-4">
        {navigation.map((section) => (
          <div key={section.category}>
            {/* Título da categoria - agora pode ser um link */}
            {section.mainSlug ? (
              <Link
                href={`/docs/${section.mainSlug}`}
                className={`flex items-center space-x-2 text-sm font-semibold uppercase tracking-wide mb-3 transition-colors ${currentSlug === section.mainSlug
                  ? 'text-blue-600 hover:opacity-80'
                  : 'text-gray-500 hover:text-blue-600'
                  }`}
              >
                <span>{section.category}</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            ) : (
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                {section.category}
              </h3>
            )}
            {/* Items da categoria */}
            {section.items.length > 0 && (
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/docs/${item.slug}`}
                      className={`flex items-center space-x-2 text-sm transition-colors ${currentSlug === item.slug
                        ? 'text-blue-700'
                        : 'text-gray-500 hover:opacity-80 hover:text-blue-600'
                        }`}
                    >
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}