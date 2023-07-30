const fs = require('fs');
const path = require('path');

function jsonToMarkdown(bookName, jsonData) {
  let markdownContent = `# ${bookName}\n\n`;
  for (const chapter of jsonData.chapters) {
    if (chapter.num !== null) {
      markdownContent += `## Chapter ${chapter.num}\n\n`;
      for (const verse of chapter.verses) {
        markdownContent += `${verse.num}. ${verse.text}\n\n`;
      }
    }
  }
  return markdownContent;
}

function convertJSONToMarkdown(bookName) {
  const jsonFilePath = path.join(__dirname, '..', 'books', 'json', `${bookName.toLowerCase()}.json`);
  if (!fs.existsSync(jsonFilePath)) {
    console.error(`JSON file for ${bookName} not found.`);
    return;
  }
  const jsonData = require(jsonFilePath);
  const markdownContent = jsonToMarkdown(bookName, jsonData);
  const markdownFilePath = path.join(__dirname, '..', 'books', 'markdown', `${bookName.toLowerCase()}.md`);
  fs.writeFileSync(markdownFilePath, markdownContent, 'utf8');
  console.log(`JSON converted to Markdown and saved to ${markdownFilePath}`);
}



function convertAllJSONToMarkdown() {
  const args = process.argv.slice(2);
  const wildcard = args[0];

  const jsonFiles = fs.readdirSync(path.join('books', 'json'));
  if (wildcard === '*' || args.length === 0) {
    for (const jsonFile of jsonFiles) {
      const bookName = path.basename(jsonFile, '.json');
      convertJSONToMarkdown(bookName);
    }
  } else {
    const matchingFiles = jsonFiles.filter(jsonFile => jsonFile.toLowerCase().startsWith(wildcard.toLowerCase()));
    for (const jsonFile of matchingFiles) {
      const bookName = path.basename(jsonFile, '.json');
      convertJSONToMarkdown(bookName);
    }
  }
}

convertAllJSONToMarkdown();
