'use client'
import { Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'

interface CustomCodeBlockProps {
  children: React.ReactNode
  className?: string
}

export default function CustomCodeBlock({ children, className }: CustomCodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

  const handleCopy = async () => {
    try {
      const text = codeRef.current?.textContent || ''
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const getLanguageFromClassName = (className?: string) => {
    if (!className) return null
    const match = className.match(/language-(\w+)/)
    return match ? match[1] : null
  }

  const formatLanguageName = (lang: string) => {
    const languageNames: { [key: string]: string } = {
      'js': 'JavaScript',
      'javascript': 'JavaScript',
      'ts': 'TypeScript',
      'typescript': 'TypeScript',
      'py': 'Python',
      'python': 'Python',
      'java': 'Java',
      'cpp': 'C++',
      'c': 'C',
      'cs': 'C#',
      'csharp': 'C#',
      'php': 'PHP',
      'rb': 'Ruby',
      'ruby': 'Ruby',
      'go': 'Go',
      'rust': 'Rust',
      'sh': 'Shell',
      'bash': 'Bash',
      'sql': 'SQL',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'json': 'JSON',
      'xml': 'XML',
      'yaml': 'YAML',
      'yml': 'YAML',
      'jsx': 'React JSX',
      'tsx': 'React TSX'
    }
    return languageNames[lang.toLowerCase()] || lang.charAt(0).toUpperCase() + lang.slice(1)
  }

  const language = getLanguageFromClassName(className)

  return (
    <div className="relative bg-white rounded-xl overflow-hidden mb-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>

          {language && (
            <span className="text-sm font-medium text-gray-700">
              {formatLanguageName(language)}
            </span>
          )}
          {!language && (
            <span className="text-sm font-medium text-gray-600">
              Code
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className={`group flex items-center justify-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 min-w-[80px] cursor-pointer ${copied
            ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-100'
            : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border border-gray-300 hover:border-gray-400'
            }`}
          title="Copiar código"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-600" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={14} className="group-hover:scale-105 transition-transform" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto text-sm leading-relaxed p-4 bg-gray-50">
        <code ref={codeRef} className={`${className} text-gray-800`} style={{ fontFamily: 'JetBrains Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}>
          {children}
        </code>
      </pre>
    </div>
  )
}