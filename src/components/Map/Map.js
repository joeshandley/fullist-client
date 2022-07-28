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
  const [lng, setLng] = useState(-0.1);
  const [lat, setLat] = useState(51.5);
  const [zoom, setZoom] = useState(10);

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
    // Add animation when user enters postcode
    document
      .getElementById("submitPostcode")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          const postcodeData = await axios.get(
            `https://api.postcodes.io/postcodes/${e.target.parentElement.postcode.value}`
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
  }); // TODO: add back this dependecy for using user location? [lng, lat, zoom]
  return (
    // TODO: change class names
    <>
      <div id="map" className="map-container"></div>
      <form action="submit">
        {/* onSubmit={postcodeSubmit} */}
        <input name="postcode" className="postcode-input"></input>
        <button id="submitPostcode">
          {/* type="submit" */}
          Submit postcode
        </button>
      </form>
    </>
  );
}
