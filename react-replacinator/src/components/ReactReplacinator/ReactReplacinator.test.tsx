import React from "react";
import { mapParagraphsToSlateState } from "./ReactReplacinator";
import { Paragraph, CustomNode } from "../../types";
import { Node } from "slate";

describe("ReactReplacinator", () => {
  it("should map paragraphs to slate state", () => {
    const input: Paragraph[] = [
      {
        type: "paragraph",
        children: [
          { type: "inner-text", content: "test" },
          { type: "placeholder", name: "test" },
        ],
      },
    ];

    const expected: CustomNode[] = [
      {
        type: "paragraph",
        children: [
          {
            type: "paragraph",
            children: [{ text: "test" }],
          },
          {
            type: "placeholder",
            children: [{ text: "" }],
            data: {
              text: "test",
            },
          },
        ],
      },
    ];

    const result = mapParagraphsToSlateState(input);
    expect(result).toMatchObject(expected);
  });
});
