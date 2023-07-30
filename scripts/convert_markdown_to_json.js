const fs = require('fs');
const path = require('path');

function markdownToJSON(bookName, markdownContent) {
  const lines = markdownContent.split(/\r?\n/);
  let chapters = [];
  let currentChapter = null;
  let currentVerseNum = null;
  let chapterNum = 1;

  for (const line of lines) {
    const chapterMatch = line.match(/^## Chapter (\d+)$/);

    if (chapterMatch) {
      if (currentChapter) {
        chapters.push({ ...currentChapter });
      }
      currentChapter = { num: chapterNum, verses: [] };
      chapterNum++;
      currentVerseNum = null;
    } else {
      const verseMatch = line.match(/^(\d+)\. (.+)$/);
      if (verseMatch) {
        currentVerseNum = parseInt(verseMatch[1]);
        currentChapter.verses.push({ text: verseMatch[2].trim(), num: currentVerseNum });
      } else if (currentChapter && line.trim() !== "") {
        if (currentVerseNum !== null) {
          currentChapter.verses.push({ text: line.trim() });
        } else {
          // If there are lines outside verses, add them as verses without numbers
          currentChapter.verses.push({ text: line.trim() });
        }
      }
    }
  }

  if (currentChapter) {
    chapters.push({ ...currentChapter });
  }

  return { name: bookName, chapters };
}

const args = process.argv.slice(2);
const bookName = args[0];
const markdownContent = fs.readFileSync(path.join('books', 'markdown', `${bookName.toLowerCase()}.md`), 'utf8');
const jsonContent = JSON.stringify(markdownToJSON(bookName, markdownContent), null, 2);
fs.writeFileSync(path.join('books', 'json', `${bookName.toLowerCase()}.json`), jsonContent, 'utf8');
