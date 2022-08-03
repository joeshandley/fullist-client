import { useState, useEffect } from "react";
import axios from "axios";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import ListItem from "../../components/ListItem/ListItem";
import "./List.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const List = (props) => {
  const [list, setList] = useState([]);
  const [listName, setListName] = useState("");

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

  useEffect(() => {
    getList();
  }, []);

  return (
    <main>
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
      <a href="/lists/search" className="lists__add">
        Add item to list
      </a>
      <div className="list__container">{list}</div>
    </main>
  );
};

export default List;
