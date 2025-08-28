import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbItem {
  title: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-gray-500 mx-2" />
              )}

              {item.href && !isLast ? (
                <Link
                  href={item.href === '/' ? item.href : `/docs${item.href}`}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-150"
                >
                  {item.title}
                </Link>
              ) : (
                <span className={`text-sm font-medium ${isLast
                  ? 'text-blue-600'
                  : 'text-gray-600'
                  }`}>
                  {item.title}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}