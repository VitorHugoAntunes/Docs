import { NavigationLink } from '@/lib/docs'
import { ArrowRight, FileText } from 'lucide-react'
import Link from 'next/link'

interface CategoryPagesProps {
  pages: NavigationLink[]
  categoryName: string
}

export default function CategoryPages({ pages, categoryName }: CategoryPagesProps) {
  if (pages.length === 0) {
    return null
  }

  return (
    <div className="mt-6 sm:mt-8 mb-8 sm:mb-12">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 sm:p-6 border border-blue-100">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 flex items-center space-x-2">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          <span>Páginas deste capítulo</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Explore todos os tópicos da seção <strong>{categoryName}</strong>
        </p>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/docs/${page.slug}`}
              className="group block h-full"
            >
              <div className="h-full p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-blue-700 flex-1 leading-tight">
                    {page.title}
                  </h3>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 mt-0.5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {page.description && (
                  <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 line-clamp-3 mb-2 sm:mb-3 leading-relaxed">
                    {page.description}
                  </p>
                )}
                <div className="mt-auto flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-200 group-hover:bg-blue-400 rounded-full transition-colors"></div>
                  <span className="text-xs text-gray-500 group-hover:text-blue-600 font-medium transition-colors">
                    Ler mais
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}