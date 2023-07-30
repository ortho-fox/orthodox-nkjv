import * as fs from 'fs-extra'

async function readBibleBook(bookName: string): Promise<any> {
  const filePath = `${__dirname}/json/${bookName.toLowerCase()}.json`
  try {
    const data = await fs.readJson(filePath)
    return data
  } catch (error) {
    console.error(`Error reading ${bookName}: ${error}`)
    return null
  }
}

// Usage example:
async function main() {
  const genesisData = await readBibleBook('genesis')
  if (genesisData) {
    console.log(genesisData) // Do something with the book data here
  }
}

main()
