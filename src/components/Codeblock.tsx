'use client'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CustomCodeBlockProps {
  code: string
  language: string
  filename?: string
}

export default function CustomCodeBlock({ code, language, filename }: CustomCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="w-full max-w-full">
      <div className="rounded-lg border border-gray-200 shadow-sm bg-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="h-4 w-px bg-gray-300 mx-2 flex-shrink-0"></div>
            <span className="text-sm font-medium text-gray-700 flex-shrink-0">
              {language.toUpperCase()}
            </span>
            {filename && (
              <div className="flex items-center space-x-2 min-w-0">
                <span className="text-gray-400 flex-shrink-0">•</span>
                <span className="text-sm text-gray-600 truncate">
                  {filename}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 flex-shrink-0"
            title={copied ? 'Copiado!' : 'Copiar código'}
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-600" />
                <span className="text-green-600">Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Code - Container com scroll interno */}
        <div className="relative bg-white overflow-x-auto max-w-full">
          <SyntaxHighlighter
            language={language === 'text' ? 'plaintext' : language}
            style={oneLight}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              backgroundColor: '#fafafa',
              fontSize: '0.8rem',
              lineHeight: '1.5',
              border: 'none',
              minWidth: 'fit-content',
              width: '100%',
            }}
            showLineNumbers={true}
            lineNumberStyle={{
              color: 'rgb(156, 163, 175)',
              paddingRight: '1rem',
              minWidth: '2.5rem',
              userSelect: 'none',
              fontSize: '0.75rem',
            }}
            wrapLines={false}
            wrapLongLines={false}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}