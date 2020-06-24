import React, { useState, useMemo } from "react";
import { Node, createEditor } from "slate";
import { withReact } from "slate-react";
import TagBar from "./TagBar";
import { Tag } from "./TagBar/types";
import TemplateEditor from "./TemplateEditor";
import "./ReactReplacinator.css";

type Props = {
  tags: Tag[];
};

const ReactReplacinator: React.FC<Props> = ({ tags }) => {
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const editor = useMemo(() => withReact(createEditor()), []);

  const insertPlaceholder = (tag: Tag) => {
    editor.insertNode({
      type: "placeholder",
      children: [{ text: "" }],
      data: {
        backgroundColor: tag.backgroundColor,
        color: tag.color,
        text: tag.name,
      },
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
