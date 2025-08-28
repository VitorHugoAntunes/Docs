import { NavigationLink } from '@/lib/docs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface NavigationLinksProps {
  previous: NavigationLink | null
  next: NavigationLink | null
}

export default function NavigationLinks({ previous, next }: NavigationLinksProps) {
  if (!previous && !next) {
    return null
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="flex-1">
          {previous ? (
            <Link
              href={`/docs/${previous.slug}`}
              className="group flex h-full space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 w-full"
            >
              <div className="flex-shrink-0 flex items-center">
                <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-start">
                <p className="text-sm font-medium text-gray-500 group-hover:text-blue-600 mb-1">
                  Anterior
                </p>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 line-clamp-2 sm:truncate">
                  {previous.title}
                </p>
                {previous.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 hidden sm:block">
                    {previous.description}
                  </p>
                )}
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block"></div>
          )}
        </div>
        <div className="flex-1">
          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="group flex h-full items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 w-full sm:flex-row-reverse sm:space-x-reverse"
            >
              <div className="flex-shrink-0 flex items-center">
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-start">
                <p className="text-sm font-medium text-gray-500 group-hover:text-blue-600 mb-1">
                  Próximo
                </p>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 line-clamp-2 sm:truncate">
                  {next.title}
                </p>
                {next.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 hidden sm:block">
                    {next.description}
                  </p>
                )}
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block"></div>
          )}
        </div>
      </div>
    </div>
  )
}