import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TagBar from "./TagBar";
import { Tag } from "./types";

describe("TagBar component", () => {
  it("renders tags correctly", async () => {
    const tags: Tag[] = [
      {
        name: "email",
        backgroundColor: "green",
        color: "lime",
      },
      {
        name: "last name",
        backgroundColor: "blue",
        color: "purple",
      },
    ];

    const handleSelect = jest.fn();

    const result = render(<TagBar />);

    const emailButton = await result.findByText("email");
    const lastNameButton = await result.findByText("last name");

    expect(emailButton).toHaveStyle("background-color: green");
    expect(emailButton).toHaveStyle("color: lime");
    expect(lastNameButton).toHaveStyle("background-color: blue");
    expect(lastNameButton).toHaveStyle("color: purple");
  });

  it("handles onSelect function correctly", async () => {
    const handleSelect = jest.fn();
    const tags: Tag[] = [
      {
        name: "first name",
        backgroundColor: "lime",
        color: "pink",
      },
    ];
    const result = render(<TagBar />);

    const button = await result.findByText("first name");

    fireEvent.mouseDown(button);

    expect(handleSelect).toBeCalledTimes(1);
    expect(handleSelect).toBeCalledWith(tags[0]);
  });
});
