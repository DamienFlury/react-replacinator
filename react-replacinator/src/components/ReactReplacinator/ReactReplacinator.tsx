import React, { useMemo, useCallback } from "react";
import { createEditor, Editor, Node } from "slate";
import { withReact, ReactEditor } from "slate-react";
import { Tag } from "./TagBar/types";
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

type State = {
  editor: Editor & ReactEditor;
  editorState: CustomNode[];
  tags: Tag[];
  handleChange: (value: Node[]) => void;
  insertPlaceholder: (tag: Tag) => void;
};

export const ReactReplacinatorContext = React.createContext<State>({
  editor: withReact(createEditor()),
  editorState: [],
  tags: [],
  handleChange: () => {},
  insertPlaceholder: () => {},
});

type Props = {
  tags: Tag[];
  paragraphs: Paragraph[];
  onChange: React.Dispatch<React.SetStateAction<Paragraph[]>>;
};
const ReactReplacinator: React.FC<Props> = ({
  children,
  paragraphs,
  tags,
  onChange,
}) => {
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
    editor.insertText("");
  };

  const state: State = {
    editor,
    editorState,
    tags,
    handleChange,
    insertPlaceholder,
  };

  return (
    <ReactReplacinatorContext.Provider value={state}>
      {children}
    </ReactReplacinatorContext.Provider>
  );
};

export default ReactReplacinator;
