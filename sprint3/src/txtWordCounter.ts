import * as fs from "fs/promises";

import * as path from "path";

import { fileURLToPath } from "url";

const testFileName = "example.txt";

function countWordsInTxt(text: string): number {
  if (!text) {
    console.log("Nenhum arquvio foi lido");
    return 0;
  }

  const cleanedText = text.replace(/\n/g, " ");

  cleanedText.trim();

  if (cleanedText.length === 0) {
    return 0;
  }
  //*  Estudar sugestao do copilot === > .filter((word) => word !== "");

  const words: string[] = cleanedText.split(" ").filter((word) => word !== "");

  return words.length;
}

function getDirname(metaUrl: string): string {
  const __filename = fileURLToPath(metaUrl);

  return path.dirname(__filename);
}

async function countWordsInFile(): Promise<void> {
  console.log("Begin");

  const currentDir: string = getDirname(import.meta.url);

  const filePath: string = path.join(currentDir, ".", testFileName);

  let fileContent: string;

  try {
    console.log("Lendo arquivo");
    fileContent = await fs.readFile(filePath, { encoding: "utf-8" });

    console.log("Contando palavras");
    const wordCount: number = countWordsInTxt(fileContent);

    console.log(`O arquivo possui ${wordCount} palavras.`);
  } catch (error: any) {
    console.error(` Erro durante a operação assíncrona de arquivo:`);

    if (error.code === "ENOENT") {
      console.error(`O arquivo "${testFileName}" não foi encontrado no caminho: ${filePath}.`);
    } else {
      console.error(`Detalhes: ${error.message}`);
    }
  }
}

(async () => {
  await countWordsInFile();
})();
// function begin() {
//   console.log("Testando boa vontade do ts");
// }

// begin();
