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
      <EditText
        name="list-name"
        defaultValue="Enter your list name"
        editButtonProps={{ style: { marginLeft: "5px" } }}
        showEditButton
      />
    </main>
  );
};

export default MyLists;
