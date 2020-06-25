import React, { useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import TagBar from "./TagBar";
import { Tag } from "./TagBar/types";
import TemplateEditor from "./TemplateEditor";
import TemplatePreview from "./TemplatePreview";
import "./ReactReplacinator.css";
import { CustomNode } from "./CustomNode";

type Placeholder = {
  type: "placeholder";
  name: string;
  backgroundColor?: string;
  color?: string;
};

type InnerText = {
  type: "inner-text";
  content: string;
};

export type Paragraph = {
  type: "paragraph";
  children: (InnerText | Placeholder)[];
};

type Props = {
  tags: Tag[];
  paragraphs: Paragraph[];
  onChange: React.Dispatch<React.SetStateAction<Paragraph[]>>;
};

const mapParagraphsToSlateState = (paragraphs: Paragraph[]): CustomNode[] =>
  paragraphs.map((paragraph) => ({
    type: "paragraph",
    children: paragraph.children.map((child) => {
      if (child.type === "inner-text") {
        return { text: child.content };
      }
      const { backgroundColor, color, name } = child;
      return {
        type: "placeholder",
        children: [{ text: "" }],
        data: { text: name, backgroundColor, color },
      };
    }),
  }));

const mapSlateStateToParagraphs = (nodes: CustomNode[]): Paragraph[] =>
  nodes.map((node) => ({
    type: "paragraph",
    children: (node.children as CustomNode[]).map((child) => {
      if (child.type === "placeholder") {
        return {
          type: "placeholder",
          name: child.data.text,
          color: child.data.color,
          backgroundColor: child.data.backgroundColor,
        };
      }
      return {
        type: "inner-text",
        content: child.text as string,
      };
    }),
  }));

const ReactReplacinator: React.FC<Props> = ({ tags, paragraphs, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const editorState = useMemo(() => mapParagraphsToSlateState(paragraphs), [
    paragraphs,
  ]);

  const handleChange = useCallback(
    (value) => onChange(mapSlateStateToParagraphs(value)),
    [onChange]
  );

  const insertPlaceholder = (tag: Tag) => {
    editor.insertText("");
    editor.insertNode({
      type: "placeholder",
      children: [{ text: "" }],
      data: {
        backgroundColor: tag.backgroundColor,
        color: tag.color,
        text: tag.name,
      },
    });
    editor.insertText(" ");
  };

  return (
    <div className="ReactReplacinator">
      <TagBar
        tags={tags}
        onSelect={(tag) => {
          insertPlaceholder(tag);
        }}
      />
      <TemplateEditor
        value={editorState}
        onChange={handleChange}
        editor={editor}
      />
      <TemplatePreview nodes={editorState} />
    </div>
  );
};

export default ReactReplacinator;
