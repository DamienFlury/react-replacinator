import React, { useState } from "react";
import ReactReplacinator from "./components/ReactReplacinator";
import { Tag } from "./components/ReactReplacinator/TagBar/types";
import { Paragraph } from "./components/ReactReplacinator/ReactReplacinator";

const tags: Tag[] = [
  {
    name: "First Name",
    backgroundColor: "#23aaff",
    color: "#ffffff",
  },
  {
    name: "Last Name",
    backgroundColor: "#ff55aa",
    color: "#ffffff",
  },
  {
    name: "E-Mail",
    backgroundColor: "#ff8800",
  },
  {
    name: "Address",
    backgroundColor: "#44aa11",
  },
];

function App() {
  const [value, setValue] = useState<Paragraph[]>([
    {
      type: "paragraph",
      children: [{ type: "inner-text", content: "" }],
    },
  ]);
  return (
    <ReactReplacinator tags={tags} paragraphs={value} onChange={setValue} />
  );
}

export default App;
