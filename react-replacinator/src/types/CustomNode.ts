import { Node } from "slate";

type TextNode = {
  text: string;
};

export type CustomNode = Node &
  (
    | {
        type: "paragraph";
        children: (CustomNode | TextNode)[];
      }
    | {
        type: "placeholder";
        data: {
          text: string;
          color?: string;
          backgroundColor?: string;
        };
        children: TextNode[];
      }
  );
