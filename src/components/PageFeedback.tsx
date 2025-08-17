'use client'

import { Check, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useState } from 'react'

interface PageFeedbackProps {
  slug: string
  className?: string
}

export default function PageFeedback({ slug, className = '' }: PageFeedbackProps) {
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFeedback = async (type: 'like' | 'dislike') => {
    if (isSubmitting || feedback) return

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      setFeedback(type)

    } catch (error) {
      console.error('Erro ao enviar feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (feedback) {
    return (
      <div className={`bg-green-50 text-center border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-2 text-green-700 justify-center">
          <Check className="w-5 h-5" />
          <span className="text-sm font-medium">
            Obrigado pelo seu feedback!
          </span>
        </div>
        <p className="text-xs text-green-600 mt-1">
          Seu feedback ajuda a melhorar a documentação.
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Esta página foi útil?
        </h3>
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => handleFeedback('like')}
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Sim</span>
          </button>
          <div className="w-px h-6 bg-gray-300"></div>
          <button
            onClick={() => handleFeedback('dislike')}
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ThumbsDown className="w-4 h-4" />
            <span>Não</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Seu feedback nos ajuda a melhorar a documentação
        </p>
      </div>
    </div>
  )
}