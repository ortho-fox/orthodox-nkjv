const fs = require('fs');
const path = require('path');

function sanitizeFileName(name) {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function jsonToXML(obj, indent = 0) {
  const indentStr = ' '.repeat(indent);
  let xml = '';

  if (Array.isArray(obj)) {
    for (const item of obj) {
      xml += `${indentStr}<item>\n${jsonToXML(item, indent + 2)}${indentStr}</item>\n`;
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        xml += `${indentStr}<${key}>\n${jsonToXML(obj[key], indent + 2)}${indentStr}</${key}>\n`;
      }
    }
  } else {
    xml += `${indentStr}${obj}\n`;
  }

  return xml;
}

function convertJSONToXML(bookName) {
  const jsonFilePath = path.join(__dirname, '..', 'books', 'json', `${sanitizeFileName(bookName)}.json`);
  if (!fs.existsSync(jsonFilePath)) {
    console.error(`JSON file for ${bookName} not found.`);
    return;
  }
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n${jsonToXML(require(jsonFilePath))}`;
  const xmlFilePath = path.join(__dirname, '..', 'books', 'xml', `${sanitizeFileName(bookName)}.xml`);
  fs.writeFileSync(xmlFilePath, xmlContent, 'utf8');
  console.log(`JSON converted to XML and saved to ${xmlFilePath}`);
}

function convertAllJSONToXML() {
  const args = process.argv.slice(2);
  const wildcard = args[0];

  const jsonFiles = fs.readdirSync(path.join('books', 'json'));
  if (wildcard === '*' || args.length === 0) {
    for (const jsonFile of jsonFiles) {
      const bookName = path.basename(jsonFile, '.json');
      convertJSONToXML(bookName);
    }
  } else {
    const matchingFiles = jsonFiles.filter(jsonFile => sanitizeFileName(jsonFile).startsWith(sanitizeFileName(wildcard)));
    for (const jsonFile of matchingFiles) {
      const bookName = path.basename(jsonFile, '.json');
      convertJSONToXML(bookName);
    }
  }
}

convertAllJSONToXML();
