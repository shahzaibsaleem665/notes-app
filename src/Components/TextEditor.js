import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import  { auth, db } from "../utilities/Firebase";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const TextEditor = () => {
  const history = useHistory();
  const [state, setState] = useState({ value: "", fileName: "document.pdf" }); // Added fileName state
  const [user] = useAuthState(auth);
  const [docs, loading] = useCollectionData(
    db.collection(`Docs/${user?.uid}/documents`).orderBy("createdAt")
  );

  useEffect(() => {
    setState({ value: "", fileName: "document.pdf" }); // Reset fileName when docs change
  }, [docs]);

  const handleChange = (value) => {
    setState((prev) => ({ ...prev, value }));
  };

  const handleSave = () => {
    const { value, fileName } = state;

    // Check if a document exists
    const existingDocument = docs && docs.length > 0 ? docs[docs.length - 1] : null;

    if (existingDocument) {
      // Update the existing document with new content
      db.collection(`Docs/${user?.uid}/documents`).doc(existingDocument.id).set({
        content: value,
        fileName,
        updatedAt: new Date(),
      });
    } else {
      // Create a new document in the Firestore collection
      db.collection(`Docs/${user?.uid}/documents`).add({
        content: value,
        fileName,
        createdAt: new Date(),
      });
    }
  };

  const handleChanges = () => {
    handleSave();
    handleSaveAsPDF();
  };

  const handleSaveAsPDF = () => {
    const { value, fileName } = state;
    if (value) {
      // Prompt the user for the filename and location
      const newFileName = window.prompt("Enter the file name:", fileName);

      // Check if the user canceled or entered an empty name
      if (newFileName === null || newFileName.trim() === "") {
        return;
      }

      setState((prev) => ({ ...prev, fileName: newFileName })); // Update fileName

      // Create a new jsPDF instance
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
      });

      // Convert HTML content to PDF using html2pdf
      html2pdf(value, {
        margin: 10,
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        html2canvas: { scale: 2 }, // adjust scale as needed
        callback: (pdf) => {
          // Save the PDF after conversion
          pdf.save(fileName);
          setState({ value: "", fileName: "document.pdf" }); // Reset state
        },
      });

      // Navigate back to the main page
      history.push("/main");
    }
  };

  return (
    <div className="textEditor">
      <h2>Edit File Name: {state.fileName}</h2>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Start taking notes...."}
        modules={modules}
        formats={formats}
        style={{ height: "500px" }}
      />
      <Button onClick={handleChanges}>Save as Pdf</Button>
    </div>
  );
};

export default TextEditor;
