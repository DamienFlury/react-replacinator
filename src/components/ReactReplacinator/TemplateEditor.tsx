import React, { useMemo, useCallback } from "react";
import { Slate, Editable, withReact, RenderElementProps } from "slate-react";
import { createEditor, Node } from "slate";
import "./TemplateEditor.css";

const DefaultElement: React.FC<RenderElementProps> = (props) => {
  return <span {...props.attributes}>{props.children}</span>;
};

const PlaceholderElement: React.FC<RenderElementProps> = (props) => {
  return (
    <button
      type="button"
      contentEditable={false}
      className="MyEditor-placeholder"
      onClick={(e) => {
        e.preventDefault();
      }}
      style={{ backgroundColor: (props.element.data as any).color }}
      {...props.attributes}
    >
      {(props.element.data as any).text}
    </button>
  );
};

type Props = {
  value: Node[];
  setValue: React.Dispatch<React.SetStateAction<Node[]>>;
};

const TemplateEditor: React.FC<Props> = ({ value, setValue }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  editor.isInline = (element) => {
    return element.type === "placeholder";
  };
  editor.isVoid = (element) => element.type === "placeholder";

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "placeholder":
        return <PlaceholderElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <button
        type="button"
        onMouseDown={(event) => {
          event.preventDefault();
          editor.insertNode({
            type: "placeholder",
            children: [{ text: "" }],
            data: { color: "#aaffaa", text: "First Name" },
          });
          editor.insertNode({
            type: "paragraph",
            children: [{ text: "" }],
          });
        }}
      >
        First Name
      </button>
      <Editable renderElement={renderElement} />
    </Slate>
  );
};

export default TemplateEditor;
