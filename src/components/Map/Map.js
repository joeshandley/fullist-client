import { useEffect, useState } from "react";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapListItem from "../MapListItem/MapListItem";
import logoIcon from "../../assets/logos/logo-filled.png";
import supermarketColours from "../../data/SupermarketColours.json";
import "./Map.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

/**
 * Much of the code for this component was adapted from the below Mapbox tutorials:
 * https://docs.mapbox.com/help/tutorials/building-a-store-locator
 * https://docs.mapbox.com/help/tutorials/tilequery-healthy-food-finder
 */
const Map = ({ unit, itemList }) => {
  // TODO: set coords according to user location
  // const [lng, setLng] = useState(-0.080984);
  // const [lat, setLat] = useState(51.526167);
  // const [zoom, setZoom] = useState(12);
  const [shopsList, setShopsList] = useState([]);
  const [hasUserSearched, setHasUserSearched] = useState(false);

  mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;
  const tilesetId = "joeshandley.6hwufhbg";

  const lng = -4.5;
  const lat = 55;
  const zoom = 3.5;

  const buildShopList = async (shops, map) => {
    try {
      const shopNames = shops.features.map((shop) => shop.properties.retailer);
      const response = await axios.post(`${BACKEND_URL}/stock`, {
        shops: shopNames,
        list: itemList,
      });
      const inStock = response.data;
      const shopsList = shops.features.map((shop, i) => {
        let shopDistance = "";
        if (unit === "km") {
          shopDistance = `${
            Math.floor(shop.properties.tilequery.distance / 100) / 10
          } km`;
        }
        if (unit === "miles") {
          shopDistance = `${
            Math.floor((shop.properties.tilequery.distance * 0.621371) / 100) /
            10
          } miles`;
          if (shopDistance === "1 miles") {
            shopDistance = "1 mile";
          }
        }
        return (
          <MapListItem
            key={shop.properties.id}
            shop={shop.properties}
            distance={shopDistance}
            map={map}
            inStock={inStock[i] === undefined ? undefined : inStock[i]}
            flyToShop={flyToShop}
            updateActive={updateActive}
            createPopUp={createPopUp}
            scrollList={scrollList}
          />
        );
      });
      setShopsList(shopsList);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const flyToShop = (shop, map) => {
    map.flyTo({
      center: [shop.long, shop.lat],
      zoom: 15,
    });
  };

  const updateActive = (shop) => {
    const activeItem = document.getElementsByClassName("shop-item--active");
    if (activeItem[0]) {
      activeItem[0].classList.remove("shop-item--active");
    }
    const listing = document.getElementById(`listing-${shop.id}`);
    listing.classList.add("shop-item--active");
  };

  const createPopUp = (properties, map) => {
    const currentPopup = document.getElementsByClassName("mapboxgl-popup");
    if (currentPopup[0]) {
      currentPopup[0].remove();
    }
    const popup = new mapboxgl.Popup();
    const coordinates = new mapboxgl.LngLat(properties.long, properties.lat);
    const content = `<h3>${properties.fascia}</h3><p>${properties.add_one}, ${
      properties.add_two !== "" ? `${properties.add_two}, ` : ""
    }${properties.town}, ${properties.postcode}</p>
        `;
    popup.setLngLat(coordinates).setHTML(content).addTo(map);
  };

  const scrollList = (shop) => {
    document.getElementById(`listing-${shop.id}`).scrollIntoView();
  };

  // Create map on page load
  useEffect(() => {
    if (!mapboxgl.supported()) {
      alert(
        "Your browser does not support Mapbox GL, please use a different browser to access this website"
      );
    } else {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
        minZoom: 3.5,
      });
      map.addControl(new mapboxgl.NavigationControl());

      map.on("load", () => {
        map.addSource("shopLocations", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          // zoom: 12,
          placeholder: "Enter an address or place name",
          bbox: [-7.57216793459, 49.959999905, 1.68153079591, 58.6350001085], // Bounding box for the UK, found here: https://gist.github.com/graydon/11198540
        });
        document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

        // TODO: is this unnecessary?
        // TODO: I think this is necessary, but need to change default marker colour
        const marker = new mapboxgl.Marker({ color: "#33bc6a" });

        geocoder.on("result", async (event) => {
          const point = event.result.center;
          const tileset = tilesetId;
          const radius = 2000; // TODO: make this dynamic according to user selection
          const limit = 10; // The maximum amount of results to return

          marker.setLngLat(point).addTo(map);

          /**
           * GET request for custom supermarket location data tileset
           * Data obtained from: https://geolytix.com/blog/geolytix-supermarket-retail-points-2/
           */
          const response = await axios.get(
            `https://api.mapbox.com/v4/${tileset}/tilequery/${point[0]},${point[1]}.json?radius=${radius}&limit=${limit}&access_token=${mapboxgl.accessToken}`
          );
          await map.getSource("shopLocations").setData(response.data);
          buildShopList(map.getSource("shopLocations")._data, map);
          setHasUserSearched(true);
        });

        map.loadImage(logoIcon, (error, image) => {
          if (error) throw error;
          map.addImage("fullist-icon", image, { sdf: true });
          map.addLayer({
            id: "shopMarkers",
            source: "shopLocations",
            type: "symbol",
            layout: {
              "icon-image": "fullist-icon",
              "icon-size": 0.25,
            },
            paint: supermarketColours,
          });
        });

        map.on("mouseenter", "shopMarkers", (event) => {
          map.getCanvas().style.cursor = "pointer";
          const properties = event.features[0].properties;
          createPopUp(properties, map);
        });

        // TODO: Add back so that popup disappear on mouse leave, but not on leave click
        // map.on("mouseleave", "shopMarkers", () => {
        //   console.log(isPopupClicked);
        //   if (!isPopupClicked) {
        //     map.getCanvas().style.cursor = "";
        //     popup.remove();
        //   }
        // });

        map.on("click", "shopMarkers", (event) => {
          const properties = event.features[0].properties;
          flyToShop(properties, map);
          createPopUp(properties, map);
          updateActive(properties);
          scrollList(properties);
        });
      });
    }
  }, [unit]);

  return (
    <div className="map">
      <div id="geocoder" className="map__geocoder"></div>
      <div id="map" className="map__container"></div>
      <div
        className={`map__sidebar ${
          hasUserSearched ? "map__sidebar--show" : "map__sidebar--hide"
        }`}
      >
        <h2 className="map__heading">Nearest Shops</h2>
        <div id="listings" className="map__shop-list">
          {shopsList}
        </div>
      </div>
    </div>
  );
};

export default Map;
