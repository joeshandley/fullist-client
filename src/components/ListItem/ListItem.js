import React, { useState } from "react";
import axios from "axios";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import "./ListItem.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ListItem = ({ id, name, deleteItemHandler }) => {
  const [isItemChecked, setIsItemChecked] = useState(false);

  if (!name) {
    name = "";
  }

  return (
    <div id={id} className={`item${isItemChecked ? " item--checked" : ""}`}>
      <img
        className="item__delete"
        src={deleteIcon}
        alt="Delete icon"
        onClick={(e) => {
          deleteItemHandler(e);
        }}
      />
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
        defaultValue="1"
      />
      <div className="item__check-container">
        <input
          className="item__check"
          type="checkbox"
          onClick={() => {
            isItemChecked ? setIsItemChecked(false) : setIsItemChecked(true);
          }}
        />
        <label
          className={`item__name${isItemChecked ? " item__name--checked" : ""}`}
        >
          {name}
        </label>
      </div>
    </div>
  );
};

export default ListItem;
