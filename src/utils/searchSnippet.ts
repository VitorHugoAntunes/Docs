interface MatchPosition {
  start: number;
  end: number;
  term: string;
  score: number;
}

export function extractSmartSnippet(
  text: string,
  query: string,
  maxLength: number = 150
): string {
  if (!text || !query.trim()) {
    return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '');
  }

  const normalizedText = text.toLowerCase();
  const queryTerms = query.toLowerCase().trim().split(/\s+/).filter(term => term.length > 1);

  if (queryTerms.length === 0) {
    return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '');
  }

  const matches: MatchPosition[] = [];

  queryTerms.forEach(term => {
    let index = 0;
    while ((index = normalizedText.indexOf(term, index)) !== -1) {
      matches.push({
        start: index,
        end: index + term.length,
        term,
        score: term.length
      });
      index++;
    }
  });

  if (matches.length === 0) {
    return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '');
  }

  matches.sort((a, b) => a.start - b.start);

  const bestRegion = findBestSnippetRegion(matches, text.length, maxLength);

  let start = bestRegion.start;
  let end = bestRegion.end;

  start = adjustStartPosition(text, start);
  end = adjustEndPosition(text, end, maxLength - (start - bestRegion.start));

  const snippet = text.slice(start, end);

  const prefix = start > 0 ? '...' : '';
  const suffix = end < text.length ? '...' : '';

  return prefix + snippet + suffix;
}

function findBestSnippetRegion(
  matches: MatchPosition[],
  textLength: number,
  maxLength: number
): { start: number; end: number; score: number } {

  if (matches.length === 1) {
    const match = matches[0];
    const center = Math.floor((match.start + match.end) / 2);
    const halfLength = Math.floor(maxLength / 2);

    return {
      start: Math.max(0, center - halfLength),
      end: Math.min(textLength, center + halfLength),
      score: match.score
    };
  }

  let bestRegion = { start: 0, end: maxLength, score: 0 };

  matches.forEach(match => {
    const center = Math.floor((match.start + match.end) / 2);
    const halfLength = Math.floor(maxLength / 2);

    let start = Math.max(0, center - halfLength);
    const end = Math.min(textLength, start + maxLength);

    if (end - start < maxLength && start > 0) {
      start = Math.max(0, end - maxLength);
    }

    const regionScore = matches.reduce((score, m) => {
      if (m.start >= start && m.end <= end) {
        return score + m.score;
      }
      return score;
    }, 0);

    if (regionScore > bestRegion.score) {
      bestRegion = { start, end, score: regionScore };
    }
  });

  return bestRegion;
}

function adjustStartPosition(text: string, start: number): number {
  if (start === 0) return start;

  const sentenceStart = text.lastIndexOf('.', start - 1);
  if (sentenceStart !== -1 && start - sentenceStart < 50) {
    const adjustedStart = sentenceStart + 1;

    let finalStart = adjustedStart;
    while (finalStart < text.length && /\s/.test(text[finalStart])) {
      finalStart++;
    }
    return finalStart;
  }

  const spaceIndex = text.lastIndexOf(' ', start - 1);
  if (spaceIndex !== -1 && start - spaceIndex < 20) {
    return spaceIndex + 1;
  }

  return start;
}

function adjustEndPosition(text: string, end: number, remainingLength: number): number {
  if (end >= text.length) return text.length;

  const sentenceEnd = text.indexOf('.', end);
  if (sentenceEnd !== -1 && sentenceEnd - end < Math.min(50, remainingLength)) {
    return sentenceEnd + 1;
  }

  const spaceIndex = text.indexOf(' ', end);
  if (spaceIndex !== -1 && spaceIndex - end < Math.min(20, remainingLength)) {
    return spaceIndex;
  }

  return Math.min(end, text.length);
}