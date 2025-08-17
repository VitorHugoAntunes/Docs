import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Documentação</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs/introducao"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Introdução
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/instalacao"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Instalação
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/configuracao"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Configuração
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/api-reference"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Referência da API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Guias</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs/conceitos-basicos"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Conceitos Básicos
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/exemplos"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Exemplos
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/boas-praticas"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Boas Práticas
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/troubleshooting"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Solução de Problemas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/seu-usuario/projeto"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/seu-usuario/projeto/issues"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Issues & Bugs
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/seu-usuario/projeto/discussions"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discussões
                </a>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Comunidade</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://discord.gg/exemplo"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/seu_projeto"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@seuprojeto.com"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contato
                </a>
              </li>
              <li>
                <Link
                  href="/contribuir"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contribuir
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Mantenha-se atualizado
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Receba as últimas atualizações da documentação e novos recursos.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 min-w-0 w-full rounded-lg border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-left transition-all group-hover:bg-gray-100 group-hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:gray-400 text-gray-900"
              />
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Inscrever
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-200">

          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                DocSite
              </div>
              <div className="text-xs text-gray-500">
                Documentação moderna
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="text-xs text-gray-500">
              © {currentYear} DocSite. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/privacidade"
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="/termos"
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Termos
              </Link>
              <Link
                href="/cookies"
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>

        </div>

        <div className="flex items-center justify-center mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Todos os sistemas operacionais</span>
            <span className="mx-2">•</span>
            <span>Última atualização: hoje</span>
          </div>
        </div>

      </div>
    </footer>
  );
}