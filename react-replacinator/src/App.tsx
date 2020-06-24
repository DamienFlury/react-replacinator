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
  {
    name: "E-Mail",
    backgroundColor: "#ff8800",
  },
  {
    name: "Address",
    backgroundColor: "#44aa11",
  },
];

function App() {
  return <ReactReplacinator tags={tags} />;
}

export default App;
