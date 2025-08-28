import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-[1440px] mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Documentação</h3>
            <ul className="space-y-2 sm:space-y-3">
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
            <h3 className="text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Guias</h3>
            <ul className="space-y-2 sm:space-y-3">
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
            <h3 className="text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Recursos</h3>
            <ul className="space-y-2 sm:space-y-3">
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
            <h3 className="text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Comunidade</h3>
            <ul className="space-y-2 sm:space-y-3">
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

        <div className="border-t border-gray-200 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="max-w-full sm:max-w-md">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 sm:mb-4">
              Mantenha-se atualizado
            </h3>
            <p className="text-sm text-gray-600 mb-3 sm:mb-4">
              Receba as últimas atualizações da documentação e novos recursos.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 min-w-0 w-full rounded-lg border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-left transition-all group-hover:bg-gray-100 group-hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:gray-400 text-gray-900"
              />
              <button
                type="button"
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Inscrever
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between space-y-4 lg:space-y-0">

            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 sm:gap-3">
                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600"></div>
                <span className="text-lg sm:text-xl font-bold text-gray-900">DocSite</span>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              <Link
                href="/privacidade"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="/termos"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Termos
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 sm:pt-6 mt-4 sm:mt-6 space-y-3 sm:space-y-0">
            <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © {currentYear} DocSite. Todos os direitos reservados.
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <span className="hidden sm:inline">Última atualização: hoje</span>
              <span className="hidden sm:inline">•</span>
              <div className="text-center sm:text-left">
                Desenvolvido por{' '}
                <a
                  href="https://www.linkedin.com/in/vitor-hugo-antunes-passos/"
                  className="text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vitor Hugo Antunes
                </a>
                {' '}com ❤️
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}