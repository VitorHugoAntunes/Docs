export function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-blue-100 text-blue-900 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}