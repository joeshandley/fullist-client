import { useEffect, useState } from "react";
import "./MapListItem.scss";

const MapListItem = ({ shop, flyToShop, distance, map }) => {
  // TODO: add active handler to change styling. Pass as props or native state?
  // TODO: change ids?
  return (
    <div id={`listing-${shop.id}`} className="shop-item">
      <a
        id={`link-${shop.id}`}
        className="shop-item__name"
        href="#"
        onClick={() => flyToShop(shop, map)}
      >
        {shop.fascia}
      </a>
      <p className="shop-item__distance">{distance}</p>
      <p className="shop-item__address">
        {shop.add_one}
        {shop.add_two ? `, ${shop.add_two}` : ""}
      </p>
    </div>
  );
};

export default MapListItem;
