import { readFileSync, writeFileSync } from 'fs';

export function localizeClipping(line: string): string {
  // Handle the clipping limit message
  if (line.includes("<このアイテムのクリップの上限に達しました>")) {
    return line.replace("<このアイテムのクリップの上限に達しました>", "<You have reached the clipping limit for this item>");
  }
  if (!line.includes("位置No.")) {
    return line;
  }

  // Print the original line before transformation
  console.log(`Original line: ${line}`);

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

  // Convert Japanese weekday to English
  const weekdayMap: { [key: string]: string } = {
    '月': 'Monday',
    '火': 'Tuesday',
    '水': 'Wednesday',
    '木': 'Thursday',
    '金': 'Friday',
    '土': 'Saturday',
    '日': 'Sunday'
  };

  const [year, month, day, weekday, hour, minute, second] = dateMatch ? dateMatch.slice(1) : [];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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


  // Print the localized string on success
  console.log(`Localized string: ${localizedString}`);

  return localizedString;
}

function localizeFile(inputFilePath: string): void {
  // Read the file content
  const fileContent = readFileSync(inputFilePath, 'utf-8');
  
  // Split the content into lines
  const lines = fileContent.split('\n');
  
  // Process each line
  const localizedLines = lines.map(line => localizeClipping(line));
  
  // Create the output file path
  const outputFilePath = inputFilePath.replace(/(\.[^/.]+)$/, '_localized$1');
  
  // Write the localized lines to the new file
  writeFileSync(outputFilePath, localizedLines.join('\n'), 'utf-8');
}

// Example usage
localizeFile('./My Clippings.txt');
