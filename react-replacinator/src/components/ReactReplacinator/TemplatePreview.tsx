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
    return nodes.map((node) => (
      <>
        {(node.children as (Node & ChildProps)[]).map((child) => {
          if (child.type === "placeholder") {
            return (
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {child.data.text}
              </span>
            );
          }
          return child.text;
        })}
        <br />
      </>
    ));
  };
  return <div style={{ whiteSpace: "pre-wrap" }}>{renderNodes()}</div>;
};

export default TemplatePreview;
