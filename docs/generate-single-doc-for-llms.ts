const { readFileSync, readdirSync, statSync, writeFileSync } = require('fs');
const { join } = require('path');

function formatName(name) {
  return name
    .replace(/^\d{2}-/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getAllMarkdownFiles(dir, baseDir = dir) {
  let results = [];
  const items = readdirSync(dir).sort();
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Recursively read subdirectories
      results = results.concat(getAllMarkdownFiles(fullPath, baseDir));
    } else if (item.endsWith('.md') && item !== 'README.md') {
      // Add markdown files (excluding README.md)
      results.push(fullPath);
    }
  }
  
  return results;
}

function generateLLMDocument() {
  const docsDir = './docs';
  const output = [];
  
  // Get all numbered folders
  const folders = readdirSync(docsDir)
    .filter(item => {
      const fullPath = join(docsDir, item);
      return statSync(fullPath).isDirectory() && item.match(/^\d{2}-/);
    })
    .sort();
  
  // Process each folder and its subfolders
  folders.forEach(folder => {
    const folderPath = join(docsDir, folder);
    const folderName = formatName(folder);
    
    // Add main section header
    output.push(`# ${folderName}\n\n`);
    
    // Check for subfolders
    const items = readdirSync(folderPath).sort();
    const subfolders = items.filter(item => {
      const fullPath = join(folderPath, item);
      return statSync(fullPath).isDirectory() && item.match(/^\d{2}-/);
    });
    
    if (subfolders.length > 0) {
      // Process each subfolder separately
      subfolders.forEach(subfolder => {
        const subfolderPath = join(folderPath, subfolder);
        const subfolderName = formatName(subfolder);
        
        // Add subsection header
        output.push(`## ${subfolderName}\n\n`);
        
        // Get markdown files in this subfolder
        const markdownFiles = getAllMarkdownFiles(subfolderPath);
        
        markdownFiles.forEach(filePath => {
          const content = readFileSync(filePath, 'utf8');
          output.push(`${content}\n\n`);
        });
      });
    } else {
      // No subfolders, process files directly
      const markdownFiles = getAllMarkdownFiles(folderPath);
      
      markdownFiles.forEach(filePath => {
        const content = readFileSync(filePath, 'utf8');
        output.push(`${content}\n\n`);
      });
    }
    
    output.push(`---\n\n`);
  });
  
  writeFileSync('kartuli-complete-docs.md', output.join(''));
  console.log('✅ Generated kartuli-complete-docs.md');
}

generateLLMDocument();
