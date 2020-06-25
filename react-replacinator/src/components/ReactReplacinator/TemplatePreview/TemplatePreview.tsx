import React, { useContext } from "react";
import { ReactReplacinatorContext } from "../ReactReplacinator";
import { CustomNode } from "../../../types";

const TemplatePreview: React.FC = () => {
  const { editorState } = useContext(ReactReplacinatorContext);

  const preview = editorState.map((node, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <React.Fragment key={index}>
      {(node.children as CustomNode[]).map((child, childIndex) => {
        if (child.type === "placeholder") {
          return (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={childIndex}
              style={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              {child.data.text}
            </span>
          );
        }
        return child.text;
      })}
      <br />
    </React.Fragment>
  ));
  return <div style={{ whiteSpace: "pre-wrap" }}>{preview}</div>;
};

export default TemplatePreview;
