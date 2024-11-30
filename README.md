# kindle-localizer

Kindle-localizer is a command-line tool that localizes Kindle clippings exported from devices in different languages into English. It parses the clippings file and converts date formats, page numbers, and location information into a consistent English format.

This project was written entirely via [Aider](https://github.com/paulgauthier/aider), an AI-powered coding assistant.

## Features

- Parses Kindle clippings exported in Japanese.
- Localizes page numbers, location ranges, and dates into English.
- Supports a plugin architecture for adding more languages.

## Prerequisites

- [Bun](https://bun.sh) - A fast all-in-one JavaScript runtime.

## Installation

First, ensure you have Bun installed. If not, you can install it from the [official website](https://bun.sh).

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd kindle-localizer
```

Install the dependencies:

```bash
bun install
```

## Usage

To run the localizer, use the following command:

```bash
bun run index.ts <inputFilePath> <languageCode>
```

- `<inputFilePath>`: Path to the `.txt` clippings file exported from your Kindle device.
- `<languageCode>`: Language code of the clippings file (e.g., `ja` for Japanese).

Example:

```bash
bun run index.ts my_clippings.txt ja
```

This will generate a new file named `my_clippings_localized.txt` with the localized content.

## Supported Languages

- **Japanese (`ja`)**

The tool uses a localization strategy pattern, allowing support for multiple languages. Currently, only Japanese is supported, but contributions are welcome to add more languages.

## Running Tests

To run the test suite:

```bash
bun test
```

This will execute the tests defined in `index.test.ts`, ensuring that the localization functions work as expected.

## Project Structure

- `index.ts`: The main entry point of the application.
- `localization/`: Directory containing localization strategies and related interfaces.
  - `LocalizationStrategy.ts`: Interface defining the structure for localization strategies.
  - `BaseLocalizationStrategy.ts`: Abstract class providing a base implementation.
  - `LocalizationFactory.ts`: Factory class to instantiate the appropriate localization strategy based on the language code.
  - `plugins/`: Directory containing implementations for specific languages.
    - `JapaneseLocalization.ts`: Localization strategy for Japanese clippings.
- `index.test.ts`: Test suite for the localization functions.

## Extending to Other Languages

To add support for another language:

1. **Create a New Localization Strategy**:

   - Add a new file in the `localization/plugins/` directory, e.g., `SpanishLocalization.ts`.
   - Implement the `BaseLocalizationStrategy` abstract class.

2. **Update the Localization Factory**:

   - Modify `LocalizationFactory.ts` to include your new strategy.

     ```typescript
     import SpanishLocalization from './plugins/SpanishLocalization';

     // ...

     switch (languageCode) {
       case 'es':
         return new SpanishLocalization();
       // ...
     }
     ```

3. **Add Test Cases**:

   - Create test cases in `index.test.ts` to ensure your localization strategy works correctly.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

[MIT](LICENSE)

---

*This project was developed entirely using [Aider](https://github.com/paulgauthier/aider), an AI-powered coding assistant that streamlines the development process.*
