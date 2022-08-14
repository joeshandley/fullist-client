import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import ListItem from "../../components/ListItem/ListItem";
import AddListItem from "../../components/AddListItem/AddListItem";
import VariableArrow from "../../components/VariableArrow/VariableArrow";
import backArrow from "../../assets/icons/back-arrow.svg";
import "./List.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const List = (props) => {
  const [list, setList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [isUserAddingItem, setIsUserAddingItem] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(true);
  const [isItemDeleted, setIsItemDeleted] = useState(true);

  const listId = props.match.params.id;
  const history = useHistory();

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

  const editItem = useCallback(
    async (e, itemId) => {
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
    },
    [listId]
  );

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
      setIsItemAdded(true);
      console.log(response);
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  const deleteItemHandler = useCallback(
    async (e) => {
      try {
        if (e.target.parentNode.id) {
          const response = await axios.delete(
            `${BACKEND_URL}/lists/${listId}/${e.target.parentNode.id}`
          );
          console.log(response);
          setIsItemDeleted(true);
        }
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    },
    [listId]
  );

  const getList = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/lists/${listId}`);
      if (response) {
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
        setIsItemAdded(false);
        setIsItemDeleted(false);
      }
    } catch (err) {
      console.log(`Error: `, err);
    }
  }, [listId, editItem, deleteItemHandler]);

  useEffect(() => {
    if (isItemAdded || isItemDeleted) {
      getList();
    }
  }, [getList, isItemAdded, isItemDeleted]);

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

export default List;
