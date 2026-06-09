export interface HighlightedTextSegment {
  text: string;
  highlighted: boolean;
}

export function getHighlightedTextSegments(
  text: string,
  highlight: string,
): HighlightedTextSegment[] {
  if (highlight === '') {
    return [{ text, highlighted: false }];
  }

  const normalizedText = text.toLocaleLowerCase();
  const normalizedHighlight = highlight.toLocaleLowerCase();
  const segments: HighlightedTextSegment[] = [];

  let currentIndex = 0;

  while (currentIndex < text.length) {
    const nextMatchIndex = normalizedText.indexOf(normalizedHighlight, currentIndex);

    if (nextMatchIndex === -1) {
      segments.push({ text: text.slice(currentIndex), highlighted: false });
      break;
    }

    if (nextMatchIndex > currentIndex) {
      segments.push({
        text: text.slice(currentIndex, nextMatchIndex),
        highlighted: false,
      });
    }

    const nextEndIndex = nextMatchIndex + highlight.length;
    segments.push({
      text: text.slice(nextMatchIndex, nextEndIndex),
      highlighted: true,
    });
    currentIndex = nextEndIndex;
  }

  return segments;
}
