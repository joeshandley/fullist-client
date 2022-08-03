import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import List from "../../components/List/List";

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
      <List />
    </main>
  );
};

export default MyLists;
