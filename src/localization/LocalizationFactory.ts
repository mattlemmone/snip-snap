import { LocalizationStrategy } from './LocalizationStrategy';
import JapaneseLocalization from './plugins/JapaneseLocalization';
// Import other localization strategies as needed

export class LocalizationFactory {
  static getLocalizationStrategy(languageCode: string): LocalizationStrategy {
    switch (languageCode) {
      case 'ja':
        return new JapaneseLocalization();
      // Add cases for other languages
      // case 'es':
      //   return new SpanishLocalization();
      default:
        throw new Error(`Unsupported language code: ${languageCode}`);
    }
  }
}
