import React, { useEffect, useState } from "react";

import Map from "./components/Map/Map";
import logo from "./assets/logos/logo.svg";
import "./App.scss";

// TODO: Do I need the logo componenet?

function App() {
  const [unit, setUnit] = useState("km");

  return (
    // TODO: change class names to BEM
    <>
      <h1>Test</h1>
      <p>Add content here</p>
      <div className="logo-container">
        <h2>F</h2>
        <img src={logo} alt="" />
        <h2>llist.</h2>
      </div>
      <Map unit={unit} />
      <form className="map__units">
        <label>
          <input
            id="kmRadio"
            type="radio"
            name="unit"
            value="km"
            checked={unit === "km"}
            className=""
            onChange={() => {
              setUnit("km");
            }}
          />
          km
        </label>
        <label>
          <input
            id="milesRadio"
            type="radio"
            name="unit"
            value="miles"
            checked={unit === "miles"}
            className=""
            onChange={() => {
              setUnit("miles");
            }}
          />
          miles
        </label>
      </form>
    </>
  );
}

export default App;
