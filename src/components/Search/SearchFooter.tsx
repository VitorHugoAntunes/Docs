import { SearchResult } from "@/types";

export function SearchFooter({ results }: { results: SearchResult[] }) {
  if (!results.length) return null;

  return (
    <div className="border-t border-gray-200 px-4 py-4 text-sm text-gray-500 bg-gray-50">
      <div className="flex items-center justify-between">
        <span>
          {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
        </span>
        <div className="hidden sm:flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="hidden lg:flex items-center gap-1 text-xs text-gray-400 bg-white border border-gray-300 rounded px-1.5 py-0.5">↑ UP</kbd>
            <kbd className="hidden lg:flex items-center gap-1 text-xs text-gray-400 bg-white border border-gray-300 rounded px-1.5 py-0.5">↓ DOWN</kbd>
            para navegar
          </span>
          <span className="flex items-center gap-1">
            <kbd className="hidden lg:flex items-center gap-1 text-xs text-gray-400 bg-white border border-gray-300 rounded px-1.5 py-0.5">↵ ENTER</kbd>
            para selecionar
          </span>
        </div>
      </div>
    </div>
  );
}
