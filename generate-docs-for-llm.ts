/**
 * Generate a single consolidated documentation file for LLM consumption
 * 
 * Usage: node generate-docs-for-llm.ts
 */

const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// ============================================================================
// CONFIGURATION - Edit these values as needed
// ============================================================================

/**
 * Files to exclude from inclusion (will keep the link but not embed content)
 * Add filenames here to skip embedding them in the generated doc
 */
const EXCLUDED_FILES = [
  'CONTRIBUTING.md'
];

const INPUT_FILE = 'README.md';
const OUTPUT_FILE = 'kartuli-docs-for-llm.md';

// ============================================================================
// SCRIPT
// ============================================================================

/**
 * Extract all markdown links from content
 * @param {string} content 
 * @returns {Array<{fullMatch: string, text: string, path: string, index: number, lineNumber: number}>}
 */
function extractMarkdownLinks(content) {
  const lines = content.split('\n');
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const matches = [];

  lines.forEach((line, lineIndex) => {
    let match;
    while ((match = linkRegex.exec(line)) !== null) {
      matches.push({
        fullMatch: match[0],
        text: match[1],
        path: match[2],
        index: match.index,
        lineNumber: lineIndex + 1
      });
    }
  });

  return matches;
}

/**
 * Check if a file should be excluded from inclusion
 * @param {string} path 
 * @returns {boolean}
 */
function shouldExclude(path) {
  const filename = path.split('/').pop() || '';
  return EXCLUDED_FILES.includes(filename);
}

/**
 * Get the heading context for a line number in the content
 * @param {string} content 
 * @param {number} lineNumber 
 * @returns {{text: string, level: number} | null}
 */
function getHeadingContext(content, lineNumber) {
  const lines = content.split('\n');
  
  // Walk backwards from the line to find the nearest heading
  for (let i = lineNumber - 1; i >= 0; i--) {
    const line = lines[i];
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      return {
        level: headingMatch[1].length,
        text: headingMatch[2]
      };
    }
  }
  
  return null;
}

/**
 * Generate context marker comments for included content
 * @param {string} filepath 
 * @param {{text: string, level: number} | null} parentContext 
 * @returns {string}
 */
function generateContextMarker(filepath, parentContext) {
  const separator = '<!-- ═══════════════════════════════════════════════════════════════ -->';
  let marker = `\n${separator}\n`;
  marker += `<!-- INCLUDED: ${filepath} -->\n`;
  
  if (parentContext) {
    marker += `<!-- CONTEXT: Nested under "${parentContext.text}" (H${parentContext.level}) -->\n`;
    marker += `<!-- INSTRUCTION: Treat headings in this block as relative to the parent context -->\n`;
  }
  
  marker += `${separator}\n\n`;
  return marker;
}

/**
 * Generate end marker for included content
 * @param {string} filepath 
 * @returns {string}
 */
function generateEndMarker(filepath) {
  const separator = '<!-- ═══════════════════════════════════════════════════════════════ -->';
  return `\n${separator}\n<!-- END INCLUDED: ${filepath} -->\n${separator}\n`;
}

/**
 * Read and include a file's content with context markers
 * @param {string} filepath 
 * @param {{text: string, level: number} | null} parentContext 
 * @returns {string}
 */
function includeFile(filepath, parentContext) {
  try {
    const fullPath = join(process.cwd(), filepath);
    const content = readFileSync(fullPath, 'utf-8');
    
    let result = generateContextMarker(filepath, parentContext);
    result += content.trim();
    result += generateEndMarker(filepath);
    
    return result;
  } catch (error) {
    console.warn(`Warning: Could not read file ${filepath}, skipping...`);
    return '';
  }
}

/**
 * Process the README and generate consolidated documentation
 */
function generateConsolidatedDocs() {
  console.log('🚀 Generating consolidated documentation for LLMs...\n');
  
  // Read the main README
  const readmePath = join(process.cwd(), INPUT_FILE);
  const readmeContent = readFileSync(readmePath, 'utf-8');
  const readmeLines = readmeContent.split('\n');
  
  // Extract all links
  const links = extractMarkdownLinks(readmeContent);
  console.log(`📝 Found ${links.length} links in ${INPUT_FILE}`);
  
  // Build a map of line numbers to links that should be included
  const linksToIncludeByLine = new Map();
  
  links.forEach(link => {
    // Skip external URLs
    if (link.path.startsWith('http://') || link.path.startsWith('https://')) {
      return;
    }
    
    // Skip excluded files
    if (shouldExclude(link.path)) {
      console.log(`   ⏭️  Skipping excluded file: ${link.path}`);
      return;
    }
    
    // Skip anchors
    if (link.path.startsWith('#')) {
      return;
    }
    
    linksToIncludeByLine.set(link.lineNumber, link);
  });
  
  console.log(`📦 Including ${linksToIncludeByLine.size} files\n`);
  
  // Build the output content by processing line by line
  let output = generateDocHeader();
  
  readmeLines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Add the current line
    output += line + '\n';
    
    // Check if this line has a link to include
    const link = linksToIncludeByLine.get(lineNumber);
    if (link) {
      console.log(`   📄 Including: ${link.path} (after line ${lineNumber})`);
      const parentContext = getHeadingContext(readmeContent, lineNumber);
      const includedContent = includeFile(link.path, parentContext);
      if (includedContent) {
        output += includedContent + '\n';
      }
    }
  });
  
  // Write output
  const outputPath = join(process.cwd(), OUTPUT_FILE);
  writeFileSync(outputPath, output, 'utf-8');
  
  console.log(`\n✅ Generated: ${OUTPUT_FILE}`);
  console.log(`📊 Total size: ${(output.length / 1024).toFixed(2)} KB`);
}

/**
 * Generate header for the consolidated documentation
 * @returns {string}
 */
function generateDocHeader() {
  const now = new Date().toISOString();
  return `<!-- 
==============================================================================
⚠️  GENERATED DOCUMENTATION FOR LLM CONSUMPTION
==============================================================================

This file is automatically generated and may not be up to date.

For the latest documentation, please refer to the main README.md and 
linked documentation files in the repository.

Generated: ${now}
Source: ${INPUT_FILE}
Script: generate-docs-for-llm.ts

==============================================================================
-->

`;
}

// Run the script
try {
  generateConsolidatedDocs();
} catch (error) {
  console.error('❌ Error generating documentation:', error);
  process.exit(1);
}

