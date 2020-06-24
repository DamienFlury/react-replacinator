import React, { useState, useMemo } from "react";
import { Node, createEditor } from "slate";
import TagBar from "./TagBar";
import { Tag } from "./TagBar/types";
import TemplateEditor from "./TemplateEditor";
import { withReact } from "slate-react";

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

  const editor = useMemo(() => withReact(createEditor()), []);

  const insertPlaceholder = (tag: Tag) => {
    editor.insertNode({
      type: "placeholder",
      children: [{ text: "" }],
      data: { color: tag.backgroundColor, text: tag.name },
    });
    editor.insertText("");
  };

  return (
    <>
      <TagBar
        tags={tags}
        onSelect={(tag) => {
          insertPlaceholder(tag);
        }}
      />
      <TemplateEditor value={value} setValue={setValue} editor={editor} />
    </>
  );
};

export default ReactReplacinator;
