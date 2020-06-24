import React from "react";
import ReactReplacinator from "./components/ReactReplacinator";
import { Tag } from "./components/ReactReplacinator/TagBar/types";

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

function App() {
  return <ReactReplacinator tags={tags} />;
}

export default App;
