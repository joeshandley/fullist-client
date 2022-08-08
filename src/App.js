import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MyLists from "./pages/MyLists/MyLists";
import AddList from "./pages/AddList/AddList";
import Favourites from "./pages/Favourites/Favourites";
import List from "./pages/List/List";
import Locations from "./pages/Locations/Locations";
import ListLocations from "./pages/ListLocations/ListLocations";
import "./App.scss";

const App = () => {
  return (
    <>
      <Header />
      <main className="app__content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/lists" exact component={MyLists} />
          <Route path="/lists/add" exact component={AddList} />
          <Route path="/lists/favourites" exact component={Favourites} />
          <Route
            path="/lists/:id"
            render={(routerProps) => <List {...routerProps} />}
          />
          <Route path="/locations" exact component={Locations} />
          <Route
            path="/locations/:id"
            render={(routerProps) => <ListLocations {...routerProps} />}
          />
        </Switch>
      </main>
    </>
  );
};

export default App;
