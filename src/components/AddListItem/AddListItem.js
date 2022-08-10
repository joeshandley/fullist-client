import React, { useState, useEffect } from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import VariableDelete from "../VariableDelete/VariableDelete";
import "./AddListItem.scss";

const AddListItem = ({ addItemHandler, isAddingItem, deleteHandler }) => {
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
      <VariableDelete deleteHandler={deleteHandler} />
      <EditText
        className="add-item__name"
        name="itemName"
        placeholder="Enter item name"
        value={itemText}
        style={{ margin: "0 2.8rem 0 5rem", minHeight: "3.75rem" }}
        inputClassName="add-item__name-input"
        onChange={(e) => handleChange(e)}
        onSave={(e) => addItemHandler(e)}
      />
    </div>
  );
};

export default AddListItem;
