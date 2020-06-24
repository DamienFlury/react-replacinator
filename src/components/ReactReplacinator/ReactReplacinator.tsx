import React, { useState } from "react";
import { Node } from "slate";
import TagBar from "./TagBar";
import { Tag } from "./TagBar/types";
import TemplateEditor from "./TemplateEditor";

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
];

const ReactReplacinator: React.FC = () => {
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [{ text: "This is a paragraph" }],
    },
  ]);
  return (
    <>
      <TagBar
        tags={tags}
        onSelect={(tag) => {
          console.log(tag.name);
        }}
      />
      <TemplateEditor value={value} setValue={setValue} />
    </>
  );
};

export default ReactReplacinator;
