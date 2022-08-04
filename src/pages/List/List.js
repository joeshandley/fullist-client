import { useState, useEffect, useId } from "react";
import axios from "axios";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import ListItem from "../../components/ListItem/ListItem";
import AddListItem from "../../components/AddListItem/AddListItem";
import VariableArrow from "../../components/VariableArrow/VariableArrow";
// import rightArrow from "../../assets/icons/right-arrow.svg";
import "./List.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const List = (props) => {
  const [list, setList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [isUserAddingItem, setIsUserAddingItem] = useState(false);
  const [isItemAdded, setItemAdded] = useState(true);

  const getList = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/lists/${props.match.params.id}`
      );
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
        setItemAdded(false);
      }
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  const editListName = async (e) => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/lists/${props.match.params.id}`,
        { name: e.value }
      );
      console.log(response);
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  const editItem = async (e, itemId) => {
    try {
      if (e.name === "quantity") {
        const response = await axios.patch(
          `${BACKEND_URL}/lists/${props.match.params.id}/${itemId}`,
          { quantity: e.value }
        );
        console.log(response);
      }
      if (e.name === "itemName") {
        const response = await axios.patch(
          `${BACKEND_URL}/lists/${props.match.params.id}/${itemId}`,
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
        `${BACKEND_URL}/lists/${props.match.params.id}/add-item`,
        {
          name: e.value,
          quantity: "1",
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
        `${BACKEND_URL}/lists/${props.match.params.id}/${e.target.parentNode.id}`
      );
      console.log(response);
      getList();
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  useEffect(() => {
    if (isItemAdded) {
      getList();
    }
  }, [isItemAdded]);

  return (
    <main className="list">
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
            fill: "#1c0f13",
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
