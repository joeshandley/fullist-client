import { useState, useEffect, useId } from "react";
import axios from "axios";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import ListItem from "../../components/ListItem/ListItem";
import AddListItem from "../../components/AddListItem/AddListItem";
import "./List.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const List = (props) => {
  const [list, setList] = useState([]);
  const [listName, setListName] = useState("");
  const [isUserAddingItem, setIsUserAddingItem] = useState(false);
  const [isItemAdded, setItemAdded] = useState(true);

  const id = useId();

  const getList = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/lists/${props.match.params.id}`
      );
      if (response) {
        setListName(response.data.name);
        const list = response.data.items.map((item) => {
          return <ListItem key={item.id} name={item.name} />;
        });
        setList(list);
        setItemAdded(false);
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
          quantity: 1,
        }
      );
      setIsUserAddingItem(false);
      setItemAdded(true);
      console.log(response);
    } catch (err) {
      console.log(`Error: `, err);
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
        defaultValue={listName}
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
      <div className="list__container">{list}</div>
      <div
        className={`list__item${
          isUserAddingItem ? " list__item--show" : " list__item--hide"
        }`}
      >
        <AddListItem
          addItemHandler={addItemHandler}
          isAddingItem={isUserAddingItem}
        />
      </div>
      <p
        className="list__add-item"
        onClick={() => {
          setIsUserAddingItem(true);
        }}
      >
        Add item to list
      </p>
    </main>
  );
};

export default List;
