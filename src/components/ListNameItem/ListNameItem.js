import { useState } from "react";
import axios from "axios";
import VariableStar from "../VariableStar/VariableStar";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import "./ListNameItem.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ListNameItem = ({ list, deleteModalDisplayHandler }) => {
  const [isFavourite, setIsFavourite] = useState(list.favourite);

  const listId = list.id;

  const favouriteClickHandler = async () => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/lists/${listId}/favourite`
      );
      setIsFavourite(!isFavourite);
      console.log(response);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <div id={list.id} className="list-name">
      <VariableStar
        isFavourite={isFavourite}
        clickHandler={favouriteClickHandler}
      />
      <a className="list-name__link" href={`/lists/${listId}`}>
        <h2>{list.name}</h2>
      </a>
      <img
        className="list-name__delete"
        src={deleteIcon}
        alt="Delete icon"
        onClick={(e) => {
          deleteModalDisplayHandler(e);
        }}
      />
    </div>
  );
};

export default ListNameItem;
