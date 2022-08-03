import { useState, useEffect } from "react";
import axios from "axios";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import List from "../List/List";

import "./MyLists.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const MyLists = () => {
  const [allLists, setAllLists] = useState([]);

  const getLists = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/lists`);
      if (response) {
        const lists = response.data.map((list) => {
          return (
            <a key={list.id} href={`/lists/${list.id}`}>
              <h2>{list.name}</h2>
            </a>
          );
        });
        setAllLists(lists);
      }
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

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
      <div>{allLists}</div>
    </main>
  );
};

export default MyLists;
