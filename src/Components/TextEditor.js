import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import  { auth,db } from "../utilities/Firebase";
import jsPDF from "jspdf";
import  html2pdf  from "html2pdf.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



export const TextEditor = () => {

  const history = useHistory();
  const [user] = useAuthState(auth);
  const [state, setState] = React.useState({ value: null });
  const [docs, loading] = useCollectionData(
    db.collection(`users/${user?.uid}/documents`).orderBy("createdAt")
  );

  useEffect(() => {
    // Initialize the state with the content of the latest document
    if (docs && docs.length > 0) {
      setState({ value: docs[docs.length - 1].content });
    } else {
      setState({value: ""});
    }
  }, [docs]);

  const handleChange = (value) => {
    setState({ value });
  };
 



  const handleSaveAsPDF = () => {
    const { value } = state;
    if (value) {
      // Prompt the user for the filename and location
      const fileName = window.prompt("Enter the file name:", "document.pdf");
  
      // Check if the user canceled or entered an empty name
      if (fileName === null || fileName.trim() === "") {
        return;
      }
  
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
        },
      });
    }
    setState({ value: "" });
    // Navigate back to the main page
    history.push("/main");
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
      <Button onClick={handleSaveAsPDF}>Save as Pdf</Button>
    </div>
  );
};

export default TextEditor;
