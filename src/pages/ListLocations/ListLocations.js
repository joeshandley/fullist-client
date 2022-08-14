import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Map from "../../components/Map/Map";
import backArrow from "../../assets/icons/back-arrow.svg";
import "./ListLocations.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ListLocations = (props) => {
  const [itemList, setItemList] = useState([]);
  const unit = "km"; //TODO: change to useState

  const history = useHistory();

  const getList = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/lists/${props.match.params.id}`
      );
      const itemList = data.items.map((item) => item.name);
      setItemList(itemList);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    getList();
  }, [getList]);

  if (itemList.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <main className="list-locations">
      <div className="list-locations__top">
        <img
          className="list-locations__back"
          src={backArrow}
          alt="Back arrow"
          onClick={() => history.goBack()}
        />
        <h1 className="list-locations__title">Locations</h1>
      </div>
      <Map unit={unit} itemList={itemList} />
    </main>
  );
};

export default ListLocations;
