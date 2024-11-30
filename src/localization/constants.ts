export const SUPPORTED_LOCALES = {
  JAPANESE: 'ja',
} as const;

// Type for supported locales
export type SupportedLocale = typeof SUPPORTED_LOCALES[keyof typeof SUPPORTED_LOCALES];

// Helper function to check if a locale is supported
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return Object.values(SUPPORTED_LOCALES).includes(locale as SupportedLocale);
}
