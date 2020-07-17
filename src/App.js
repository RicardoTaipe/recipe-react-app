import React from "react";
import "./styles.scss";
import { Switch, Route } from "react-router-dom";
//custom components
//containers
import Recipes from "./containers/Recipes";
import SingleRecipe from "./containers/SingleRecipe";
export default function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Recipes} />
        <Route path="/recipe/:id" component={SingleRecipe} />
      </Switch>
    </main>
  );
}
