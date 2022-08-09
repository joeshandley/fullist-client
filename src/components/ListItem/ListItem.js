import React, { useState } from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import VariableDelete from "../VariableDelete/VariableDelete";
import "./ListItem.scss";

const ListItem = ({
  id,
  quantity,
  name,
  editItemHandler,
  deleteItemHandler,
}) => {
  const [isItemChecked, setIsItemChecked] = useState(false);

  if (!name) {
    name = "";
  }

  return (
    <div id={id} className={`item${isItemChecked ? " item--checked" : ""}`}>
      <VariableDelete deleteHandler={deleteItemHandler} />
      <EditText
        name="quantity"
        type="number"
        defaultValue={quantity.toString()}
        onSave={(e) => {
          editItemHandler(e, id);
        }}
        style={{
          width: "3.4rem",
          backgroundColor: "#fbfbfb",
          border: "1px solid #1c0f13",
          borderRadius: "5px",
          textAlign: "center",
        }}
      />
      <div className="item__check-container">
        <EditText
          className={`item__name${isItemChecked ? " item__name--checked" : ""}`}
          name="itemName"
          type="text"
          defaultValue={name}
          onSave={(e) => {
            editItemHandler(e, id);
          }}
          style={{
            borderRadius: "5px",
          }}
        />
        <input
          className="item__check"
          name="itemName"
          type="checkbox"
          onClick={() => {
            setIsItemChecked(!isItemChecked);
          }}
        />
      </div>
    </div>
  );
};

export default ListItem;
