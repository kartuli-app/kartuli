export type TranslitOutputSegment = {
  id: string;
  sourceText: string;
  outputText: string;
  isWhitespace: boolean;
};

const segmentPattern = /\s+|\S+/g;
const whitespaceRunPattern = /^\s+$/;

function getSegments(text: string): string[] {
  // Transliteration is expected to preserve whitespace/token boundaries so source and output
  // segment runs stay aligned after this shared split.
  return text.match(segmentPattern) ?? [];
}

export function getTranslitOutputSegments(
  sourceText: string,
  outputText: string,
): TranslitOutputSegment[] {
  const sourceSegments = getSegments(sourceText);
  const outputSegments = getSegments(outputText);

  if (process.env.NODE_ENV !== 'production') {
    console.assert(
      sourceSegments.length === outputSegments.length,
      'Expected transliteration segment alignment between source and output.',
      {
        sourceText,
        outputText,
        sourceSegments,
        outputSegments,
        sourceLength: sourceSegments.length,
        outputLength: outputSegments.length,
      },
    );
  }

  const segmentCount = Math.max(sourceSegments.length, outputSegments.length);

  return Array.from({ length: segmentCount }, (_, index) => {
    const sourceSegment = sourceSegments[index] ?? '';
    const outputSegment = outputSegments[index] ?? '';
    const segmentText = sourceSegment || outputSegment;

    return {
      id: `${index}:${sourceSegment}:${outputSegment}`,
      sourceText: sourceSegment,
      outputText: outputSegment,
      isWhitespace: whitespaceRunPattern.test(segmentText),
    };
  });
}
