import React from "react";
import { render } from "@testing-library/react";
import ReactReplacinator from "./ReactReplacinator";
import { Tag } from "./TagBar/types";

describe("ReactReplacinator component", () => {
  it("renders tagbar", () => {
    const tags: Tag[] = [
      {
        name: "First Tag",
        backgroundColor: "green",
        color: "purple",
      },
    ];
    const result = render(<ReactReplacinator tags={tags} />);
  });
});
