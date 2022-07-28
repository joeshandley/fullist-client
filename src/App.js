import React from "react";

import Map from "./components/Map/Map";
import logo from "./assets/logos/logo.svg";
import "./App.scss";

function App() {
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
      <Map />
    </>
  );
}

export default App;
