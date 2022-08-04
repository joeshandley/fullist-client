import React, { useState } from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import "./AddListItem.scss";

const AddListItem = ({ addItemHandler }) => {
  return (
    <div className="add-item">
      <EditText
        name="quantity"
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
      <EditText
        className="add-item__name"
        name="addItem"
        placeholder="Enter item name"
        onSave={(e) => addItemHandler(e)}
      />
    </div>
  );
};

export default AddListItem;
