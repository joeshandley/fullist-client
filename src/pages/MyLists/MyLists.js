import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "react-edit-text/dist/index.css";
import ListNameItem from "../../components/ListNameItem/ListNameItem";

import "./MyLists.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const MyLists = () => {
  const [allLists, setAllLists] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [isFavSelected, setisFavSelected] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteListId, setDeleteListId] = useState("");

  const deleteModalDisplayHandler = useCallback(
    (e) => {
      if (!isModalOpen) {
        setDeleteListId(e.target.parentNode.id);
      }
      isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
    },
    [isModalOpen]
  );

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

  const getLists = useCallback(async () => {
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
        console.log(lists);
        const favourites = lists.filter((list) => list.props.list.favourite);
        setFilteredLists(favourites);
      }
    } catch (err) {
      console.log(`Error: `, err);
    }
  }, [deleteModalDisplayHandler]);

  useEffect(() => {
    getLists();
  }, [getLists]);

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
      <div className="lists__mid">
        <a className="lists__add-new" href="/lists/add">
          + New List
        </a>
        <label className="lists__favourites-label" htmlFor="favourites">
          Favourites only
          <input
            className="lists__favourites-check"
            name="favourites"
            type="checkbox"
            onClick={() => {
              setisFavSelected(!isFavSelected);
            }}
          />
        </label>
      </div>
      <div
        className={`lists__list ${
          sortType === "newest" ? "lists__list--newest" : "lists__list--oldest"
        }`}
      >
        {isFavSelected ? filteredLists : allLists}
      </div>
    </main>
  );
};

export default MyLists;
