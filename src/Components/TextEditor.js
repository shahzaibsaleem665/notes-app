import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import logo1 from '../assets/logo1.png';

export const TextEditor = () => {
  const history = useHistory();
  const [state, setState] = useState({ value: "" });
  const quillRef = React.createRef();

  useEffect(() => {
    setState({ value: "" });
  }, []);

  const handleChange = (value) => {
    setState((prev) => ({ ...prev, value }));
  };

  const handleSaveAsPDF = () => {
    const quill = quillRef.current.getEditor();
    const htmlContent = quill.root.innerHTML;

    if (htmlContent) {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
      });

      html2pdf(htmlContent, {
        margin: 15,
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        html2canvas: { scale: 2 },
        callback: (pdf) => {
          pdf.save();
        },
      });

      history.push("/");
    }
  };

  return (
    <div className="textEditor">
      <div className="textEditor__header">
        <img src={logo1} onClick={() => history.push('/')} />
      </div>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        ref={quillRef}
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something to begin...."}
        modules={modules}
        formats={formats}
        style={{ height: "500px" }}
      />
      <Button onClick={handleSaveAsPDF}>Save as Pdf</Button>
    </div>
  );
};

export default TextEditor;
