import { Search, X } from "lucide-react";
import { SearchCommandKey } from "./SearchCommandKey";

export function SearchHeader({
  query,
  setQuery,
  onClose,
  inputRef
}: {
  query: string;
  setQuery: (value: string) => void;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4 sm:px-6">
      <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar na documentação..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-transparent text-gray-900"
      />
      <div className="flex items-center gap-2">
        <SearchCommandKey />
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors cursor-pointer"
          aria-label="Fechar busca"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}