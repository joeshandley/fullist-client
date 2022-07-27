import React, { useRef, useEffect, useState } from "react";

// Imports for Mapbox
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import logo from "./assets/logos/logo.svg";
import "./App.scss";

function App() {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoiam9lc2hhbmRsZXkiLCJhIjoiY2w2M3Rrc2I2MjVpZzNnb2EzaG5xNjF5NyJ9.LszKClP9qlQ3m4jXCzDudg";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-0.1);
  const [lat, setLat] = useState(51.5);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialise map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  // TODO: decide if I need to keep track of coords and zoom -- delete this useEffect if not
  useEffect(() => {
    if (!map.current) return; // wait for map to initialise
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

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
    </>
  );
}

export default App;
