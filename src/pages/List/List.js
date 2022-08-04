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
  const [isItemAdded, setIsItemAdded] = useState(false);

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
      }
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  const addItemHandler = async (e) => {
    console.log(e);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/lists/${props.match.params.id}/add-item`,
        {
          name: e.value,
          quantity: 1,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <main className="list">
      <EditText
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
          isItemAdded ? " list__item--show" : " list__item--hide"
        }`}
      >
        <AddListItem addItemHandler={addItemHandler} />
      </div>
      <p
        className="list__add-item"
        onClick={() => {
          setIsItemAdded(true);
        }}
      >
        Add item to list
      </p>
    </main>
  );
};

export default List;
