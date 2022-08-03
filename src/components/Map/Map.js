import { useEffect, useState } from "react";
import axios from "axios";
// Imports for Mapbox
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import logoIcon from "../../assets/logos/logo-filled.png";
import supermarketColours from "../../data/SupermarketColours.json";
import "./Map.scss";

/**
 * Much of the code for this component was adapted from the below Mapbox tutorials:
 * https://docs.mapbox.com/help/tutorials/building-a-store-locator
 * https://docs.mapbox.com/help/tutorials/tilequery-healthy-food-finder
 */

// TODO: delete all console logs
// TODO: get rid of all DOM manipulation

const Map = (props) => {
  mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;
  // mapboxgl.accessToken =
  //   "pk.eyJ1Ijoiam9lc2hhbmRsZXkiLCJhIjoiY2w2M3Rrc2I2MjVpZzNnb2EzaG5xNjF5NyJ9.LszKClP9qlQ3m4jXCzDudg";

  const tilesetId = "joeshandley.6hwufhbg";

  // TODO: set coords according to user location
  //   const [lng, setLng] = useState(-0.125);
  //   const [lat, setLat] = useState(51.505);
  //   const [zoom, setZoom] = useState(10);
  const [lng, setLng] = useState(-0.080984);
  const [lat, setLat] = useState(51.526167);
  const [zoom, setZoom] = useState(12);
  const [isPopupClicked, setIsPopupClicked] = useState(false);

  const buildShopList = (shops, map) => {
    const listings = document.getElementById("listings");

    if (listings.firstChild) {
      while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
      }
    }
    // TODO: refactor shops.features to add .properties on the end
    const shopsList = shops.features.map((shop) => {
      const listing = listings.appendChild(document.createElement("div"));
      listing.id = `listing-${shop.properties.id}`;
      listing.className = "item";

      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement("a"));
      link.href = "#";
      link.className = "title";
      link.id = `link-${shop.properties.id}`;
      link.innerHTML = `${shop.properties.fascia}`;
      link.addEventListener("click", (event) => {
        flyToShop(shop.properties, map);
        // TODO: add this to open popup on sidebar click
        // const popUps = document.getElementsByClassName("mapboxgl-popup");
        // // if (popUps[0]) popUps[0].remove();

        // const popup = new mapboxgl.Popup();

        // const content = `<h3>${shop.properties.fascia}</h3><h4>${
        //   shop.properties.add_one
        // }, ${
        //   shop.properties.add_two !== "" ? `${shop.properties.add_two}, ` : ""
        // }${shop.properties.town}, ${shop.properties.postcode}</h4>
        //   `;

        // const coordinates = new mapboxgl.LngLat(
        //   shop.properties.long,
        //   shop.properties.lat
        // );
        // popup
        //   .setLngLat(coordinates) // Set the popup at the given coordinates
        //   .setHTML("test") // Set the popup contents equal to the HTML elements you created
        //   .addTo(map);

        const activeItem = document.getElementsByClassName("active");
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        event.target.parentNode.classList.add("active");

        setIsPopupClicked(true);
      });

      const distance = listing.appendChild(document.createElement("div"));
      if (props.unit === "km") {
        const shopDistance =
          Math.floor(shop.properties.tilequery.distance / 100) / 10;
        distance.innerHTML = `${shopDistance} km`;
      }
      if (props.unit === "miles") {
        const shopDistance =
          Math.floor((shop.properties.tilequery.distance * 0.621371) / 100) /
          10;
        distance.innerHTML = `${shopDistance} miles`;
        if (shopDistance === 1) {
          distance.innerHTML = `${shopDistance} mile`;
        }
      }

      const details = listing.appendChild(document.createElement("div"));
      details.innerHTML = `${shop.properties.add_one}`;
      if (shop.properties.add_two) {
        details.innerHTML += `, ${shop.properties.add_two}`;
      }
    });

    // for (const shop of shops.features) {
    //   /* Add a new listing section to the sidebar. */
    //   const listings = document.getElementById("listings");
    //   const listing = listings.appendChild(document.createElement("div"));
    //   /* Assign a unique `id` to the listing. */
    //   listing.id = `listing-${shop.properties.id}`;
    //   /* Assign the `item` class to each listing for styling. */
    //   listing.className = "item";

    //   /* Add the link to the individual listing created above. */
    //   const link = listing.appendChild(document.createElement("a"));
    //   link.href = "#";
    //   link.className = "title";
    //   link.id = `link-${shop.properties.id}`;
    //   link.innerHTML = `${shop.properties.address}`;
    //   link.addEventListener("click", function () {
    //     for (const feature of shops.features) {
    //       if (this.id === `link-${feature.properties.id}`) {
    //         flyToShop(feature, map);
    //         createPopUp(feature, map);
    //       }
    //     }
    //     const activeItem = document.getElementsByClassName("active");
    //     if (activeItem[0]) {
    //       activeItem[0].classList.remove("active");
    //     }
    //     this.parentNode.classList.add("active");
    //   });

    //   /* Add details to the individual listing. */
    //   const details = listing.appendChild(document.createElement("div"));
    //   details.innerHTML = `${shop.properties.city}`;
    //   if (shop.properties.phone) {
    //     details.innerHTML += ` · ${shop.properties.phoneFormatted}`;
    //   }
    //   // TODO: use the distance calculation when that is needed
    //   if (shop.properties.distance) {
    //     const roundedDistance =
    //       Math.round(shop.properties.distance * 100) / 100;
    //     details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
    //   }
    // }
  };

  function flyToShop(shop, map) {
    map.flyTo({
      center: [shop.long, shop.lat],
      zoom: 15,
    });
  }

  //   function createPopUp(shop, map) {
  //     const popUps = document.getElementsByClassName("mapboxgl-popup");
  //     /** Check if there is already a popup on the map and if so, remove it */
  //     if (popUps[0]) popUps[0].remove();

  //     // const popup = new mapboxgl.Popup({ closeOnClick: false })
  //     //   .setLngLat([shop.long, shop.lat])
  //     //   .setHTML(
  //     //     `<h3>${shop.fascia}</h3><h4>${shop.add_one}, ${
  //     //       shop.add_two !== "" ? `${shop.add_two}, ` : ""
  //     //     }${shop.town}, ${shop.postcode}</h4>
  //     //     `
  //     //   )
  //     //   .addTo(map);
  //     // console.log("popup");
  //   }

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
        map.addControl(geocoder, "top-left");

        // TODO: is this unnecessary?
        // TODO: I think this is necessary, but need to change default marker colour
        const marker = new mapboxgl.Marker({ color: "#33bc6a" });

        geocoder.on("result", async (event) => {
          const point = event.result.center; // Capture the result coordinates
          const tileset = tilesetId;
          const radius = 2000; // TODO: make this dynamic according to user selection
          const limit = 10; // The maximum amount of results to return

          marker.setLngLat(point).addTo(map); // Add the marker to the map at the result coordinates

          /**
           * GET request for custom supermarket location data tileset
           * Data obtained from: https://geolytix.com/blog/geolytix-supermarket-retail-points-2/
           */

          const response = await axios.get(
            `https://api.mapbox.com/v4/${tileset}/tilequery/${point[0]},${point[1]}.json?radius=${radius}&limit=${limit}&access_token=${mapboxgl.accessToken}`
          );
          await map.getSource("shopLocations").setData(response.data);
          buildShopList(map.getSource("shopLocations")._data, map);
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

        const popup = new mapboxgl.Popup();

        map.on("mouseenter", "shopMarkers", (event) => {
          map.getCanvas().style.cursor = "pointer";
          const properties = event.features[0].properties;
          const coordinates = new mapboxgl.LngLat(
            properties.long,
            properties.lat
          );
          const content = `<h3>${properties.fascia}</h3><h4>${
            properties.add_one
          }, ${properties.add_two !== "" ? `${properties.add_two}, ` : ""}${
            properties.town
          }, ${properties.postcode}</h4>
        `;
          // TODO: put in function? Search for all uses
          popup.setLngLat(coordinates).setHTML(content).addTo(map);
        });

        map.on("mouseleave", "shopMarkers", () => {
          if (!isPopupClicked) {
            map.getCanvas().style.cursor = "";
            popup.remove();
          }
        });

        map.on("click", "shopMarkers", (event) => {
          const properties = event.features[0].properties;
          flyToShop(properties, map);
          const content = `<h3>${properties.fascia}</h3><h4>${
            properties.add_one
          }, ${properties.add_two !== "" ? `${properties.add_two}, ` : ""}${
            properties.town
          }, ${properties.postcode}</h4>
        `;

          const coordinates = new mapboxgl.LngLat(
            properties.long,
            properties.lat
          );
          popup
            .setLngLat(coordinates) // Set the popup at the given coordinates
            .setHTML(content) // Set the popup contents equal to the HTML elements you created
            .addTo(map); // Add the popup to the map

          // createPopUp(marker, map);

          const activeItem = document.getElementsByClassName("active");
          if (activeItem[0]) {
            activeItem[0].classList.remove("active");
          }
          const listing = document.getElementById(`listing-${properties.id}`);
          listing.classList.add("active");

          setIsPopupClicked(true);
        });
      });
    }
  }, [props.unit]);

  return (
    // TODO: change class names
    <>
      <div className="container">
        <div className="map__sidebar">
          <div className="heading">
            <h1>Nearest Shops</h1>
          </div>
          <div id="listings" className="listings"></div>
        </div>
        <div id="map" className="map__container"></div>
      </div>
    </>
  );
};

export default Map;
