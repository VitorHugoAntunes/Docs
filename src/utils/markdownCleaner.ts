export function cleanMarkdownContent(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  let cleaned = markdown;

  cleaned = cleaned.replace(/^---[\s\S]*?---\n?/m, '');
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
  cleaned = cleaned.replace(/`[^`]*`/g, '');
  cleaned = cleaned.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');
  cleaned = cleaned.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
  cleaned = cleaned.replace(/^#{1,6}\s+(.*)$/gm, '$1');
  cleaned = cleaned.replace(/^[\s]*[-*+]\s+/gm, '');
  cleaned = cleaned.replace(/^[\s]*\d+\.\s+/gm, '');
  cleaned = cleaned.replace(/^>\s*/gm, '');
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  cleaned = cleaned.replace(/\[\^[^\]]*\]/g, '');
  cleaned = cleaned.replace(/^\[\^[^\]]*\]:\s*.*/gm, '');
  cleaned = cleaned.replace(/^\|.*\|$/gm, '');
  cleaned = cleaned.replace(/^\|[\s\-:]+\|$/gm, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  cleaned = cleaned.replace(/^[ \t]+|[ \t]+$/gm, '');
  cleaned = cleaned.replace(/[ ]{2,}/g, ' ');
  cleaned = cleaned.trim();
  cleaned = cleaned.replace(/[*_~]/g, '');
  cleaned = cleaned.replace(/\\(.)/g, '$1');

  return cleaned;
}

export function cleanAndTruncateMarkdown(
  markdown: string,
  maxLength: number = 200
): string {
  const cleaned = cleanMarkdownContent(markdown);

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  let truncated = cleaned.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > maxLength * 0.8) {
    truncated = truncated.slice(0, lastSpace);
  }

  return truncated + '...';
}