// Chakra imports
import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const CustomButton = () => <span className="octicon octicon-star" />;


function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

const CustomToolbar = () => (
  <Box
    id="toolbar"
    borderTopStartRadius="15px"
    borderTopEndRadius="15px"
    borderBottom="0px solid transparent !important"
  >
    <select
      className="ql-header"
      defaultValue={""}
      onChange={(e) => e.persist()}
    >
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option selected></option>
    </select>
    <Button
      display="flex !important"
      justifyContent="center !important"
      alignItems="center !important"
      me="5px !important"
      className="ql-bold"
    ></Button>
    <Button
      display="flex !important"
      justifyContent="center !important"
      alignItems="center !important"
      me="5px !important"
      className="ql-italic"
    ></Button>
    <Button
      display="flex !important"
      justifyContent="center !important"
      alignItems="center !important"
      me="5px !important"
      className="ql-underline"
    ></Button>
    <Button
      display="flex !important"
      justifyContent="center !important"
      alignItems="center !important"
      me="5px !important"
      className="ql-list"
      value="ordered"
    ></Button>
    <Button
      display="flex !important"
      justifyContent="center !important"
      alignItems="center !important"
      className="ql-list"
      value="bullet"
    ></Button>
  </Box>
);

export default class Editor extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = { editorHtml: this.props.value };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event);
  }

  render() {
    
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          value={this.props.value}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
        />
      </div>
    );
  }
}

Editor.modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }, "link"]
  ],
  clipboard: {
    matchVisual: false
  }
};

Editor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertStar: insertStar
    }
  },
  clipboard: {
    matchVisual: false
  }
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color"
];
