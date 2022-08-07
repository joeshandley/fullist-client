// import React, { useState } from "react";
import Map from "../../components/Map/Map";
import "./ListLocations.scss";

const ListLocations = () => {
  // const [unit, setUnit] = useState("km");
  const unit = "km";

  return (
    <main className="list-locations">
      <h1 className="list-locations__title">Locations</h1>
      <Map unit={unit} />
    </main>
  );
};

export default ListLocations;
