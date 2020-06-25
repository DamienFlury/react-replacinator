import React from "react";
import { Node } from "slate";

type Props = {
  nodes: Node[];
};

export type ChildProps = {
  data: {
    text: string;
  };
};

const TemplatePreview: React.FC<Props> = ({ nodes }) => {
  const preview = nodes.map((node, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <React.Fragment key={index}>
      {(node.children as (Node & ChildProps)[]).map((child, childIndex) => {
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
