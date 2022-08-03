import axios from "axios";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import List from "../../components/List/List";

import "./MyLists.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const MyLists = () => {
  const getLists = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/lists`);
      console.log(response);
      if (response) {
        return response.data.map((list) => {
          return <p>{list.name}</p>;
        });
      }
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  const lists = getLists();

  return (
    <main className="lists">
      <nav className="lists__nav">
        <a className="lists__nav-item" href="/lists/add">
          + New List
        </a>
        <a className="lists__nav-item" href="/lists/favourites">
          Favourites
        </a>
      </nav>
      <div>{lists}</div>
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
        Add item to list
      </a>
      <List />
    </main>
  );
};

export default MyLists;
