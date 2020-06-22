import React from "react";
import TagBar, { Tag } from "./TagBar";

const tags: Tag[] = [
  {
    name: "First Name",
    backgroundColor: "#23aaff",
    color: "#ffffff",
  },
  {
    name: "Last Name",
    backgroundColor: "#ff55aa",
    color: "#ffffff",
  },
];

const ReactReplacinator: React.FC = () => {
  return (
    <>
      <TagBar
        tags={tags}
        onSelect={(tag) => {
          console.log(tag.name);
        }}
      />
    </>
  );
};

export default ReactReplacinator;
