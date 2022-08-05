import { useState, useEffect } from "react";
import axios from "axios";
import "react-edit-text/dist/index.css";
import ListNameItem from "../../components/ListNameItem/ListNameItem";

import "./Favourites.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Favourites = () => {
  const [allLists, setAllLists] = useState([]);
  const [sortType, setSortType] = useState("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteListId, setDeleteListId] = useState("");

  const deleteModalDisplayHandler = (e) => {
    if (!isModalOpen) {
      setDeleteListId(e.target.parentNode.id);
    }
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  const deleteListHandler = async (listId) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/lists/${listId}`);
      if (response) {
        console.log(response);
        setIsModalOpen(false);
        setTimeout(() => getLists(), 300);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const getLists = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/lists/favourites`);
      if (response) {
        const lists = response.data.map((list) => {
          return (
            <ListNameItem
              key={list.id}
              list={list}
              deleteModalDisplayHandler={deleteModalDisplayHandler}
            />
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
  }, [sortType]);

  return (
    <main className="favourites">
      <div
        className={`favourites__delete-modal${
          isModalOpen ? "--show" : "--hide"
        }`}
      >
        <div className="favourites__delete-modal-content">
          <h2>Are you sure you want to delete this list?</h2>
          <div className="favourites__delete-modal-buttons">
            <button
              onClick={() => {
                deleteModalDisplayHandler();
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteListHandler(deleteListId);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <nav className="favourites__nav">
        <a className="favourites__nav-item" href="/lists/add">
          + New List
        </a>
        <a className="favourites__nav-item" href="/lists">
          All Lists
        </a>
      </nav>
      <div className="favourites__top">
        <h1 className="favourites__title">Favourites</h1>
        <select
          className="favourites__sort"
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
        className={`favourites__list ${
          sortType === "newest"
            ? "favourites__list--newest"
            : "favourites__list--oldest"
        }`}
      >
        {allLists}
      </div>
    </main>
  );
};

export default Favourites;
