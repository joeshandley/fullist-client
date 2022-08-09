import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import ListItem from "../../components/ListItem/ListItem";
import AddListItem from "../../components/AddListItem/AddListItem";
import VariableArrow from "../../components/VariableArrow/VariableArrow";
import backArrow from "../../assets/icons/back-arrow.svg";
import "./AddList.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AddList = () => {
  const [list, setList] = useState([]);
  const [listId, setListId] = useState("");
  const [itemList, setItemList] = useState([]);
  const [isUserAddingItem, setIsUserAddingItem] = useState(false);
  const [isItemAdded, setItemAdded] = useState(true);

  const history = useHistory();

  const addList = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/lists`);
      console.log(response);
      if (response) {
        setList(response.data.newListCreated);
        setListId(response.data.newListCreated.id);
        setItemAdded(false);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const getList = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/lists/${listId}`);
      if (response) {
        console.log(response);
        if (response.data.items.length === 0) {
          return;
        }
        const itemList = response.data.items.map((item) => {
          return (
            <ListItem
              key={item.id}
              id={item.id}
              quantity={item.quantity}
              name={item.name}
              editItemHandler={editItem}
              deleteItemHandler={deleteItemHandler}
            />
          );
        });
        setList(response.data);
        setItemList(itemList);
        setItemAdded(false);
      }
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  const editListName = async (e) => {
    try {
      const response = await axios.patch(`${BACKEND_URL}/lists/${listId}`, {
        name: e.value,
      });
      console.log(response);
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  const editItem = async (e, itemId) => {
    try {
      if (e.name === "quantity") {
        const response = await axios.patch(
          `${BACKEND_URL}/lists/${listId}/${itemId}`,
          { quantity: e.value }
        );
        console.log(response);
      }
      if (e.name === "itemName") {
        const response = await axios.patch(
          `${BACKEND_URL}/lists/${listId}/${itemId}`,
          { name: e.value }
        );
        console.log(response);
      }
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  const addItemHandler = async (e) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/lists/${listId}/add-items`,
        {
          items: [
            {
              name: e.value,
              quantity: "1",
            },
          ],
        }
      );
      setIsUserAddingItem(false);
      setItemAdded(true);
      console.log(response);
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  const deleteItemHandler = async (e) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/lists/${listId}/${e.target.parentNode.id}`
      );
      console.log(response);
      getList();
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  useEffect(() => {
    addList();
  }, []);

  useEffect(() => {
    if (listId !== "") {
      if (isItemAdded) {
        getList();
      }
    }
  }, [isItemAdded]);

  return (
    <main className="list">
      <img
        className="list__back"
        src={backArrow}
        alt="Back arrow"
        onClick={() => history.goBack()}
      />
      <EditText
        className="list__name"
        name="list-name"
        type="text"
        placeholder="Enter your list name"
        defaultValue={list.name}
        onSave={(e) => {
          editListName(e);
        }}
        showEditButton
        style={{ width: "100%", fontSize: "2.4rem" }}
        editButtonProps={{
          style: {
            marginLeft: "5px",
            backgroundColor: "#fbfbfb",
            cursor: "pointer",
          },
        }}
      />
      <div className="list__container">{itemList}</div>
      <div
        className={`list__item${
          isUserAddingItem ? " list__item--show" : " list__item--hide"
        }`}
      >
        <AddListItem
          addItemHandler={addItemHandler}
          isAddingItem={isUserAddingItem}
          deleteHandler={() => {
            setIsUserAddingItem(false);
          }}
        />
      </div>
      <p
        className="list__add-item"
        onClick={() => {
          setIsUserAddingItem(true);
        }}
      >
        + Add item to list
      </p>
      <div className="list__check-nearby">
        <h3 className="list__check-title">Check your list nearby...</h3>
        <VariableArrow listId={list.id} />
      </div>
    </main>
  );
};

export default AddList;
