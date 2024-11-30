import { LocalizationStrategy } from './LocalizationStrategy';
import JapaneseLocalization from './plugins/JapaneseLocalization';
import { SUPPORTED_LOCALES, isSupportedLocale } from './constants';

export class LocalizationFactory {
  static getLocalizationStrategy(languageCode: string): LocalizationStrategy {
    if (!isSupportedLocale(languageCode)) {
      throw new Error(`Unsupported language code: ${languageCode}`);
    }

    switch (languageCode) {
      case SUPPORTED_LOCALES.JAPANESE:
        return new JapaneseLocalization();
      default:
        throw new Error(`Implementation missing for supported language code: ${languageCode}`);
    }
  }
}
