import { useEffect, useState } from "react";
import "./MapListItem.scss";

const MapListItem = ({
  shop,
  updateActive,
  flyToShop,
  createPopUp,
  scrollList,
  distance,
  map,
  inStock,
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
          scrollList(shop);
        }}
      >
        {shop.fascia}
      </a>
      <p
        className={`shop-item__in-stock ${
          inStock === undefined
            ? "shop-item__in-stock--hide"
            : inStock
            ? "shop-item__in-stock--true"
            : "shop-item__in-stock--false"
        }`}
      >
        {inStock ? "Your list is in stock!" : "Full list not in stock"}
      </p>
      <p className="shop-item__distance">{distance}</p>
      <p className="shop-item__address">
        {shop.add_one}
        {shop.add_two ? `, ${shop.add_two}` : ""}
      </p>
    </div>
  );
};

export default MapListItem;
