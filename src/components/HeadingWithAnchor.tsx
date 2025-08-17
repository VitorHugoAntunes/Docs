"use client"

import { normalizeText } from "@/utils/slugify"
import { LinkIcon } from "lucide-react"
import { HTMLAttributes } from "react"

type HeadingProps = HTMLAttributes<HTMLHeadingElement>

export const HeadingWithAnchor = ({
  as: Component,
  className,
  children,
  ...props
}: HeadingProps & { as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }) => {
  const id = normalizeText(String(children))

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - 100

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <Component
      {...props}
      id={id}
      className={`group relative ${className}`}
    >
      <a
        href={`#${id}`}
        onClick={handleAnchorClick}
        className="flex items-center gap-2 hover:text-gray-500 transition-colors duration-200"
        aria-label={`Link para seção: ${children}`}
      >
        {children}
        <LinkIcon className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </a>
    </Component>
  )
}