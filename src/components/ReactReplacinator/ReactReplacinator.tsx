import React, { useState } from "react";
import { Node } from "slate";
import TagBar from "./TagBar";
import { Tag } from "./TagBar/types";
import TemplateEditor from "./TemplateEditor";

type Props = {
  tags: Tag[];
};

const ReactReplacinator: React.FC<Props> = ({ tags }) => {
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  return (
    <>
      <TagBar
        tags={tags}
        onSelect={(tag) => {
          console.log(tag.name);
        }}
      />
      <TemplateEditor value={value} setValue={setValue} />
    </>
  );
};

export default ReactReplacinator;
