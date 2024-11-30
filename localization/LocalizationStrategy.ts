export interface LocalizationStrategy {
  languageCode: string;
  localizeClipping(line: string): string;
}
