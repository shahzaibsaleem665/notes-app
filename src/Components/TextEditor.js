import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import  { auth,db } from "../utilities/Firebase";

export const TextEditor = () => {
  const [user] = useAuthState(auth);
  const [state, setState] = React.useState({ value: null });
  const [docs, loading] = useCollectionData(
    db.collection(`users/${user?.uid}/documents`).orderBy("createdAt")
  );

  useEffect(() => {
    // Initialize the state with the content of the latest document
    if (docs && docs.length > 0) {
      setState({ value: docs[docs.length - 1].content });
    }
  }, [docs]);

  const handleChange = (value) => {
    setState({ value });
  };

  
  const handleSavePlainText = () => {
    const { value } = state;
    if (value) {
      // Get the desired file name from the user
      const fileName = window.prompt("Enter the file name:", "document.txt");

      // Check if the user canceled or entered an empty name
      if (fileName === null || fileName.trim() === "") {
        return;
      }

      const plainText = value.replace(/<[^>]*>/g, ""); // Remove HTML tags
      const blob = new Blob([plainText], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    }
  };

  const handleSave = () => {
    const { value } = state;

    // Check if a document exists
    const existingDocument = docs && docs.length > 0 ? docs[docs.length - 1] : null;

    if (existingDocument) {
      // Update the existing document with new content
      db.collection(`users/${user?.uid}/documents`).doc(existingDocument.id).update({
        content: value,
        updatedAt: new Date(),
      });
    } else {
      // Create a new document in the Firestore collection
      db.collection(`users/${user?.uid}/documents`).add({
        content: value,
        createdAt: new Date(),
      });
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
      <Button onClick={handleSave}>Save to Firestore</Button>
      <Button onClick={handleSavePlainText}>Save to Local Device</Button>
    </div>
  );
};

export default TextEditor;
