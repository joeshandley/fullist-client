import React, { useEffect, useState } from "react";
import axios from "axios";
// Imports for Mapbox
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import "./Map.scss";

export default function () {
  // TODO: use token from .env file
  // mapboxgl.accessToken = process.env.MAP_TOKEN;
  mapboxgl.accessToken =
    "pk.eyJ1Ijoiam9lc2hhbmRsZXkiLCJhIjoiY2w2M3Rrc2I2MjVpZzNnb2EzaG5xNjF5NyJ9.LszKClP9qlQ3m4jXCzDudg";

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
          supermarket: "Sainsbury's",
          phoneFormatted: "(202) 234-7336",
          phone: "2022347336",
          address: "1471 P St NW",
          city: "Washington DC",
          country: "United States",
          crossStreet: "at 15th St NW",
          postalCode: "20005",
          state: "D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-0.08262, 51.525691],
        },
        properties: {
          supermarket: "Co-operative",
          phoneFormatted: "(202) 507-8357",
          phone: "2025078357",
          address: "2221 I St NW",
          city: "Washington DC",
          country: "United States",
          crossStreet: "at 22nd St NW",
          postalCode: "20037",
          state: "D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-0.0907917, 51.5257821],
        },
        properties: {
          phoneFormatted: "(202) 387-9338",
          phone: "2023879338",
          address: "1512 Connecticut Ave NW",
          city: "Washington DC",
          country: "United States",
          crossStreet: "at Dupont Circle",
          postalCode: "20036",
          state: "D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-0.0888176, 51.5255285],
        },
        properties: {
          phoneFormatted: "(202) 337-9338",
          phone: "2023379338",
          address: "3333 M St NW",
          city: "Washington DC",
          country: "United States",
          crossStreet: "at 34th St NW",
          postalCode: "20007",
          state: "D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-0.0875945, 51.5256753],
        },
        properties: {
          phoneFormatted: "(202) 547-9338",
          phone: "2025479338",
          address: "221 Pennsylvania Ave SE",
          city: "Washington DC",
          country: "United States",
          crossStreet: "btwn 2nd & 3rd Sts. SE",
          postalCode: "20003",
          state: "D.C.",
        },
      },
    ],
  };
  shops.features.forEach(function (shop, i) {
    shop.properties.id = i;
  });

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
      /* Add the data to your map as a layer */
      map.addLayer({
        id: "locations",
        type: "circle",
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: "geojson",
          data: shops,
        },
      });
    });

    // Add animation when user enters postcode
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
              essential: true, // this animation is considered essential with respect to prefers-reduced-motion
            });
          }
        } catch (err) {
          console.log(`Error: `, err);
        }
      });
  }); // TODO: add back this dependency for using user location? [lng, lat, zoom]

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
    </>
  );
}
