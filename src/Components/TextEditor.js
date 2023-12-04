import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import { Button } from "@mui/material";

export const TextEditor = () => {
  const [state, setState] = React.useState({ value: null });

  const handleChange = (value) => {
    setState({ value });
  };

  const handleSavePlainText = () => {
    const { value } = state;
    if (value) {
      const plainText = value.replace(/<[^>]*>/g, ""); // Remove HTML tags
      const blob = new Blob([plainText], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "document.txt";
      link.click();
    }
  };

  return (
    <div className="textEditor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
        style={{ height: "500px" }}
      />
      <Button onClick={handleSavePlainText}>Save as Plain Text</Button>
    </div>
  );
};

export default TextEditor;
