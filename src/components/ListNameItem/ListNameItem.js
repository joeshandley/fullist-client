import { useState } from "react";
import axios from "axios";
import VariableStar from "../VariableStar/VariableStar";
import VariableDelete from "../VariableDelete/VariableDelete";
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
      <VariableDelete deleteHandler={deleteModalDisplayHandler} />
    </div>
  );
};

export default ListNameItem;
