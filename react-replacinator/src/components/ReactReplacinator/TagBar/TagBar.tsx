import React, { useContext } from "react";
import { ReactReplacinatorContext } from "../ReactReplacinator";

const TagBar: React.FC = () => {
  const { tags, insertPlaceholder } = useContext(ReactReplacinatorContext);

  return (
    <div className="ReactReplacinator-tag-bar">
      {tags.map((tag) => (
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            insertPlaceholder(tag);
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
