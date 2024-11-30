import { LocalizationStrategy } from './LocalizationStrategy';

export abstract class BaseLocalizationStrategy implements LocalizationStrategy {
  languageCode: string;

  constructor(languageCode: string) {
    this.languageCode = languageCode;
  }

  public localizeClipping(line: string): string {
    // Handle the clip limit message in a common way
    if (this.isClipLimitMessage(line)) {
      return line.replace(/<.*>/, '<You have reached the clipping limit for this item>');
    }

    // Check if the line should be localized
    if (!this.isLocalizable(line)) {
      return line;
    }

    // Parse components
    const page = this.parsePage(line);
    const location = this.parseLocation(line);
    const dateStr = this.parseDate(line);

    // Format the localized string
    return this.formatLocalizedString(page, location, dateStr);
  }

  // Methods to be implemented by subclasses
  protected abstract isClipLimitMessage(line: string): boolean;
  protected abstract isLocalizable(line: string): boolean;
  protected abstract parsePage(line: string): string;
  protected abstract parseLocation(line: string): string;
  protected abstract parseDate(line: string): string;
  protected abstract formatLocalizedString(page: string, location: string, dateStr: string): string;
}
