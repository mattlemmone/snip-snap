# snip-snap


Snip-snap is a command-line tool that localizes Kindle clippings exported from devices in different languages into English. It parses the clippings file and converts date formats, page numbers, and location information into a consistent English format.

This project was written entirely via [Aider](https://github.com/paulgauthier/aider), an AI-powered coding assistant.

https://github.com/user-attachments/assets/8d56b8c1-ea3b-4cd3-81ca-d04f61cf2007


## Note: AI Coding Experiment
This is an experiment where I'm limiting myself to using only AI tools to write and improve code in an effort to improve how I think and work with AI tools.

I started with a problem I had: using my Kindle in Japanese and English led to both languages used in 'My Clippings.txt', where highlights are stored. This is a problem when the services I use to parse the highlights support only English formats. This section in the README is the only part of the codebase written by hand.

### Contributions

I welcome contributions, fixes, new languages, and requests to localize into languages beyond English. Although not a requirement, I'd like to challenge you to use AI as well in your contributions - let's see how far we can go ✨

## Features

- Parses Kindle clippings exported in Japanese.
- Localizes page numbers, location ranges, and dates into English.
- Supports a plugin architecture for adding more languages.

**Note:** Currently, the tool assumes that all clippings will be localized into English. Support for other target languages may be added in the future.

## Usage

To run the localizer, use the following command:

```bash
bun run src/index.ts <inputFilePath> <languageCode>
```

- `<inputFilePath>`: Path to the `.txt` clippings file exported from your Kindle device.
- `<languageCode>`: Language code of the clippings file (e.g., `ja` for Japanese).

Example:

```bash
bun run index.ts my_clippings.txt ja
```

This will generate a new file named `my_clippings_localized.txt` with the localized content.

### Sample Input/Output

Input (`examples/My Clippings.txt`):
```
How to Take Smart Notes: One Simple Technique to Boost Writing, Learning and Thinking (Ahrens, Sönke)
- 55ページ|位置No. 863-865のハイライト |作成日: 2024年1月9日火曜日 23:25:35

The same goes for writing permanent notes, which have another feedback loop built-in: Expressing our own thoughts in writing makes us realise if we really thought them through. The moment we try to combine them with previously written notes, the system will unambiguously show us contradictions, inconsistencies and repetitions.
==========
```

Output (`examples/My Clippings_localized.txt`):
```
How to Take Smart Notes: One Simple Technique to Boost Writing, Learning and Thinking (Ahrens, Sönke)
- Your Highlight on page 55 | Location 863-865 | Added on Tuesday, January 9, 2024 11:25:35 PM

The same goes for writing permanent notes, which have another feedback loop built-in: Expressing our own thoughts in writing makes us realise if we really thought them through. The moment we try to combine them with previously written notes, the system will unambiguously show us contradictions, inconsistencies and repetitions.
==========
```

This example is taken directly from the examples directory and shows a real transformation performed by the tool. It demonstrates the localization of page numbers, location information, and date/time formatting from Japanese to English.

## Prerequisites

- [Bun](https://bun.sh) - A fast all-in-one JavaScript runtime.

## Installation

First, ensure you have Bun installed. If not, you can install it from the [official website](https://bun.sh).

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd snip-snap
```

Install the dependencies:

```bash
bun install
```

## Supported Languages

- **Japanese (`ja`)**

The tool uses a localization strategy pattern, allowing support for multiple languages. Currently, only Japanese is supported, but contributions are welcome to add more languages.

## Running Tests

To run the test suite:

```bash
bun test
```

This will execute the tests defined in `index.test.ts`, ensuring that the localization functions work as expected.


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

## License

[MIT](LICENSE)


