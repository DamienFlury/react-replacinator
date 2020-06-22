import React from "react";
import "./TagBar.css";

export type Tag = {
  backgroundColor: string;
  color?: string;
  name: string;
};

type Props = {
  tags: Tag[];
  onSelect: (tag: Tag) => void;
};

const TagBar: React.FC<Props> = ({ tags, onSelect }) => {
  return (
    <div className="tagbar-wrapper">
      {tags.map((tag) => (
        <button
          onClick={() => onSelect(tag)}
          type="button"
          className="tagbar-tag"
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
