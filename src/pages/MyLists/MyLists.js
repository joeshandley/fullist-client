import { useState, useEffect } from "react";
import axios from "axios";
import "react-edit-text/dist/index.css";
import ListNameItem from "../../components/ListNameItem/ListNameItem";

import "./MyLists.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const MyLists = () => {
  const [allLists, setAllLists] = useState([]);
  const [sortType, setSortType] = useState("newest");

  const getLists = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/lists`);
      if (response) {
        const lists = response.data.map((list) => {
          return <ListNameItem key={list.id} list={list} />;
        });
        setAllLists(lists);
      }
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  useEffect(() => {
    getLists();
  }, [sortType]);

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
      <div className="lists__top">
        <h1 className="lists__title">My Lists</h1>
        <select
          className="lists__sort"
          onChange={(e) => {
            setSortType(e.target.value);
          }}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          {/* <option value="alphabetical">Alphabetical</option> */}
        </select>
      </div>
      <div
        className={`lists__list ${
          sortType === "newest" ? "lists__list--newest" : "lists__list--oldest"
        }`}
      >
        {allLists}
      </div>
    </main>
  );
};

export default MyLists;
