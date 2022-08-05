import React, { useState } from "react";
import Map from "../../components/Map/Map";
import "./Locations.scss";

const Locations = () => {
  const [unit, setUnit] = useState("km");

  // TODO: change class names to BEM

  return (
    <main className="locations">
      <div className="locations__top">
        <h1>Locations</h1>
        <form className="locations__units">
          <label className="locations__unit-label">
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
          <label className="locations__unit-label">
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
      </div>
      <Map unit={unit} />
    </main>
  );
};

export default Locations;
