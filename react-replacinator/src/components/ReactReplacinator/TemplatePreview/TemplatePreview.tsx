import React from "react";
import { Node } from "slate";

type Props = {
  nodes: Node[];
};

type ChildProps = {
  data: {
    text: string;
  };
};

const TemplatePreview: React.FC<Props> = ({ nodes }) => {
  const renderNodes = () => {
    return nodes.map((node, index) => (
      <React.Fragment key={index}>
        {(node.children as (Node & ChildProps)[]).map((child, childIndex) => {
          if (child.type === "placeholder") {
            return (
              <span
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
  };
  return <div style={{ whiteSpace: "pre-wrap" }}>{renderNodes()}</div>;
};

export default TemplatePreview;
