# Orthodox NKJV

_The remaining books from the Orthodox canon will be added in future updates to provide a more comprehensive collection of Orthodox Christian texts. We are actively working on expanding the library to include the additional books and texts found in the Orthodox Christian tradition._

**Orthodox NKJV** is a Node.js module that contains the complete text of the New King James Version (NKJV) Bible, organized in separate JSON files for each book. This project aims to make the NKJV Bible data easily accessible to developers for use in TypeScript/JavaScript applications.

## Convert Markdown to JSON

From the root directory of the project, run:

`node scripts/convert_markdown_to_json.js Tobit`

In this case the script will find a file in the markdown directory and create a file called tobit.md in the markdown directory.

The markdown file must be formatted without error or the script will choke. See /books/markdown/tobit.md for an example of clean and correct formatting.

## Folder Structure

The project is structured as follows:

```orthodox-nkjv/
|- books/
|  |- json/
|  |  |- 1-chronicles.json
|  |  |- 1-corinthians.json
|  |  |- ... (other JSON files for each book)
|  |
|  |- markdown/
|  |  |- 1-chronicles.md
|  |  |- 1-corinthians.md
|  |  |- ... (other Markdown files for each book)
|  |
|  |- xml/
|     |- 1-chronicles.xml
|     |- 1-corinthians.xml
|     |- ... (other XML files for each book)
|
|- examples/
|  |- bibleReader.ts
|  |- other-examples.ts
|
|- scripts/
|  |- convert_markdown_to_json.js
|
|- README.md
|- package.json
|- package-lock.json

```

- The `books` folder contains individual JSON files, each representing a book from the New King James Version of the Bible. These files hold the structured text data, organized into chapters and verses.

- The `examples` folder includes TypeScript example files that demonstrate how to access and use the NKJV Bible data from this module.

## Installation

This module can be installed via npm. Simply include it as a dependency in your Node.js project's `package.json` file:

```json
"dependencies": {
  "orthodox-nkjv": "0.1.0"
}
```

## Usage

To access the NKJV Bible data in your TypeScript/JavaScript project, follow these steps:

Install the Module:
Install the orthodox-nkjv module using npm as described above.

Import and Use in Your Code:
Use the readBibleBook function from the orthodox-nkjv module to read data from a specific book.

```import { promises as fsPromises } from 'fs';
import * as path from 'path';

async function readBibleBook(bookName: string): Promise<any> {
  try {
    const filePath = path.join(__dirname, 'books', `${bookName.toLowerCase()}.json`);
    const jsonData = await fsPromises.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error reading ${bookName}: ${error.message}`);
    return null;
  }
}

async function main() {
  const genesisData = await readBibleBook('Genesis');
  if (genesisData) {
    console.log(genesisData); // Bible data for the book of Genesis
  }
}

main();
```

## Explore Other Examples:

Check out the files in the examples folder for more TypeScript examples on how to interact with the NKJV Bible data.

## Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project, specifically the node module alone is licensed under the MIT License.

## Copyright Notice

The text of the New King James Version® (NKJV®) used in this project is copyrighted and owned by Thomas Nelson, Inc. The use of the NKJV text is done so in accordance with the following qualifications:

- Up to and including 1,000 verses may be quoted in printed form as long as the verses quoted amount to less than 50% of a complete book of the Bible and make up less than 50% of the total work in which they are quoted.
- All NKJV quotations must conform accurately to the NKJV text.
- Any use of the NKJV text must include a proper acknowledgment as follows: "Scripture taken from the New King James Version®. Copyright © 1982 by Thomas Nelson, Inc. Used by permission. All rights reserved."

For more information regarding the quotation permission policy for the New King James Version, please visit thomasnelson.com.

The text of the St. Athanasius Academy SeptuagintTM (SAASTM) is also copyrighted and owned by St. Athanasius Academy of Orthodox Theology. The use of the SAAS text is done so in accordance with the following qualifications:

- Up to and including 1,000 verses may be quoted in printed form as long as the verses quoted amount to less than 50% of a complete book of the Bible and make up less than 50% of the total work in which they are quoted.
- All SAAS quotations must conform accurately to the SAAS text.
- Any use of the SAAS text must include a proper acknowledgment as follows: "Scripture taken from the St. Athanasius Academy SeptuagintTM. Copyright © 2008 by St. Athanasius Academy of Orthodox Theology. Used by permission. All rights reserved."
- When quotations from the SAAS text are used in church bulletins, orders of service, Sunday School lessons, church newsletters, and similar works in the course of religious instruction or services at a place of worship or other religious assembly, the following notice may be used at the end of each quotation: "SAAS."

Please note that while the current version includes the Protestant version with 66 books, we are actively working to expand the library to include additional books from the Orthodox canon.
