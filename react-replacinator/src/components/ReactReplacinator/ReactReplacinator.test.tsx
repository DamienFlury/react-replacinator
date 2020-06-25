import React from "react";
import {
  mapParagraphsToSlateState,
  mapSlateStateToParagraphs,
} from "./ReactReplacinator";
import { Paragraph, CustomNode } from "../../types";

describe("ReactReplacinator", () => {
  it("should map paragraphs to slate state", () => {
    const input: Paragraph[] = [
      {
        type: "paragraph",
        children: [
          { type: "inner-text", content: "test" },
          { type: "placeholder", name: "test" },
          { type: "inner-text", content: "" },
        ],
      },
    ];

    const expected: CustomNode[] = [
      {
        type: "paragraph",
        children: [
          { text: "test" },
          {
            type: "placeholder",
            children: [{ text: "" }],
            data: {
              text: "test",
            },
          },
          { text: "" },
        ],
      },
    ];

    const result = mapParagraphsToSlateState(input);
    expect(result).toMatchObject(expected);
  });
});

describe("ReactReplacinator", () => {
  it("should map slate state to paragraphs", () => {
    const input: CustomNode[] = [
      {
        type: "paragraph",
        children: [
          { text: "test" },
          {
            type: "placeholder",
            children: [{ text: "" }],
            data: {
              text: "test",
            },
          },
          { text: "" },
        ],
      },
    ];

    const expected: Paragraph[] = [
      {
        type: "paragraph",
        children: [
          { type: "inner-text", content: "test" },
          { type: "placeholder", name: "test" },
          { type: "inner-text", content: "" },
        ],
      },
    ];
    const result = mapSlateStateToParagraphs(input);
    expect(result).toMatchObject(expected);
  });
});
