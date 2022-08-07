import React, { useState } from "react";
import Map from "../../components/Map/Map";
import "./Locations.scss";

const Locations = () => {
  // const [unit, setUnit] = useState("km");
  const unit = "km";

  return (
    <main className="locations">
      <div className="locations__top">
        <h1>Locations</h1>
        {/* TODO: work out how to get units to change with out the map reloading */}
        {/* <form className="locations__units">
          <label className="locations__unit-label">
            <input
              id="km"
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
              id="miles"
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
        </form> */}
      </div>
      <Map unit={unit} />
    </main>
  );
};

export default Locations;
