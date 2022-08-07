import { useEffect, useState } from "react";
import "./MapListItem.scss";

const MapListItem = ({
  shop,
  updateActive,
  flyToShop,
  createPopUp,
  distance,
  map,
}) => {
  // TODO: change ids?
  return (
    <div id={`listing-${shop.id}`} className="shop-item">
      <a
        id={`link-${shop.id}`}
        className="shop-item__name"
        href="#"
        onClick={() => {
          updateActive(shop);
          flyToShop(shop, map);
          createPopUp(shop, map);
        }}
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
