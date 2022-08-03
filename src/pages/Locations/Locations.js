import React, { useState } from "react";
import Map from "../../components/Map/Map";
import "./Locations.scss";

const Locations = () => {
  const [unit, setUnit] = useState("km");

  // TODO: change class names to BEM

  return (
    <main>
      <h1>Locations</h1>
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
    </main>
  );
};

export default Locations;
