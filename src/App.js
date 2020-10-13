import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PizzaForm from "./components/PizzaForm";
import Success from "./components/Success";

const App = () => {

  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/pizza" component={PizzaForm} />
        <Route exact path="/success" component={Success} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};
export default App;
