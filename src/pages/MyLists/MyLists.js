import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";

import "./MyLists.scss";

const MyLists = () => {
  return (
    <main className="lists">
      <nav className="lists__nav">
        <a className="lists__nav-item" href="/lists/add">
          + New List
        </a>
        <a className="lists__nav-item" href="/lists/favourites">
          Favourites
        </a>
        <a className="lists__nav-item" href="/lists/all">
          Previous Lists
        </a>
      </nav>
      <div className="lists__name-container">
        <EditText
          name="list-name"
          placeholder="Enter your list name"
          style={{ width: "20rem" }}
          editButtonProps={{
            style: {
              marginLeft: "5px",
              backgroundColor: "#fbfbfb",
              fill: "#1c0f13",
            },
          }}
          showEditButton
        />
      </div>
      <a href="/lists/search" className="lists__add">
        Add item
      </a>
      <div className="lists__item">
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
        <div className="lists__item-check-container">
          <input
            className="lists__item-check"
            type="checkbox"
            id="item1"
            name="item1"
          />
          <label className="lists__item-name">Apple</label>
        </div>
      </div>
    </main>
  );
};

export default MyLists;
