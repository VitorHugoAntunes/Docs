import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AnchorHTMLAttributes, HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import CustomCodeBlock from './Codeblock'
import { HeadingWithAnchor } from './HeadingWithAnchor'

type HeadingProps = HTMLAttributes<HTMLHeadingElement>
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>
type ListProps = HTMLAttributes<HTMLUListElement | HTMLOListElement>
type ListItemProps = HTMLAttributes<HTMLLIElement>
type BlockquoteProps = HTMLAttributes<HTMLQuoteElement>
type CodeProps = HTMLAttributes<HTMLElement>
type PreProps = HTMLAttributes<HTMLPreElement>
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>
type TableProps = TableHTMLAttributes<HTMLTableElement>
type ThProps = ThHTMLAttributes<HTMLTableHeaderCellElement>
type TdProps = TdHTMLAttributes<HTMLTableDataCellElement>

const isExternalLink = (href: string): boolean => {
  if (!href) return false

  if (href.startsWith('http://') || href.startsWith('https://')) {
    return true
  }

  if (href.startsWith('//')) {
    return true
  }

  if (href.includes('.') && !href.startsWith('/') && !href.startsWith('#')) {
    return true
  }

  return false
}

export const mdxComponents = {
  h1: (props: HeadingProps) => (
    <HeadingWithAnchor
      {...props}
      as="h1"
      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200"
    />
  ),
  h2: (props: HeadingProps) => (
    <HeadingWithAnchor
      {...props}
      as="h2"
      className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 sm:mt-10 lg:mt-12 mb-4 sm:mb-6 pb-2 border-b border-gray-100"
    />
  ),
  h3: (props: HeadingProps) => (
    <HeadingWithAnchor
      {...props}
      as="h3"
      className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mt-6 sm:mt-8 lg:mt-10 mb-3 sm:mb-4"
    />
  ),
  h4: (props: HeadingProps) => (
    <HeadingWithAnchor
      {...props}
      as="h4"
      className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mt-5 sm:mt-6 lg:mt-8 mb-2 sm:mb-3"
    />
  ),
  h5: (props: HeadingProps) => (
    <HeadingWithAnchor
      {...props}
      as="h5"
      className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mt-4 sm:mt-5 lg:mt-6 mb-2 sm:mb-3"
    />
  ),
  h6: (props: HeadingProps) => (
    <HeadingWithAnchor
      {...props}
      as="h6"
      className="text-sm sm:text-sm lg:text-base font-semibold text-gray-900 mt-4 sm:mt-5 lg:mt-6 mb-2 sm:mb-3"
    />
  ),
  p: (props: ParagraphProps) => (
    <p {...props} className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed" />
  ),
  ul: (props: ListProps) => (
    <ul {...props} className="text-sm sm:text-base list-disc list-inside mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-gray-700" />
  ),
  ol: (props: ListProps) => (
    <ol {...props} className="text-sm sm:text-base list-decimal list-inside mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-gray-700" />
  ),
  li: (props: ListItemProps) => <li {...props} className="ml-2 sm:ml-4" />,
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      {...props}
      className="border-l-4 border-blue-500 pl-4 sm:pl-6 py-2 mb-4 sm:mb-6 bg-blue-50 italic text-sm sm:text-base text-gray-700"
    />
  ),
  code: (props: CodeProps) => {
    const className = props.className || ''
    const languageMatch = className.match(/language-(\w+)/)

    if (languageMatch) {
      const language = languageMatch[1]
      const code = props.children || ''

      return (
        <CustomCodeBlock
          code={typeof code === 'string' ? code.trim() : String(code).trim()}
          language={language}
        />
      )
    }

    return (
      <code
        {...props}
        className="bg-gray-100 text-red-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono"
      />
    )
  },
  pre: (props: PreProps) => (
    <div className="max-w-full overflow-x-auto mb-4 sm:mb-6">
      <pre
        {...props}
        className="bg-gray-100 text-gray-800 rounded-lg text-xs sm:text-sm overflow-x-auto whitespace-pre"
      />
    </div>
  ),
  a: (props: AnchorProps) => {
    const href = props.href || ''

    if (isExternalLink(href)) {
      return (
        <a
          {...props}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline text-sm sm:text-base"
        >
          {props.children}
          <ExternalLink className="flex-shrink-0" size={16} />
        </a>
      )
    }

    return (
      <Link
        href={href}
        className="text-blue-600 hover:text-blue-800 underline text-sm sm:text-base"
      >
        {props.children}
      </Link>
    )
  },
  table: (props: TableProps) => (
    <div className="overflow-x-auto mb-4 sm:mb-6 max-w-full">
      <table {...props} className="min-w-full border border-gray-300 text-xs sm:text-sm" />
    </div>
  ),
  th: (props: ThProps) => (
    <th
      {...props}
      className="border border-gray-300 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-50 font-semibold text-left text-xs sm:text-sm"
    />
  ),
  td: (props: TdProps) => (
    <td {...props} className="border border-gray-300 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm" />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!props.src) return null;

    const width = props.width ?
      (typeof props.width === 'string' ? parseInt(props.width, 10) : props.width) :
      800;

    const height = props.height ?
      (typeof props.height === 'string' ? parseInt(props.height, 10) : props.height) :
      600;

    return (
      <Image
        src={typeof props.src === 'string' ? props.src : ''}
        width={width}
        height={height}
        alt={props.alt || 'Imagem'}
        className="max-w-full overflow-hidden mb-4 sm:mb-6 h-auto rounded-lg shadow-sm object-contain"
        loading="lazy"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    );
  },
}