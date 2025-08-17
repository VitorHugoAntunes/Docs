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
    <div className="max-h-96 overflow-y-auto" ref={resultsRef}>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : query && results.length === 0 ? (
        <div className="py-12 text-center">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum resultado encontrado
          </h3>
          <p className="text-gray-500">
            Tente pesquisar com termos diferentes ou verifique a ortografia.
          </p>
        </div>
      ) : query && results.length > 0 ? (
        <div className="py-2">
          {groupedResults.map((group, groupIndex) => (
            <div key={group.category + groupIndex} className="mb-4 last:mb-0">
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    {group.category.includes('›') ? (
                      <>
                        <Hash className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-500 text-xs">Seções em</span>
                        {group.category}
                      </>
                    ) : (
                      <>
                        <FileText className="h-3 w-3 text-blue-600" />
                        {group.category}
                      </>
                    )}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                    {group.totalMatches} {group.totalMatches === 1 ? 'resultado' : 'resultados'}
                  </span>
                </div>
              </div>

              <div className="space-y-0">
                {group.results.map((result, itemIndex) => {
                  const globalIndex = getGlobalIndex(groupIndex, itemIndex);
                  const isSelected = globalIndex === selectedIndex;

                  const cleanContent = cleanMarkdownContent(result.content);
                  const relevantSnippet = extractSmartSnippet(cleanContent, query, 120);

                  return (
                    <button
                      key={result.id}
                      data-index={globalIndex}
                      onClick={() => handleResultClick(result)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-100 border-l-4 cursor-pointer ${isSelected ? 'bg-blue-50 border-l-blue-600' : 'border-l-transparent'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {result.type === 'page' ? (
                            <FileText className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Hash className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 truncate">
                              {highlightMatch(result.title, query)}
                            </h3>
                            <span className="text-xs text-gray-400 shrink-0">
                              {result.type === 'page' ? 'Página' : 'Seção'}
                            </span>
                          </div>
                          {/* Mostra hierarquia para seções */}
                          {result.type === 'heading' && result.category.includes('›') && (
                            <div className="text-xs text-gray-500 mb-1">
                              {result.category}
                            </div>
                          )}
                          {relevantSnippet && (
                            <p className="text-sm text-gray-600 line-clamp-2">
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

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
              {(() => {
                const mainCategories = new Set(
                  groupedResults
                    .map(group => group.category.split('›')[0].trim())
                    .filter(Boolean)
                );
                const categoryCount = mainCategories.size;

                return categoryCount > 1
                  ? ` em ${categoryCount} ${categoryCount === 1 ? 'categoria' : 'categorias'}`
                  : '';
              })()}
            </p>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Buscar na documentação
          </h3>
          <p className="text-gray-500">
            Digite para encontrar páginas, seções e conteúdo.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['Getting Started', 'API', 'Configuração', 'Exemplos'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors cursor-pointer"
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