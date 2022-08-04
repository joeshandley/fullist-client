import React, { useState, useEffect } from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import "./AddListItem.scss";

const AddListItem = ({ addItemHandler, isAddingItem }) => {
  const [itemText, setItemText] = useState("");

  useEffect(() => {
    if (!isAddingItem) {
      setItemText("");
    }
  }, [isAddingItem]);

  const handleChange = (e) => {
    setItemText(e.target.value);
  };

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
        name="itemName"
        placeholder="Enter item name"
        value={itemText}
        style={{ margin: "0 2.8rem 0 2rem" }}
        onChange={(e) => handleChange(e)}
        onSave={(e) => addItemHandler(e)}
      />
    </div>
  );
};

export default AddListItem;
