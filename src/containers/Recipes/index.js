import React, { Component } from "react";

//custom components
import Navbar from "../../components/Navbar/Navbar";
import SearchOptions from "../../components/SearchOptions";
import RecipeList from "../../components/RecipeList/RecipeList";

export default class Recipes extends Component {
  state = {
    categorieSelected: "",
    search: ""
  };
  getCategorie = categorie => {
    this.setState({ categorieSelected: categorie });
  };

  getSearchMeal = search => {
    this.setState({ search });
  };

  render() {
    return (
      <div>
        <Navbar />
        <SearchOptions
          onCategorieSelected={this.getCategorie}
          onSearch={this.getSearchMeal}
        />
        <RecipeList
          search={this.state.search}
          categorie={this.state.categorieSelected}
        />
      </div>
    );
  }
}
