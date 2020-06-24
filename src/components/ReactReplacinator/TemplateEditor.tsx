import React, { useCallback } from "react";
import { Slate, Editable, RenderElementProps, ReactEditor } from "slate-react";
import { Node, Editor } from "slate";
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
  editor: Editor & ReactEditor;
};

const TemplateEditor: React.FC<Props> = ({ value, setValue, editor }) => {
  /* eslint-disable no-param-reassign */
  editor.isInline = (element) => {
    return element.type === "placeholder";
  };
  editor.isVoid = (element) => element.type === "placeholder";
  /* eslint-enable no-param-reassign */

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
      <Editable renderElement={renderElement} />
    </Slate>
  );
};

export default TemplateEditor;
