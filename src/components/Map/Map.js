import { useEffect, useState } from "react";
import axios from "axios";
// Imports for Mapbox
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import Logo from "../Logo/Logo";
import logoIcon from "../../assets/logos/logo-filled.png";
import "./Map.scss";

/**
 * Much of the code for this component was adapted from the below Mapbox tutorials:
 * https://docs.mapbox.com/help/tutorials/building-a-store-locator
 * https://docs.mapbox.com/help/tutorials/tilequery-healthy-food-finder
 */

// TODO: CLEAN CODE -- so much unnecessary code

const Map = () => {
  // TODO: use token from .env file
  // mapboxgl.accessToken = process.env.MAP_TOKEN;
  mapboxgl.accessToken =
    "pk.eyJ1Ijoiam9lc2hhbmRsZXkiLCJhIjoiY2w2M3Rrc2I2MjVpZzNnb2EzaG5xNjF5NyJ9.LszKClP9qlQ3m4jXCzDudg";

  const tilesetId = "joeshandley.6hwufhbg";

  // TODO: set coords according to user location
  //   const [lng, setLng] = useState(-0.125);
  //   const [lat, setLat] = useState(51.505);
  //   const [zoom, setZoom] = useState(10);
  const [lng, setLng] = useState(-0.080984);
  const [lat, setLat] = useState(51.526167);
  const [zoom, setZoom] = useState(14);
  const [isPopupClicked, setIsPopupClicked] = useState(false);

  const buildLocationList = (shops, map) => {
    const listings = document.getElementById("listings");
    if (listings.firstChild) {
      while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
      }
    }
    // TODO: refactor shops.features to add .properties on the end
    const shopsList = shops.features.map((shop, i) => {
      const listing = listings.appendChild(document.createElement("div"));
      listing.id = `listing-${i}`;
      listing.className = "item";

      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement("a"));
      link.href = "#";
      link.className = "title";
      link.id = `link-${i}`;
      link.innerHTML = `${shop.properties.fascia}`;
      link.addEventListener("click", () => {
        flyToShop(shop.properties, map);
        const popup = new mapboxgl.Popup();
        popup
          .setLngLat([shop.properties.long, shop.properties.lat])
          .setHTML(
            `<h3>${shop.properties.fascia}</h3><h4>${
              shop.properties.add_one
            }, ${
              shop.properties.add_two !== ""
                ? `${shop.properties.add_two}, `
                : ""
            }${shop.properties.town}, ${shop.properties.postcode}</h4>
        `
          )
          .addTo(map);
        const activeItem = document.getElementsByClassName("active");
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        this.parentNode.classList.add("active");
      });

      /* Add details to the individual listing. */
      const details = listing.appendChild(document.createElement("div"));
      details.innerHTML = `${shop.properties.add_one}`;
      if (shop.properties.add_two) {
        details.innerHTML += `, ${shop.properties.add_two}`;
      }
      // TODO: use the distance calculation when that is needed
      //   if (shop.properties.distance) {
      //     const roundedDistance =
      //       Math.round(shop.properties.distance * 100) / 100;
      //     details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
      //   }
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

  // TODO: delete -- old version when marker was passed
  //   function flyToShop(coords, map) {
  //     map.flyTo({
  //       center: coords,
  //       zoom: 15,
  //     });
  //   }

  function flyToShop(shop, map) {
    map.flyTo({
      center: [shop.long, shop.lat],
      zoom: 15,
    });
  }

  function createPopUp(location, map) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(location.geometry.coordinates)
      .setHTML(
        `<h3>${location.properties.supermarket}</h3><h4>${location.properties.address}, ${location.properties.postcode}</h4>`
      )
      .addTo(map);
  }

  // TODO: use this function for distance between two points
  //   function getDistanceInKm(lat1, lng1, lat2, lng2) {
  //     const R = 6371; // Radius of the earth in km
  //     const dLat = deg2rad(lat2 - lat1); // deg2rad below
  //     const dLng = deg2rad(lng2 - lng1);
  //     const a =
  //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //       Math.cos(deg2rad(lat1)) *
  //         Math.cos(deg2rad(lat2)) *
  //         Math.sin(dLng / 2) *
  //         Math.sin(dLng / 2);
  //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //     const d = R * c; // Distance in km
  //     return d;
  //   }

  //   function deg2rad(deg) {
  //     return deg * (Math.PI / 180);
  //   }

  // TODO: delete this old marker code
  //   function addMarkers(map) {
  //     /* For each feature in the GeoJSON object above: */
  //     for (const marker of shops.features) {
  //       /* Create a div element for the marker. */
  //       const el = document.createElement("div");
  //       /* Assign a unique `id` to the marker. */
  //       el.id = `marker-${marker.properties.id}`;
  //       /* Assign the `marker` class to each marker for styling. */
  //       el.className = "marker";

  //       el.addEventListener("click", (e) => {
  //         /* Fly to the point */
  //         flyToShop(marker, map);
  //         /* Close all other popups and display popup for clicked store */
  //         createPopUp(marker, map);
  //         /* Highlight listing in sidebar */
  //         const activeItem = document.getElementsByClassName("active");
  //         e.stopPropagation();
  //         if (activeItem[0]) {
  //           activeItem[0].classList.remove("active");
  //         }
  //         const listing = document.getElementById(
  //           `listing-${marker.properties.id}`
  //         );
  //         listing.classList.add("active");
  //       });

  //       /**
  //        * Create a marker using the div element
  //        * defined above and add it to the map.
  //        **/
  //       new mapboxgl.Marker(el, { offset: [0, -23] })
  //         .setLngLat(marker.geometry.coordinates)
  //         .addTo(map);
  //     }
  //   }

  // Create map on page load
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
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
        zoom: 13,
        placeholder: "Enter an address or place name",
        bbox: [-7.57216793459, 49.959999905, 1.68153079591, 58.6350001085], // TODO: make bounding box dynamic
      });
      map.addControl(geocoder, "top-left");

      // TODO: is this unnecessary?
      const marker = new mapboxgl.Marker({ color: "#008000" });

      geocoder.on("result", async (event) => {
        // When the geocoder returns a result
        const point = event.result.center; // Capture the result coordinates
        const tileset = tilesetId;
        const radius = 2000;
        const limit = 10; // The maximum amount of results to return

        marker.setLngLat(point).addTo(map); // Add the marker to the map at the result coordinates

        /**
         * GET request for custom supermarket location data, retrieved from:
         * https://geolytix.com/blog/geolytix-supermarket-retail-points-2/
         */

        const response = await axios.get(
          `https://api.mapbox.com/v4/${tileset}/tilequery/${point[0]},${point[1]}.json?radius=${radius}&limit=${limit}&access_token=${mapboxgl.accessToken}`
        );
        await map.getSource("shopLocations").setData(response.data);

        buildLocationList(map.getSource("shopLocations")._data, map);
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
          paint: {
            "icon-color": [
              "match",
              ["get", "retailer"],
              "Aldi",
              "#001E5E",
              "Amazon",
              "#77bc1f",
              "Asda",
              "#78BE20",
              "Booths",
              "#383a36",
              "Budgens",
              "#204133",
              "Costco",
              "#E31837",
              "Dunnes Stores",
              "#000000",
              "Farmfoods",
              "#ffff54",
              "Heron",
              "#fadd4b",
              "Iceland",
              "#D2212E",
              "Lidl",
              "#015AA2",
              "Makro",
              "#fce94e",
              "Marks and Spencer",
              "#202020",
              "Mere",
              "#ffffff",
              "Morrisons",
              "#00563F",
              "Planet Organic",
              "#ffffff",
              "Sainsburys",
              "#ED8B01",
              "Spar",
              "#ec1b24",
              "Tesco",
              "#EE1C2E",
              "The Co-operative Group",
              "#00a1cc",
              "Waitrose",
              "#578626",
              "Whole Foods Market",
              "#146642",
              "#ffffff",
            ],
          },
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
        const content = `<h3>${event.features[0].properties.fascia}</h3><h4>${
          event.features[0].properties.add_one
        }, ${
          event.features[0].properties.add_two !== ""
            ? `${event.features[0].properties.add_two}, `
            : ""
        }${event.features[0].properties.town}, ${
          event.features[0].properties.postcode
        }</h4>
        `; // <p>${(obj.distance / 1609.344).toFixed(2)} mi. from location</p>
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

        popup
          .setLngLat([properties.long, properties.lat]) // Set the popup at the given coordinates
          .setHTML(content) // Set the popup contents equal to the HTML elements you created
          .addTo(map); // Add the popup to the map
        // createPopUp(marker, map);

        // TODO: add to highlight shop in side bar
        // const activeItem = document.getElementsByClassName("active");
        // event.stopPropagation();
        // if (activeItem[0]) {
        //   activeItem[0].classList.remove("active");
        // }
        // const listing = document.getElementById(
        //   `listing-${marker.properties.id}`
        // );
        // listing.classList.add("active");
        setIsPopupClicked(true);
      });
    });
    // setTimeout(() => {
    //   console.log(map.getSource("shopLocations")._data);
    // }, 5000);

    // buildLocationList(shops, map);
    // addMarkers(map);

    // Add animation to fly to the user-entered postcode
    document
      .getElementById("postcode-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          const postcodeData = await axios.get(
            `https://api.postcodes.io/postcodes/${e.target.postcode.value}`
          );
          if (postcodeData) {
            map.flyTo({
              center: [
                postcodeData.data.result.longitude,
                postcodeData.data.result.latitude,
              ],
              zoom: 12,
              essential: true,
            });
          }
        } catch (err) {
          console.log(`Error: `, err);
        }
      });
  });

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
      <form id="postcode-form" action="submit" className="map__form">
        <input name="postcode" className="postcode-input"></input>
        <button id="submitPostcode" type="submit">
          Submit postcode
        </button>
      </form>
      <div className="logo-container">
        <Logo fillColor="#000000" />
      </div>
    </>
  );
};

export default Map;
