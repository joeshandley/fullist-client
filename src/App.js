import React, { useRef, useEffect, useState } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
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
  const map = useRef(null);
  const [lng, setLng] = useState(-0.1);
  const [lat, setLat] = useState(51.5);
  const [zoom, setZoom] = useState(11);
  const [locationPermission, setLocationPermission] = useState("");

  useEffect(() => {
    // if (map.current) return; // initialise map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, [lng, lat, zoom]);

  // from https://dev.to/codebucks/how-to-get-user-s-location-in-react-js-1691

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // Code for getting current location

  // const success = (position) => {
  //   console.log("before success");
  //   const coord = position.coords;

  //   console.log("Your current position is:");
  //   setLat(coord.latitude);
  //   console.log(`Latitude : ${coord.latitude}`);
  //   setLng(coord.longitude);
  //   console.log(`Longitude: ${coord.longitude}`);
  //   setZoom(15);
  //   console.log(`More or less ${coord.accuracy} meters.`);
  //   // map.panTo([coord.longitude, coord.latitude]);
  // };

  // function errors(err) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.permissions
  //       .query({ name: "geolocation" })
  //       .then(function (result) {
  //         if (result.state === "granted") {
  //           console.log(result.state);
  //           setLocationPermission(result.state);
  //           //If granted then you can directly call your function here
  //           // navigator.geolocation.getCurrentPosition(success);
  //         } else if (result.state === "prompt") {
  //           navigator.geolocation.getCurrentPosition(success, errors, options);
  //         } else if (result.state === "denied") {
  //           //If denied then you have to show instructions to enable location
  //         }
  //         result.onchange = function () {
  //           console.log(result.state);
  //         };
  //       });
  //   } else {
  //     alert("Sorry Not available!");
  //   }
  // });

  // TODO: decide if I need to keep track of coords and zoom -- delete this useEffect if not
  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialise
  //   map.current.on("move", () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });

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
      {/* <button
        className={`button ${
          locationPermission === "granted" ? "button--show" : "button--hide"
        }`}
        onClick={() => {
          console.log("before");
          navigator.geolocation.getCurrentPosition(success);
          console.log("after");
        }}
      >
        Click for location
      </button> */}
      {/* <div>
        <ReactMapGL
          // mapboxAccessToken={process.env.MAP_TOKEN}
          mapboxAccessToken="pk.eyJ1Ijoiam9lc2hhbmRsZXkiLCJhIjoiY2w2M3Rrc2I2MjVpZzNnb2EzaG5xNjF5NyJ9.LszKClP9qlQ3m4jXCzDudg"
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: zoom,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <NavigationControl position="bottom-right" />
        </ReactMapGL>
      </div> */}
    </>
  );
}

export default App;
