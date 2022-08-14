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
  return (
    <div id={`listing-${shop.id}`} className="shop-item">
      <p
        id={`link-${shop.id}`}
        className="shop-item__name"
        onClick={() => {
          updateActive(shop);
          flyToShop(shop, map);
          createPopUp(shop, map);
          scrollList(shop);
        }}
      >
        {shop.fascia}
      </p>
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
