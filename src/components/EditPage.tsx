import { Edit, ExternalLink } from 'lucide-react'

interface EditOnGitHubProps {
  slug: string
  repositoryUrl?: string
  branch?: string
  docsPath?: string
  className?: string
}

export default function EditOnGitHub({
  slug,
  repositoryUrl = 'https://github.com/seu-usuario/seu-repositorio',
  branch = 'main',
  docsPath = 'docs',
  className = ''
}: EditOnGitHubProps) {
  const fileUrl = `${repositoryUrl}/edit/${branch}/${docsPath}/${slug}.mdx`

  return (
    <div className={`border-t border-gray-200 pt-6 ${className}`}>
      <div className="flex flex-col md:flex-row  items-center justify-between gap-4">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            Encontrou um erro ou quer contribuir?
          </h3>
          <p className="text-xs text-gray-600">
            Ajude a melhorar esta documentação editando-a no GitHub.
          </p>
        </div>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 group"
        >
          <Edit className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
          <span>Editar no GitHub</span>
          <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
        </a>
      </div>
    </div>
  )
}