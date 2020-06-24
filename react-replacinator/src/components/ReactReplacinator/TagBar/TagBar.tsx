import React from "react";
import "./TagBar.css";
import { Tag } from "./types";

type Props = {
  tags: Tag[];
  onSelect: (tag: Tag) => void;
};

const TagBar: React.FC<Props> = ({ tags, onSelect }) => {
  return (
    <div className="tagbar-wrapper">
      {tags.map((tag) => (
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            onSelect(tag);
          }}
          type="button"
          className="ReactReplacinator-tag"
          key={tag.name}
          style={{
            backgroundColor: tag.backgroundColor,
            color: tag.color,
          }}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default TagBar;
