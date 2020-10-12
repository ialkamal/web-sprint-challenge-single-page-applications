import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PizzaForm from "./components/PizzaForm";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/pizza" component={PizzaForm} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};
export default App;
