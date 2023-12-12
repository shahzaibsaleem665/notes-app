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
import logo1 from '../assets/logo1.png'
import firebase from 'firebase/compat/app';

export const TextEditor = () => {
  const history = useHistory();
  const [state, setState] = useState({ value: "", fileName: "document.pdf" });
  const [user] = useAuthState(auth);
  const [docs, loading] = useCollectionData(
    db.collection(`Docs/${user?.uid}/documents`).orderBy("timestamp")
  );

  useEffect(() => {
    setState({ value: "", fileName: "document" });
  }, [docs]);

  const handleChange = (value) => {
    setState((prev) => ({ ...prev, value }));
  };

  const handleFilenameChange = (e) => {
    const newFileName = e.target.value;
    setState((prev) => ({ ...prev, fileName: newFileName }));
  };

  const handleSave = () => {
    const { value, fileName } = state;

    const existingDocument = docs && docs.length > 0 ? docs[docs.length - 1] : null;

    if (existingDocument) {
      db.collection(`Docs/${user?.uid}/documents`).doc(existingDocument.id).set({
        content: value,
        fileName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      db.collection(`Docs/${user?.uid}/documents`).add({
        content: value,
        fileName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  const handleChanges = () => {
   
    handleSaveAsPDF();
    handleSave();
  };

  const handleSaveAsPDF = () => {
    const { value, fileName } = state;

    if (value) {
      const newFileName = window.prompt("Enter the file name:", fileName);

      if (newFileName === null || newFileName.trim() === "") {
        return;
      }

      setState((prev) => ({ ...prev, fileName: newFileName }));

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
      });

      html2pdf(value, {
        margin: 10,
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        html2canvas: { scale: 2 },
        callback: (pdf) => {
          pdf.save(newFileName); // Use the updated filename here
          setState({ value: "", fileName: "document" });
        },
      });

      history.push("/main");
    }
  };

  return (
    <div className="textEditor">
      <div className="textEditor__header">
        <img src={logo1} onClick={() => history.push('/main')} />
      <input
        type="text"
        placeholder={state.fileName}
        value={state.fileName}
        onChange={handleFilenameChange}
      />
      </div>
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
