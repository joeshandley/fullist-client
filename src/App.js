import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MyLists from "./pages/MyLists/MyLists";
import Map from "./components/Map/Map";
import logo from "./assets/logos/logo.svg";
import "./App.scss";

// TODO: Do I need the logo componenet?

const App = () => {
  const [unit, setUnit] = useState("km");

  return (
    // TODO: change class names to BEM
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/lists" exact component={MyLists} />
      </Switch>
      {/* <Map unit={unit} /> */}
      {/* <form className="map__units">
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
      </form> */}
    </>
  );
};

export default App;
