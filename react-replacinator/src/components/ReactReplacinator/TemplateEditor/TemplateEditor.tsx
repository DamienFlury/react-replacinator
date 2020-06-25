import React, { useCallback, useContext } from "react";
import { Slate, Editable, RenderElementProps } from "slate-react";
import { ReactReplacinatorContext } from "../ReactReplacinator";

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

const TemplateEditor: React.FC = () => {
  const { editor, editorState, handleChange } = useContext(
    ReactReplacinatorContext
  );

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
    <Slate editor={editor} value={editorState} onChange={handleChange}>
      <Editable
        renderElement={renderElement}
        className="ReactReplacinator-template-editor"
      />
    </Slate>
  );
};

export default TemplateEditor;
