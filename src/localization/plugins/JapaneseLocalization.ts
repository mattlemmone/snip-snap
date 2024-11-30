import { BaseLocalizationStrategy } from '../BaseLocalizationStrategy';
import { SUPPORTED_LOCALES } from '../constants';

export default class JapaneseLocalization extends BaseLocalizationStrategy {
  languageCode = SUPPORTED_LOCALES.JAPANESE;

  private weekdayMap: { [key: string]: string } = {
    '月': 'Monday',
    '火': 'Tuesday',
    '水': 'Wednesday',
    '木': 'Thursday',
    '金': 'Friday',
    '土': 'Saturday',
    '日': 'Sunday',
  };

  private monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];


  protected isClipLimitMessage(line: string): boolean {
    return line.includes('<このアイテムのクリップの上限に達しました>');
  }

  protected isLocalizable(line: string): boolean {
    return line.includes('位置No.');
  }

  protected parsePage(line: string): string {
    const pageMatch = line.match(/- (.*?)ページ/);
    return pageMatch && pageMatch[1] ? pageMatch[1] : '';
  }

  protected parseLocation(line: string): string {
    const locationMatch = line.match(/位置(?:No\. )?(\d+)(?:-(\d+))?/);
    if (!locationMatch) {
      throw new Error(`Line does not contain location info: ${line}`);
    }
    const [, start, end] = locationMatch;
    return end ? `${start}-${end}` : start;
  }

  protected parseDate(line: string): string {
    const dateMatch = line.match(
      /(?:作成日: )?(\d{4})年(\d{1,2})月(\d{1,2})日([月火水木金土日])曜日 (\d{1,2}):(\d{2}):(\d{2})/
    );
    if (!dateMatch) {
      throw new Error(`Line does not contain date info: ${line}`);
    }
    const [, yearStr, monthStr, dayStr, weekday, hourStr, minuteStr, secondStr] = dateMatch;

    const year = parseInt(yearStr);
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);
    const hour24 = parseInt(hourStr);
    const minute = minuteStr;
    const second = secondStr;

    const date = new Date(year, month - 1, day);
    const englishMonth = this.monthNames[date.getMonth()];
    const englishWeekday = this.weekdayMap[weekday];
    const period = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 || 12;

    // Return the formatted date string directly
    return `${englishWeekday}, ${englishMonth} ${day}, ${year} ${hour12}:${minute}:${second} ${period}`;
  }

  protected formatLocalizedString(page: string, location: string, dateStr: string): string {
    const pageStr = page ? `on page ${page} ` : '';
    return `- Your Highlight ${pageStr}| Location ${location} | Added on ${dateStr}`;
  }
}
