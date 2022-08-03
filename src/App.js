import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MyLists from "./pages/MyLists/MyLists";
import Locations from "./pages/Locations/Locations";
import "./App.scss";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/lists" exact component={MyLists} />
        <Route path="/locations" exact component={Locations} />
      </Switch>
    </>
  );
};

export default App;
