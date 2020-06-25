import React, { useCallback } from "react";
import { Slate, Editable, RenderElementProps, ReactEditor } from "slate-react";
import { Node, Editor } from "slate";

const DefaultElement: React.FC<RenderElementProps> = (props) => {
  return <div {...props.attributes}>{props.children}</div>;
};

const PlaceholderElement: React.FC<RenderElementProps> = (props) => {
  return (
    <span
      className="ReactReplacinator-tag"
      style={{
        backgroundColor: (props.element.data as any).backgroundColor,
        color: (props.element.data as any).color,
      }}
      {...props.attributes}
    >
      {props.children}
      {(props.element.data as any).text}
    </span>
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
      <Editable
        renderElement={renderElement}
        className="ReactReplacinator-template-editor"
      />
    </Slate>
  );
};

export default TemplateEditor;