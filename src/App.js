import React, { useRef, useEffect, useState } from "react";
// import ReactMapGL, { NavigationControl } from "react-map-gl";
import axios from "axios";

// Imports for Mapbox
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import logo from "./assets/logos/logo.svg";
import "./App.scss";

function App() {
  // mapboxgl.accessToken = process.env.MAP_TOKEN;
  mapboxgl.accessToken =
    "pk.eyJ1Ijoiam9lc2hhbmRsZXkiLCJhIjoiY2w2M3Rrc2I2MjVpZzNnb2EzaG5xNjF5NyJ9.LszKClP9qlQ3m4jXCzDudg";

  const mapContainer = useRef(null);
  // const map = useRef(null);
  const [lng, setLng] = useState(-0.1);
  const [lat, setLat] = useState(51.5);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    // if (map.current) return; // initialise map only once
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.addControl(new mapboxgl.NavigationControl());
  }, [lng, lat, zoom]);

  // Code for getting current location
  // from https://dev.to/codebucks/how-to-get-user-s-location-in-react-js-1691

  const postcodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const postcodeData = await axios.get(
        `https://api.postcodes.io/postcodes/${e.target.postcode.value}`
      );
      if (postcodeData) {
        setLng(postcodeData.data.result.longitude);
        setLat(postcodeData.data.result.latitude);
        setZoom(13);
      }
    } catch (err) {
      console.log(`Error: `, err);
    }
  };

  return (
    <>
      <h1>Test</h1>
      <p>Add content here</p>
      <div className="logo-container">
        <h2>F</h2>
        <img src={logo} alt="" />
        <h2>llist.</h2>
      </div>
      <div ref={mapContainer} className="map-container" />
      <form action="submit" onSubmit={postcodeSubmit}>
        <input name="postcode"></input>
        <button type="submit">Submit postcode</button>
      </form>
    </>
  );
}

export default App;
