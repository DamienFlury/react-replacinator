type InnerText = {
  type: "inner-text";
  content: string;
};

type Placeholder = {
  type: "placeholder";
  name: string;
  backgroundColor?: string;
  color?: string;
};

export type Paragraph = {
  type: "paragraph";
  children: (InnerText | Placeholder)[];
};
