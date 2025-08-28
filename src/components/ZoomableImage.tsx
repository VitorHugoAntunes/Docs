'use client'

import { X, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ZoomableImageProps {
  src: string
  alt?: string
  width?: number
  height?: number
  className?: string
}

function ImageZoomModal({
  src,
  alt,
  isOpen,
  onClose
}: {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ampliada: ${alt}`}
    >
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[10000] p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 group"
        aria-label="Fechar imagem ampliada"
        autoFocus
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative max-w-[95vw] max-h-[95vh] sm:max-w-[90vw] sm:max-h-[90vh]">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            quality={100}
            onClick={(e) => e.stopPropagation()}
            priority
          />
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm backdrop-blur-sm border border-white/20">
        <span className="hidden sm:inline">Pressione ESC ou clique fora para fechar</span>
        <span className="sm:hidden">Toque para fechar</span>
      </div>
    </div>,
    document.body
  )
}

export default function ZoomableImage({
  src,
  alt = 'Imagem',
  width = 800,
  height = 600,
  className = ''
}: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  const handleImageClick = () => {
    setIsZoomed(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsZoomed(true)
    }
  }

  return (
    <>
      <span
        className={`relative group mb-4 sm:mb-6 cursor-zoom-in inline-block w-full ${className}`}
        onClick={handleImageClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Ampliar imagem: ${alt}`}
      >
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          className="max-w-full h-auto rounded-lg shadow-sm object-contain transition-all duration-300 group-hover:shadow-lg group-focus:shadow-lg group-focus:ring-2 group-focus:ring-blue-500 group-focus:ring-offset-2"
          loading="lazy"
          onLoad={handleImageLoad}
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        <span className={`absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center ${isLoaded ? 'block' : 'hidden'}`}>
          <span className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 transform scale-90 group-hover:scale-100 group-focus:scale-100 transition-transform duration-300 inline-flex shadow-lg">
            <ZoomIn className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
          </span>
        </span>

        <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 border border-white/20">
          <span className="hidden sm:inline">Clique para ampliar</span>
          <span className="sm:hidden">Ampliar</span>
        </span>
      </span>

      <ImageZoomModal
        src={src}
        alt={alt}
        isOpen={isZoomed}
        onClose={() => setIsZoomed(false)}
      />
    </>
  )
}