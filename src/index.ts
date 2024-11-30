import { readFileSync, writeFileSync } from 'fs';
import { extname } from 'path';
import { LocalizationStrategy } from './localization/LocalizationStrategy';
import { LocalizationFactory } from './localization/LocalizationFactory';

function readClippingsFromFile(filePath: string): string[] {
  if (extname(filePath) !== '.txt') {
    console.error('Error: The input file must be a text file.');
    process.exit(1);
  }
  const fileContent = readFileSync(filePath, 'utf-8');
  return fileContent.split('\n');
}

function processClippings(lines: string[], localizationStrategy: LocalizationStrategy): { localizedLines: string[], clippingCount: number } {
  const localizedLines = [];
  const clippingPattern = /^\s*==========\s*$/;
  const clippingCount = lines.filter(line => clippingPattern.test(line)).length;
  console.log(`Total clippings to process: ${clippingCount}`);

  let processedClippings = 0;
  let lastLoggedProgress = -5;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    localizedLines.push(localizationStrategy.localizeClipping(line));

    if (clippingPattern.test(line)) {
      processedClippings++;
      const progress = ((processedClippings / clippingCount) * 100).toFixed(2);
      const progressInt = Math.floor(parseFloat(progress));

      if (progressInt % 5 === 0 && progressInt !== lastLoggedProgress) {
        console.log(`Processed ${processedClippings}/${clippingCount} clippings (${progressInt}%)`);
        lastLoggedProgress = progressInt;
      }
    }
  }

  return { localizedLines, clippingCount };
}

function writeClippingsToFile(filePath: string, lines: string[]): void {
  writeFileSync(filePath, lines.join('\n'), 'utf-8');
}

function localizeFile(inputFilePath: string, languageCode: string): void {
  const startTime = Date.now();

  const lines = readClippingsFromFile(inputFilePath);
  const localizationStrategy = LocalizationFactory.getLocalizationStrategy(languageCode);
  const { localizedLines, clippingCount } = processClippings(lines, localizationStrategy);

  const outputFilePath = inputFilePath.replace(/(\.[^/.]+)$/, '_localized$1');
  writeClippingsToFile(outputFilePath, localizedLines);

  const endTime = Date.now();
  const elapsedTime = endTime - startTime;
  console.log(`Processed ${lines.length} lines across ${clippingCount} clippings in ${elapsedTime} ms.`);
}
function main(): void {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node index.js <inputFilePath> <languageCode>');
    process.exit(1);
  }
  const inputFilePath = args[0];
  const languageCode = args[1];
  localizeFile(inputFilePath, languageCode);
}

if (require.main === module) {
  main();
}
