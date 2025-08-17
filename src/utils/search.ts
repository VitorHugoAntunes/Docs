import { SearchResult } from "@/types";

export function performSearch(
  query: string,
  setResults: (results: SearchResult[]) => void,
  setIsLoading: (loading: boolean) => void,
  setSelectedIndex: (index: number) => void
) {
  if (!query.trim()) {
    setResults([]);
    setSelectedIndex(-1);
    setIsLoading(false);
    return;
  }

  setIsLoading(true);

  const timeoutId = setTimeout(async () => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(-1);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const filtered: SearchResult[] = await response.json();

      setResults(filtered);
      setSelectedIndex(-1);
      setIsLoading(false);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setSelectedIndex(-1);
      setIsLoading(false);
    }
  }, 200);

  return () => clearTimeout(timeoutId);
}