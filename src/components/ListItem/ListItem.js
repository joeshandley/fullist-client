import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import "./ListItem.scss";

const ListItem = ({ name }) => {
  return (
    <div className="item">
      <EditText
        name="age"
        type="number"
        style={{
          width: "3rem",
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
          id="item1"
          name="item1"
        />
        <label className="item__name">{name}</label>
      </div>
    </div>
  );
};

export default ListItem;
