import React, { useEffect, useState } from "react";
import axios from "axios";
// Imports for Mapbox
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import Logo from "../Logo/Logo";
import "./Map.scss";

/**
 * Much of the code for this component was adapted from the below Mapbox tutorials:
 * https://docs.mapbox.com/help/tutorials/building-a-store-locator
 * https://docs.mapbox.com/help/tutorials/tilequery-healthy-food-finder
 */

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

  const shops = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-0.083964, 51.526649],
        },
        properties: {
          supermarket: "Sainsbury's Local",
          //   phoneFormatted: "(202) 234-7336",
          //   phone: "2022347336",
          address: "245 Old St",
          city: "London",
          country: "UK",
          postcode: "EC1V 9EY",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-0.08262, 51.525691],
        },
        properties: {
          supermarket: "Co-op Food",
          //   phoneFormatted: "(202) 507-8357",
          //   phone: "2025078357",
          address: "76-80 Great Eastern St",
          city: "London",
          country: "UK",
          postcode: "EC2A 3JL",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-0.077415, 51.524535],
        },
        properties: {
          supermarket: "Tesco Express",
          //   phoneFormatted: "(202) 387-9338",
          //   phone: "2023879338",
          address: "179 Shoreditch High St",
          city: "London",
          country: "UK",
          postcode: "E1 6HP",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-0.0888176, 51.5255285],
        },
        properties: {
          supermarket: "Co-operative",
          //   phoneFormatted: "(202) 337-9338",
          //   phone: "2023379338",
          address: "3333 M St NW",
          city: "London",
          country: "UK",
          postcode: "20007",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-0.0875945, 51.5256753],
        },
        properties: {
          supermarket: "Co-operative",
          //   phoneFormatted: "(202) 547-9338",
          //   phone: "2025479338",
          address: "221 Pennsylvania Ave SE",
          city: "London",
          country: "UK",
          postcode: "20003",
        },
      },
    ],
  };
  // TODO: add an id into the data myself?
  // Although, if I want to make this dynamic and have a proximity algorithm, maybe no hard code. Can do both?
  shops.features.forEach(function (shop, i) {
    shop.properties.id = i;
  });

  const buildLocationList = (shops, map) => {
    for (const shop of shops.features) {
      /* Add a new listing section to the sidebar. */
      const listings = document.getElementById("listings");
      const listing = listings.appendChild(document.createElement("div"));
      /* Assign a unique `id` to the listing. */
      listing.id = `listing-${shop.properties.id}`;
      /* Assign the `item` class to each listing for styling. */
      listing.className = "item";

      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement("a"));
      link.href = "#";
      link.className = "title";
      link.id = `link-${shop.properties.id}`;
      link.innerHTML = `${shop.properties.address}`;
      link.addEventListener("click", function () {
        for (const feature of shops.features) {
          if (this.id === `link-${feature.properties.id}`) {
            flyToShop(feature, map);
            createPopUp(feature, map);
          }
        }
        const activeItem = document.getElementsByClassName("active");
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        this.parentNode.classList.add("active");
      });

      /* Add details to the individual listing. */
      const details = listing.appendChild(document.createElement("div"));
      details.innerHTML = `${shop.properties.city}`;
      if (shop.properties.phone) {
        details.innerHTML += ` · ${shop.properties.phoneFormatted}`;
      }
      // TODO: use the distance calculation when that is needed
      if (shop.properties.distance) {
        const roundedDistance =
          Math.round(shop.properties.distance * 100) / 100;
        details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
      }
    }
  };

  function flyToShop(location, map) {
    map.flyTo({
      center: location.geometry.coordinates,
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
  function getDistanceInKm(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLng = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function addMarkers(map) {
    /* For each feature in the GeoJSON object above: */
    for (const marker of shops.features) {
      /* Create a div element for the marker. */
      const el = document.createElement("div");
      /* Assign a unique `id` to the marker. */
      el.id = `marker-${marker.properties.id}`;
      /* Assign the `marker` class to each marker for styling. */
      el.className = "marker";

      el.addEventListener("click", (e) => {
        /* Fly to the point */
        flyToShop(marker, map);
        /* Close all other popups and display popup for clicked store */
        createPopUp(marker, map);
        /* Highlight listing in sidebar */
        const activeItem = document.getElementsByClassName("active");
        e.stopPropagation();
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        const listing = document.getElementById(
          `listing-${marker.properties.id}`
        );
        listing.classList.add("active");
      });

      /**
       * Create a marker using the div element
       * defined above and add it to the map.
       **/
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    }
  }

  // Create map on page load
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", () => {
      map.addSource("places", {
        type: "geojson",
        data: shops,
      });
      const geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        zoom: 13, // Set the zoom level for geocoding results
        placeholder: "Enter an address or place name", // This placeholder text will display in the search bar
        bbox: [-1, 50, 1, 52], // TODO: make bounding box dynamic
      });
      // Add the geocoder to the map
      map.addControl(geocoder, "top-left"); // Add the search box to the top left
      // TODO: is this unnecessary?
      const marker = new mapboxgl.Marker({ color: "#008000" }); // Create a new green marker

      geocoder.on("result", async (event) => {
        // When the geocoder returns a result
        const point = event.result.center; // Capture the result coordinates
        const tileset = tilesetId; // replace this with the ID of the tileset you created
        const radius = 2000; // 1609 meters is roughly equal to one mile
        const limit = 10; // The maximum amount of results to return

        marker.setLngLat(point).addTo(map); // Add the marker to the map at the result coordinates

        // TODO: use axios
        // const query = await axios.get(
        //   `https://api.mapbox.com/v4/${tileset}/tilequery/${point[0]},${point[1]}.json?radius=${radius}&limit=${limit}&access_token=${mapboxgl.accessToken}`
        // );
        // console.log(query);
        // map.getSource("tilequery").setData(query);

        const query = await fetch(
          `https://api.mapbox.com/v4/${tileset}/tilequery/${point[0]},${point[1]}.json?radius=${radius}&limit=${limit}&access_token=${mapboxgl.accessToken}`,
          { method: "GET" }
        );
        const json = await query.json();
        // Use the response to populate the 'tilequery' source
        map.getSource("tilequery").setData(json);
      });

      map.addSource("tilequery", {
        // Add a new source to the map style: https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.addLayer({
        id: "tilequery-points",
        type: "circle",
        source: "tilequery", // Set the layer source
        paint: {
          "circle-stroke-color": "white",
          "circle-stroke-width": {
            // Set the stroke width of each circle: https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-circle-circle-stroke-width
            stops: [
              [0, 0.1],
              [18, 3],
            ],
            base: 5,
          },
          "circle-radius": {
            // Set the radius of each circle, as well as its size at each zoom level: https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-circle-circle-radius
            stops: [
              [12, 5],
              [22, 180],
            ],
            base: 5,
          },
          "circle-color": [
            // Specify the color each circle should be
            "match", // Use the 'match' expression: https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            ["get", "retailer"], // Use the result 'STORE_TYPE' property
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
            "#ffffff", // any other store type
          ],
        },
      });
    });

    buildLocationList(shops, map);
    addMarkers(map);

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
