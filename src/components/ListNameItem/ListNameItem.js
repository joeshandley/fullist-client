import { useState } from "react";
import axios from "axios";
import VariableStar from "../VariableStar/VariableStar";
import "./ListNameItem.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ListNameItem = ({ list }) => {
  const [isFavourite, setIsFavourite] = useState(list.favourite);

  const favouriteClickHandler = async () => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/lists/${list.id}/favourite`
      );
      isFavourite ? setIsFavourite(false) : setIsFavourite(true);
      console.log(response);
    } catch (err) {}
  };
  return (
    <div className="list-name">
      <VariableStar
        isFavourite={isFavourite}
        clickHandler={favouriteClickHandler}
      />
      <a className="list-name__link" href={`/lists/${list.id}`}>
        <h2>{list.name}</h2>
      </a>
    </div>
  );
};

export default ListNameItem;
