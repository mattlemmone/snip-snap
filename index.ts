import { readFileSync, writeFileSync } from 'fs';
import { extname } from 'path';

const weekdayMap: { [key: string]: string } = {
  '月': 'Monday',
  '火': 'Tuesday',
  '水': 'Wednesday',
  '木': 'Thursday',
  '金': 'Friday',
  '土': 'Saturday',
  '日': 'Sunday'
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function localizeClipping(line: string): string {
  // Handle the clipping limit message
  if (line.includes("<このアイテムのクリップの上限に達しました>")) {
    return line.replace("<このアイテムのクリップの上限に達しました>", "<You have reached the clipping limit for this item>");
  }
  if (!line.includes("位置No.")) {
    return line;
  }


  // Match both formats of Japanese Kindle clippings
  const pageMatch = line.match(/- (.*?)ページ/) || [];
  const locationMatch = line.match(/位置(?:No\. )?(\d+)(?:-(\d+))?/);
  const dateMatch = line.match(/(?:作成日: )?(\d{4})年(\d{1,2})月(\d{1,2})日([月火水木金土日])曜日 (\d{1,2}):(\d{2}):(\d{2})/);

  // Check for the presence of each match and log them if any are missing
  if (!pageMatch || !locationMatch || !dateMatch) {
    console.error(`Match results - Page: ${pageMatch}, Location: ${locationMatch}, Date: ${dateMatch}`);
    throw new Error(`Line does not match expected format: ${line}`);
  }
  const locationStart = locationMatch ? locationMatch[1] : '';
  const locationEnd = locationMatch ? locationMatch[2] : '';
  const locationStr = locationEnd
    ? `${locationStart}-${locationEnd}`
    : locationStart;

  const [year, month, day, weekday, hour, minute, second] = dateMatch ? dateMatch.slice(1) : [];

  // Format the date in English
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const englishMonth = monthNames[date.getMonth()];
  const hourInt = parseInt(hour);
  const period = hourInt >= 12 ? 'PM' : 'AM';
  const hour12 = hourInt % 12 || 12;

  // Construct the English format string
  const pageStr = pageMatch[1] ? `on page ${pageMatch[1]} ` : '';
  const localizedString = `- Your Highlight ${pageStr}| Location ${locationStr} | Added on ${weekdayMap[weekday]}, ${englishMonth} ${parseInt(
    day
  )}, ${year} ${hour12}:${minute}:${second} ${period}`;



  return localizedString;
}

function localizeFile(inputFilePath: string): void {
  // Validate that the file is a text file
  if (extname(inputFilePath) !== '.txt') {
    console.error('Error: The input file must be a text file.');
    process.exit(1);
  }

  const startTime = Date.now(); // Track the start time

  const fileContent = readFileSync(inputFilePath, 'utf-8');
  const lines = fileContent.split('\n');

  // Count the number of clippings
  const clippingPattern = /^\s*==========\s*$/;
  const clippingCount = lines.filter(line => clippingPattern.test(line)).length;
  console.log(`Total clippings to process: ${clippingCount}`);

  const localizedLines = [];
  let processedClippings = 0;
  let lastLoggedProgress = -5;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    localizedLines.push(localizeClipping(line));

    if (clippingPattern.test(line)) {
      processedClippings++;
      const progress = ((processedClippings / clippingCount) * 100).toFixed(2);
      const progressInt = Math.floor(parseFloat(progress));

      // Log progress at 5% increments
      if (progressInt % 5 === 0 && progressInt !== lastLoggedProgress) {
        console.log(`Processed ${processedClippings}/${clippingCount} clippings (${progressInt}%)`);
        lastLoggedProgress = progressInt;
      }
    }
  }

  const outputFilePath = inputFilePath.replace(/(\.[^/.]+)$/, '_localized$1');
  writeFileSync(outputFilePath, localizedLines.join('\n'), 'utf-8');

  const endTime = Date.now(); // Track the end time
  const elapsedTime = endTime - startTime;
  console.log(`Processed ${lines.length} lines across ${clippingCount} clippings in ${elapsedTime} ms.`);
}
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Error: No input file provided.');
    process.exit(1);
  }
  const inputFilePath = args[0];
  localizeFile(inputFilePath);
}
