'use client'

import { useSidebar } from '@/contexts/SidebarContext'
import { NavigationSection } from '@/lib/docs'
import { ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface MobileSidebarProps {
  navigation: NavigationSection[]
  currentSlug?: string
}

export default function MobileSidebar({ navigation, currentSlug }: MobileSidebarProps) {
  const { isOpen, close } = useSidebar()
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const isSectionActive = (section: NavigationSection) => {
    return section.mainSlug === currentSlug ||
      section.items.some(item => item.slug === currentSlug)
  }

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 50)
    } else {
      setIsAnimating(true)
      setTimeout(() => {
        setIsVisible(false)
        setIsAnimating(false)
      }, 350)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, close])

  if (!isVisible) return null

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/50 z-40 md:hidden
          transition-all duration-300 ease-in-out
          ${isOpen
            ? 'bg-opacity-50 backdrop-blur-sm'
            : 'bg-opacity-0'
          }
        `}
        onClick={close}
      />

      <aside className={`
        fixed left-0 top-0 h-full w-80 bg-white z-50 md:hidden flex flex-col
        transform transition-all duration-350 ease-out
        ${isOpen && !isAnimating
          ? 'translate-x-0 shadow-2xl'
          : '-translate-x-full shadow-lg'
        }
        border-r border-gray-200
      `}>
        <div className={`
          flex items-center justify-between px-6 h-16 border-b border-gray-200 flex-shrink-0
          transform transition-all duration-400 ease-out delay-100
          ${isOpen && !isAnimating
            ? 'translate-x-0 opacity-100'
            : '-translate-x-4 opacity-0'
          }
        `}>
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={close}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="py-6 px-6 min-h-full">
            <nav className="space-y-4">
              {navigation.map((section) => {
                const isActive = isSectionActive(section)
                const hasItems = section.items.length > 0

                return (
                  <div key={section.category}>
                    {section.mainSlug ? (
                      <Link
                        href={`/docs/${section.mainSlug}`}
                        onClick={close}
                        className={`flex items-center space-x-2 text-sm font-semibold uppercase tracking-wide transition-colors ${currentSlug === section.mainSlug
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
                              onClick={close}
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
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent"></div>
      </aside>
    </>
  )
}