import React, { useState } from "react";
import { Tag } from "./components/ReactReplacinator/TagBar/types";
import { Paragraph } from "./components/ReactReplacinator/ReactReplacinator";
import {
  ReactReplacinator,
  TagBar,
  TemplateEditor,
  TemplatePreview,
} from "./components/ReactReplacinator";

const tags: Tag[] = [
  {
    name: "First Name",
    backgroundColor: "#23aaff",
  },
  {
    name: "Last Name",
    backgroundColor: "#ff55aa",
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
    <ReactReplacinator onChange={setValue} paragraphs={value} tags={tags}>
      <TagBar />
      <TemplateEditor />
      <TemplatePreview />
    </ReactReplacinator>
  );
}

export default App;
