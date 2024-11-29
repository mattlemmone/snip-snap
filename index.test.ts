import { expect, test, describe } from "bun:test";
import { localizeClipping } from "./index";

describe("Kindle clipping localization", () => {
  const testCases = [
    {
      description: "standard format with location range",
      input: "- 4ページ|位置No. 685-687のハイライト |作成日: 2024年10月28日月曜日 14:01:21",
      expected: "- Your Highlight on page 4 | Location 685-687 | Added on Monday, October 28, 2024 2:01:21 PM"
    },
    {
      description: "clipping limit reached message",
      input: "<このアイテムのクリップの上限に達しました>",
      expected: "<You have reached the clipping limit for this item>"
    },
    {
      description: "no page number with location range",
      input: "- 位置No. 92-94のハイライト |作成日: 2024年2月26日月曜日 0:13:25",
      expected: "- Your Highlight | Location 92-94 | Added on Monday, February 26, 2024 12:13:25 AM"
    },
    {
      description: "standard format with different numbers",
      input: "- 15ページ|位置No. 1240-1242のハイライト |作成日: 2024年10月28日月曜日 14:02:00",
      expected: "- Your Highlight on page 15 | Location 1240-1242 | Added on Monday, October 28, 2024 2:02:00 PM"
    },
    {
      description: "roman numeral format with のハイライト",
      input: "- xiiiページ|位置No. 186-188のハイライト |作成日: 2024年2月1日木曜日 14:09:33",
      expected: "- Your Highlight on page xiii | Location 186-188 | Added on Thursday, February 1, 2024 2:09:33 PM"
    },
    {
      description: "single location number",
      input: "- 23ページ|位置No. 1442のハイライト |作成日: 2024年10月28日月曜日 14:03:15",
      expected: "- Your Highlight on page 23 | Location 1442 | Added on Monday, October 28, 2024 2:03:15 PM"
    },
    {
      description: "standard format with location range and early morning time",
      input: "- 74ページ|位置No. 1170-1172のハイライト |作成日: 2024年1月9日火曜日 9:55:42",
      expected: "- Your Highlight on page 74 | Location 1170-1172 | Added on Tuesday, January 9, 2024 9:55:42 AM"
    }
  ];

  test("should localize different Japanese page/location formats to English", () => {
    testCases.forEach(({ description, input, expected }) => {
      expect(localizeClipping(input)).toBe(expected);
    });
  });
});
