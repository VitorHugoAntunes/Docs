import { highlightMatch } from "@/components/Search/SearchHighlightMatch";
import { SearchResult } from "@/types";
import { cleanMarkdownContent } from "@/utils/markdownCleaner";
import { GroupedSearchResult, groupSearchResults } from "@/utils/searchResultGrouper";
import { extractSmartSnippet } from "@/utils/searchSnippet";
import { FileText, Hash, Loader2, Search } from "lucide-react";

export function SearchContent({
  query,
  results,
  selectedIndex,
  isLoading,
  setQuery,
  handleResultClick,
  resultsRef
}: {
  query: string;
  results: SearchResult[];
  selectedIndex: number;
  isLoading: boolean;
  setQuery: (value: string) => void;
  handleResultClick: (result: SearchResult) => void;
  resultsRef: React.RefObject<HTMLDivElement>;
}) {
  const groupedResults: GroupedSearchResult[] = groupSearchResults(results);

  const getGlobalIndex = (groupIndex: number, itemIndex: number): number => {
    let globalIndex = 0;
    for (let i = 0; i < groupIndex; i++) {
      globalIndex += groupedResults[i].results.length;
    }
    return globalIndex + itemIndex;
  };

  return (
    <div className="max-h-72 sm:max-h-80 md:max-h-96 overflow-y-auto" ref={resultsRef}>
      {isLoading ? (
        <div className="flex items-center justify-center py-8 sm:py-12">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-blue-600" />
        </div>
      ) : query && results.length === 0 ? (
        <div className="py-8 sm:py-12 text-center px-4">
          <Search className="h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            Nenhum resultado encontrado
          </h3>
          <p className="text-sm sm:text-base text-gray-500 px-2">
            Tente pesquisar com termos diferentes ou verifique a ortografia.
          </p>
        </div>
      ) : query && results.length > 0 ? (
        <div className="py-1 sm:py-2">
          {groupedResults.map((group, groupIndex) => (
            <div key={group.category + groupIndex} className="mb-2 sm:mb-4 last:mb-0">
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                    {group.category.includes('›') ? (
                      <>
                        <Hash className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-500 text-xs hidden sm:inline">Seções em</span>
                        <span className="truncate">{group.category}</span>
                      </>
                    ) : (
                      <>
                        <FileText className="h-3 w-3 text-blue-600 flex-shrink-0" />
                        <span className="truncate">{group.category}</span>
                      </>
                    )}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-200 px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0">
                    {group.totalMatches}
                    <span className="hidden sm:inline"> {group.totalMatches === 1 ? 'resultado' : 'resultados'}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-0">
                {group.results.map((result, itemIndex) => {
                  const globalIndex = getGlobalIndex(groupIndex, itemIndex);
                  const isSelected = globalIndex === selectedIndex;

                  const cleanContent = cleanMarkdownContent(result.content);
                  const relevantSnippet = extractSmartSnippet(
                    cleanContent,
                    query,
                    window.innerWidth < 640 ? 80 : 120
                  );

                  return (
                    <button
                      key={result.id + globalIndex}
                      data-index={globalIndex}
                      onClick={() => handleResultClick(result)}
                      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-100 border-l-2 sm:border-l-4 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-l-blue-600' : 'border-l-transparent'
                        }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                          {result.type === 'page' ? (
                            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                          ) : (
                            <Hash className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate flex-1">
                              {highlightMatch(result.title, query)}
                            </h3>
                            <span className="text-xs text-gray-400 shrink-0">
                              {result.type === 'page' ? 'Página' : 'Seção'}
                            </span>
                          </div>

                          {result.type === 'heading' && result.category.includes('›') && (
                            <div className="text-xs text-gray-500 mb-1 truncate">
                              {result.category}
                            </div>
                          )}
                          {relevantSnippet && (
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                              {highlightMatch(relevantSnippet, query)}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              <span className="font-medium">{results.length}</span>
              <span className="hidden sm:inline"> {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}</span>
              <span className="sm:hidden"> resultado{results.length !== 1 ? 's' : ''}</span>
              {(() => {
                const mainCategories = new Set(
                  groupedResults
                    .map(group => group.category.split('›')[0].trim())
                    .filter(Boolean)
                );
                const categoryCount = mainCategories.size;

                return categoryCount > 1
                  ? (
                    <>
                      <span className="hidden sm:inline"> em {categoryCount} {categoryCount === 1 ? 'categoria' : 'categorias'}</span>
                      <span className="sm:hidden"> • {categoryCount} cat.</span>
                    </>
                  )
                  : '';
              })()}
            </p>
          </div>
        </div>
      ) : (
        <div className="py-8 sm:py-12 text-center px-4">
          <Search className="h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            Buscar na documentação
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
            Digite para encontrar páginas, seções e conteúdo.
          </p>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {['Getting Started', 'API', 'Configuração', 'Exemplos'].map((tag, index) => (
              <button
                key={tag + index}
                onClick={() => setQuery(tag)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded-full transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}