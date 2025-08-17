'use client'

import { useSidebar } from '@/contexts/SidebarContext'
import { NavigationSection } from '@/lib/docs'
import { ChevronRight, FileText, X } from 'lucide-react'
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

  // Controla a visibilidade e animação da sidebar
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setIsAnimating(true)
      // Pequeno delay para garantir que a sidebar apareça antes de animar
      setTimeout(() => setIsAnimating(false), 50)
    } else {
      setIsAnimating(true)
      // Aguarda a animação terminar antes de esconder completamente
      setTimeout(() => {
        setIsVisible(false)
        setIsAnimating(false)
      }, 350)
    }
  }, [isOpen])

  // Fecha a sidebar quando pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Impede scroll do body quando sidebar está aberta
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
      {/* Overlay com animação de fade */}
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

      {/* Sidebar com animação de slide */}
      <aside className={`
        fixed left-0 top-0 h-full w-80 bg-white z-50 md:hidden
        transform transition-all duration-350 ease-out
        ${isOpen && !isAnimating
          ? 'translate-x-0 shadow-2xl'
          : '-translate-x-full shadow-lg'
        }
        border-r border-gray-200
      `}>
        {/* Header da sidebar com animação */}
        <div className={`
          flex items-center justify-between px-4 h-16 border-b border-gray-200
          transform transition-all duration-400 ease-out delay-100
          ${isOpen && !isAnimating
            ? 'translate-x-0 opacity-100'
            : '-translate-x-4 opacity-0'
          }
        `}>
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={close}
            className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Conteúdo da sidebar com animação escalonada */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Navigation */}
            <nav className="space-y-6">
              {navigation.map((section) => (
                <div key={section.category}>
                  {/* Título da categoria - agora pode ser um link */}
                  {section.mainSlug ? (
                    <Link
                      href={`/docs/${section.mainSlug}`}
                      onClick={close}
                      className={`
                        flex items-center space-x-2 text-sm font-semibold uppercase tracking-wide mb-3 
                        transition-all duration-200 hover:scale-105 active:scale-95
                        ${currentSlug === section.mainSlug
                          ? 'text-blue-600 hover:text-blue-700'
                          : 'text-gray-900 hover:text-blue-600'
                        }
                      `}
                    >
                      <span>{section.category}</span>
                      <ChevronRight className="w-3 h-3 transition-transform duration-200 hover:translate-x-1" />
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
                            onClick={close}
                            className={`
                              flex items-center space-x-2 px-3 py-2 rounded-md text-sm 
                              transition-all duration-200 hover:scale-105 active:scale-95
                              hover:shadow-md hover:translate-x-1
                              ${currentSlug === item.slug
                                ? 'bg-blue-50 text-blue-700 shadow-sm'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                              }
                            `}
                          >
                            <FileText className="w-4 h-4 transition-transform duration-200" />
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
        </div>
      </aside>
    </>
  )
}