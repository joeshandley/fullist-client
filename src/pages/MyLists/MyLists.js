import { useState, useEffect } from "react";
import axios from "axios";
import "react-edit-text/dist/index.css";
import ListNameItem from "../../components/ListNameItem/ListNameItem";

import "./MyLists.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const MyLists = () => {
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
      const response = await axios.get(`${BACKEND_URL}/lists`);
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
    <main className="lists">
      <div
        className={`lists__delete-modal${isModalOpen ? "--show" : "--hide"}`}
      >
        <div className="lists__delete-modal-content">
          <h2 className="lists__delete-modal-title">
            Are you sure you want to delete this list?
          </h2>
          <div className="lists__delete-modal-buttons">
            <div
              className="lists__delete-modal-button lists__delete-modal-button--cancel"
              onClick={() => {
                deleteModalDisplayHandler();
              }}
            >
              Cancel
            </div>
            <div
              className="lists__delete-modal-button lists__delete-modal-button--delete"
              onClick={() => {
                deleteListHandler(deleteListId);
              }}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
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
