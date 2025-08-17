'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
}

function useTableOfContents(items: TOCItem[]) {
  const [activeId, setActiveId] = useState<string>('')
  const activeIdRef = useRef<string>('')

  const normalizedItems = useMemo(
    () => items.map(item => ({ ...item, id: item.id })),
    [items]
  )

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const triggerOffset = 150
    let activeSection = ''

    const sectionsWithPositions = normalizedItems
      .map(item => {
        const element = document.getElementById(item.id)
        if (!element) return null
        return {
          id: item.id,
          offsetTop: element.offsetTop,
          offsetBottom: element.offsetTop + element.offsetHeight
        }
      })
      .filter(Boolean)
      .sort((a, b) => a!.offsetTop - b!.offsetTop)

    for (let i = 0; i < sectionsWithPositions.length; i++) {
      const section = sectionsWithPositions[i]!
      const nextSection = sectionsWithPositions[i + 1]

      if (scrollY + triggerOffset >= section.offsetTop) {
        if (nextSection) {
          if (scrollY + triggerOffset < nextSection.offsetTop) {
            activeSection = section.id
          }
        } else {
          activeSection = section.id
        }
      }
    }

    if (!activeSection && scrollY < triggerOffset && sectionsWithPositions.length > 0) {
      activeSection = sectionsWithPositions[0]!.id
    }

    if (activeSection && activeSection !== activeIdRef.current) {
      activeIdRef.current = activeSection
      setActiveId(activeSection)
    }
  }, [normalizedItems])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return {
    activeId,
    items: normalizedItems
  }
}

export default function ImprovedTableOfContents({ items }: TableOfContentsProps) {
  const { activeId, items: normalizedItems } = useTableOfContents(items)

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - 100

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    } else {
      console.error(`Element with ID ${id} not found`)
    }
  }

  if (normalizedItems.length === 0) return null

  return (
    <div className="py-6">
      <div className="sticky top-6">
        <div className="flex items-center space-x-2 mb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Nesta página
          </h3>
        </div>

        <nav>
          <ul className="space-y-2 text-sm">
            {normalizedItems.map((item, index) => (
              <li key={`${item.id}-${index}`}>
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className={`cursor-pointer block w-full text-left transition-colors ${activeId === item.id
                    ? 'text-blue-700'
                    : 'text-gray-500 hover:opacity-80 hover:text-blue-600'
                    }`}
                  style={{
                    paddingLeft: `${(item.level - 1) * 12}px`,
                  }}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-3 bg-gray-100 rounded text-xs">
            <div className="font-medium mb-2">Debug Info:</div>
            <div>Active ID: <span className="font-mono">{activeId || 'none'}</span></div>
            <div>Total items: {normalizedItems.length}</div>
            <div className="mt-2">
              <div className="font-medium">Generated IDs:</div>
              {normalizedItems.map((item, index) => (
                <div key={item.id + index} className="font-mono text-xs">
                  {item.id} (Level {item.level}): {item.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}