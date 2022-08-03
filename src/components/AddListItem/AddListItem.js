import React, { useState } from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import "./AddListItem.scss";

const AddListItem = () => {
  return (
    <div className="add-item">
      <EditText
        name="age"
        type="number"
        style={{
          width: "3rem",
          backgroundColor: "#fbfbfb",
          border: "1px solid #1c0f13",
          borderRadius: "5px",
          textAlign: "center",
        }}
        defaultValue=""
      />
      <input
        className="add-item__name"
        type="text"
        placeholder="Enter item name"
        onBlur={() => {
          // Add function to change this component to a ListItem -- pass down function as prop from List.js
        }}
      />
    </div>
  );
};

export default AddListItem;
